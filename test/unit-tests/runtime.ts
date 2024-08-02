/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  This should be run with `npx ts-node`.
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type { Shared } from '../../code/morningstar-connectors.src';

import * as Assert from 'node:assert/strict';
import * as FS from 'node:fs/promises';
import * as JSDOM from 'jsdom';


/* *
 *
 *  Functions
 *
 * */


async function getAPIOptions(): Promise<Shared.MorningstarAPIOptions> {
    const apiOptions: Shared.MorningstarAPIOptions = {
        url: 'https://www.emea-api.morningstar.com/ecint/v1/'
    };

    if ((await FS.lstat('.env')).isFile()) {
        process.loadEnvFile('.env');
    }

    if (
        process.env.MORNINGSTAR_PASSWORD &&
        process.env.MORNINGSTAR_USERNAME
    ) {
        apiOptions.access = {
            password: process.env.MORNINGSTAR_PASSWORD,
            username: process.env.MORNINGSTAR_USERNAME
        }
    }

    return apiOptions;
}


async function logError(
    error: unknown
): Promise<void> {

    if (error instanceof Error) {
        const request = (error as Shared.MorningstarError).request;
        const response = (error as Shared.MorningstarError).response;

        // Duck typing to avoid real import before tests
        if (response) {
            const headers = (
                request.headers instanceof Headers ?
                    request.headers :
                    new Headers(request.headers)
            );

            console.error(error.message);
            console.error('REQUEST:', new Map(headers.entries()));
            console.error('RESPONSE:', await response.text());

        } else {

            console.error(error);

        }

    } else {

        console.error('' + error);

    }

}


function prepareGlobals() {
    const jsdom = new JSDOM.JSDOM();
    const window = jsdom.window;
    const originalDispatchEvent = window.dispatchEvent;

    window.dispatchEvent = function (e: Event){
        const event = new window.Event(e.type, e);
        return originalDispatchEvent.call(this, event);
    };

    window.fetch = fetch;

    if (!global.Node) {
        global.Node = window.Node;
    }

    if (!window.Date) {
        window.Date = Date;
    }

    globalThis.window = window as unknown as typeof globalThis.window;
}


async function runUnitTests() {
    const failures: Array<string> = [];
    const successes: Array<string> = [];
    const stdout = process.stdout;

    let test: unknown;
    let unitTests: Record<string, unknown>;

    for (let path of (await FS.readdir(__dirname, { recursive: true })).sort()) {

        if (!path.endsWith('.test.ts')) {
            continue;
        }

        stdWrite('Start', path.substring(0, path.length - 8), 'tests ...\n');

        path = './' + path.substring(0, path.length - 3);
        unitTests = await import(path) as Record<string, unknown>;

        for (let testName of Object.keys(unitTests)) {

            test = unitTests[testName];
            testName = testName.replace('_', ' ');

            if (typeof test === 'function') {

                try {

                    stdWrite('Test', testName, '...');

                    await test(await getAPIOptions());

                    stdout.write(' OK.\n');

                    successes.push(testName);

                } catch (error) {

                    stdout.write(' ERROR.\n');

                    await logError(error);

                    failures.push(testName);

                }
            }
        }

    }

    const total = successes.length + failures.length;

    console.info(
        successes.length,
        'of',
        total,
        (total === 1 ? 'test' : 'tests'),
        'succeeded.'
    );

    Assert.deepEqual(
        failures.length,
        0,
        `${failures.length} ${(failures.length === 1 ? 'test' : 'tests')} failed.`
    );

}


function stdWrite(
    ...text: Array<string>
): void {
    process.stdout.write([
        '[',
        new Date().toISOString().substring(0, 19).replace('T', ' '),
        '] ',
        text.join(' ')
    ].join(''));
}


/* *
 *
 *  Runtime
 *
 * */


prepareGlobals();


runUnitTests().catch(async error => {

    await logError(error);

    process.exit(1);

});
