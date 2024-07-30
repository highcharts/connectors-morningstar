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


import Args from './Library/Args';
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

    demos         Starts a local web server to run demos in your web browser.

OPTIONS:

    --help -h     This help.

    --port -p     Port to use for the local web server. (default: ${DEFAULT_PORT})

    --version -v  Version of the Morningstar connectors package.

EXAMPLE:

npx morningstar-connectors demo --port 8080

`;


/* *
 *
 *  Functions
 *
 * */


export async function main(): Promise<void> {
    const args = Args.getArgs();

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
