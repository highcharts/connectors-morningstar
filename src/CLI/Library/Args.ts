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
 *  Constants
 *
 * */


const SHORTCUT_MAP: Record<string, string> = {
    '?': 'help',
    'h': 'help',
    'p': 'port',
    'v': 'version'
};


/* *
 *
 *  Interface
 *
 * */


export type Args = Record<string, ArgValue>;


export type ArgValue =  (true|string|Array<string>);


/* *
 *
 *  Functions
 *
 * */


/**
 * Converts CLI arguments into a flexible dictionary.
 *
 * @param argv
 * Arguments to convert.
 *
 * @return
 * Converted CLI arguments.
 */
function getArgs(
    argv = process.argv
): Args {
    const args: Args = {};

    let currentKey: string = '_';
    let currentValue: ArgValue;

    for (const arg of argv) {
        if (arg.startsWith('--')) {
            currentKey = arg.substring(2);
            args[currentKey] = true;
        } else if (arg.startsWith('-')) {
            currentKey = SHORTCUT_MAP[arg[1]];
            args[currentKey] = true;
        } else {
            currentValue = args[currentKey];
            if (currentKey === '_') {
                args[currentKey] = arg;
            } else if (currentValue instanceof Array) {
                currentValue.push(arg);
            } else if (typeof currentValue === 'string') {
                args[currentKey] = [currentValue, arg];
            } else {
                args[currentKey] = arg;
            }
        }
    }

    return args;
}


/* *
 *
 *  Default Export
 *
 * */


export default {
    getArgs
};
