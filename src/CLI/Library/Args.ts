/* *
 *
 *  (c) 2009-2025 Highsoft AS
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


export const SHORTCUTS: Record<string, string> = {
    '?': 'help',
    h: 'help',
    v: 'version'
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
 * @param shortcuts
 * Shortcut arguments as a map to their full counterpart.
 *
 * @return
 * Converted CLI arguments.
 */
function getArgs (
    argv = process.argv,
    shortcuts = SHORTCUTS
): Args {
    const args: Args = {};

    let currentKey: string = '_';
    let currentValue: ArgValue;

    for (const arg of argv) {
        if (
            currentKey === '_' &&
            arg.startsWith('/')
        ) {
            continue;
        }
        if (arg.startsWith('--')) {
            currentKey = arg.substring(2);
            args[currentKey] = true;
        } else if (arg.startsWith('-')) {
            currentKey = shortcuts[arg.substring(1)];
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
