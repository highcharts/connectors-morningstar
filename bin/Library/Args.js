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
exports.SHORTCUTS = void 0;
/* *
 *
 *  Constants
 *
 * */
exports.SHORTCUTS = {
    '?': 'help',
    h: 'help',
    v: 'version'
};
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
function getArgs(argv = process.argv, shortcuts = exports.SHORTCUTS) {
    const args = {};
    let currentKey = '_';
    let currentValue;
    for (const arg of argv) {
        if (arg.startsWith('--')) {
            currentKey = arg.substring(2);
            args[currentKey] = true;
        }
        else if (arg.startsWith('-')) {
            currentKey = shortcuts[arg.substring(1)];
            args[currentKey] = true;
        }
        else {
            currentValue = args[currentKey];
            if (currentKey === '_') {
                args[currentKey] = arg;
            }
            else if (currentValue instanceof Array) {
                currentValue.push(arg);
            }
            else if (typeof currentValue === 'string') {
                args[currentKey] = [currentValue, arg];
            }
            else {
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
exports.default = {
    getArgs
};
