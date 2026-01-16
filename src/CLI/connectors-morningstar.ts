#!/usr/bin/env node
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


/* eslint-disable no-console */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import * as FS from 'node:fs/promises';
import * as Path from 'node:path';

import Args, { SHORTCUTS as ARGS_SHORTCUTS } from './Library/Args';
import APIServer from './Library/APIServer';
import Server, { DEFAULT_PORT } from './Library/Server';


/* *
 *
 *  Constants
 *
 * */


export const HELP = `
npx morningstar-connectors [COMMAND] [OPTIONS]

COMMAND:

    api      Opens API docs in your browser.

    demos    Opens demos in your web browser.

    docs     Opens documentation in your web browser.

OPTIONS:

    --environment -e  [path]  Postman environment file to use.

    --help -h                 This help.

    --port -p          [int]  Port to use for the local web server.
                              (default: ${DEFAULT_PORT})

    --version -v              Version of the Morningstar connectors package.

EXAMPLE:

npx morningstar-connectors demo -e postman_environment.json -p 8080

`;


const SHORTCUTS = {
    ...ARGS_SHORTCUTS,
    e: 'environment',
    p: 'port'
};


/* *
 *
 *  Functions
 *
 * */


export async function main (): Promise<void> {
    const args = Args.getArgs(process.argv, SHORTCUTS);

    if (args.help) {
        console.info(HELP);
        return;
    }

    if (args.version) {
        console.info(
            (JSON.parse(
                await FS.readFile(
                    // Path relative to bin folder
                    Path.join(__dirname, '..', 'package.json'),
                    'utf8'
                )
            ) as Record<string, string>).version
        );
        return;
    }

    let port: number = (typeof args.port === 'string' ? parseInt(args.port, 10) : 0);

    let server: Server;

    switch (args._) {

        case 'api':
            port = port || 8005;
            server = new APIServer(
                Path.join(__dirname, '..', 'Static'),
                'TimeSeries',
                ' | Highcharts API'
            );
            break;

        case 'demo':
        case 'demos':
            port = port || 8080;
            server = new Server(
                Path.relative(process.cwd(), Path.join(__dirname, '..', 'demos'))
            );
            break;

        case 'docs':
            port = port || 8000;
            server = new Server(
                (
                    __dirname.includes('node_modules') ?
                        Path.relative(process.cwd(), Path.join(__dirname, '..', 'docs')) :
                        Path.relative(
                            process.cwd(),
                            Path.join(__dirname, '..', 'docs', 'connectors')
                        )
                ),
                'morningstar.md',
                ' | Highcharts Docs'
            );
            break;

        default:
            console.info(HELP);
            throw new Error(`No valid command provided. (${'' + args._})`);

    }

    server.start(port);

    if (server.http?.listening) {
        console.info(`Content available at http://localhost:${port}.`);
    }

    process.stdin.on('data', (data) => {
        const input = data.toString('utf8');

        if (
            input.startsWith('exit') ||
            input.startsWith('q') ||
            input.startsWith('quit') ||
            input.startsWith('stop')
        ) {
            server.stop();
            process.exit(0);
        }
    });

}


/* *
 *
 *  Runtime
 *
 * */


main().catch(error => {
    console.error(`${error}`);
    process.exit(1);
});
