#!/usr/bin/env node
/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
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


import Args, { SHORTCUTS as ARGS_SHORTCUTS } from './Library/Args';
import * as FS from 'node:fs/promises';
import * as Path from 'node:path';
import Server, { DEFAULT_PORT } from './Library/Server';


/* *
 *
 *  Constants
 *
 * */


export const HELP = `
npx morningstar-connectors [COMMAND] [OPTIONS]

COMMAND:

    demos    Opens demos in your web browser.

    docs     Opens docs in your browser.

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


export async function main(): Promise<void> {
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

    const port = parseInt((
        typeof args.port === 'string' ?
            args.port :
            `${DEFAULT_PORT}`
    ), 10);

    let server: Server;

    switch (args._) {

        case 'demo':
        case 'demos':
            server = new Server('demos');
            break;

        default:
            console.log(args._);
            throw new Error('No valid command provided.');

    }

    server.start(port);

    console.info(`Content available at http://localhost:${port}.`);

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
