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
 *  Constants
 *
 * */


const access: Shared.MorningstarAccessOptions = {
    password: process.env.MORNINGSTAR_PASSWORD,
    username: process.env.MORNINGSTAR_USERNAME
};


/* *
 *
 *  Functions
 *
 * */


function logError(
    error: unknown
) {
    if (error instanceof Error) {
        console.error(error);
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

    if (!global.Node) {
        global.Node = window.Node;
    }

    if (!window.Date) {
        window.Date = Date;
    }

    globalThis.window = window as unknown as typeof globalThis.window;
}


async function runUnitTests() {

    prepareGlobals();

    const failures: Array<string> = [];
    const successes: Array<string> = [];

    let test: unknown;
    let testCounter = 0;
    let unitTests: Record<string, unknown>;

    for (let path of await FS.readdir(__dirname, { recursive: true })) {

        if (!path.endsWith('test.ts')) {
            continue;
        }

        path = './' + path.substring(0, path.length - 3);
        unitTests = await import(path) as Record<string, unknown>;

        for (const testName of Object.keys(unitTests)) {

            test = unitTests[testName];

            if (typeof test === 'function') {

                try {
                    ++testCounter;
                    test(access);
                    successes.push(testName);

                } catch (error) {
                    logError(error);
                    failures.push(testName);
                }
            }
        }

    }

    console.info(
        successes.length,
        'of',
        testCounter,
        (testCounter === 1 ? 'test' : 'tests'),
        'succeeded.'
    );

    Assert.deepEqual(failures.length, 0, `${failures.length} failed.`);

}


/* *
 *
 *  Runtime
 *
 * */


runUnitTests().catch(error => {
    logError(error);
    process.exit(1);
});
