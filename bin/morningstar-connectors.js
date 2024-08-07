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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HELP = void 0;
exports.main = main;
/* *
 *
 *  Imports
 *
 * */
const Args_1 = require("./Library/Args");
const FS = require("node:fs/promises");
const Path = require("node:path");
const Server_1 = require("./Library/Server");
/* *
 *
 *  Constants
 *
 * */
exports.HELP = `
npx morningstar-connectors [COMMAND] [OPTIONS]

COMMAND:

    demos    Opens demos in your web browser.

    docs     Opens docs in your browser.

OPTIONS:

    --environment -e  [path]  Postman environment file to use.

    --help -h                 This help.

    --port -p          [int]  Port to use for the local web server.
                              (default: ${Server_1.DEFAULT_PORT})

    --version -v              Version of the Morningstar connectors package.

EXAMPLE:

npx morningstar-connectors demo -e postman_environment.json -p 8080

`;
const SHORTCUTS = {
    ...Args_1.SHORTCUTS,
    e: 'environment',
    p: 'port'
};
/* *
 *
 *  Functions
 *
 * */
async function main() {
    const args = Args_1.default.getArgs(process.argv, SHORTCUTS);
    if (args.help) {
        console.info(exports.HELP);
        return;
    }
    if (args.version) {
        console.info(JSON.parse(await FS.readFile(
        // Path relative to bin folder
        Path.join(__dirname, '..', 'package.json'), 'utf8')).version);
        return;
    }
    const port = parseInt((typeof args.port === 'string' ?
        args.port :
        `${Server_1.DEFAULT_PORT}`), 10);
    let server;
    switch (args._) {
        case 'demo':
        case 'demos':
            server = new Server_1.default('demos');
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
