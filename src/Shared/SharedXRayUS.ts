/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


/* *
 *
 * Imports
 *
 * */

import {
    TestConverter
} from './Converters';

import type MorningstarConverter from './MorningstarConverter';
import type { XRayUSConverterOptions } from '../XRayUS/XRayUSOptions';

/* *
 *
 *  Constants
 *
 * */

export const DATA_TABLES = [
    { key: 'TestConverter' }
];

/* *
 *
 * Interfaces
 *
 * */

export interface XRayUSConverter extends MorningstarConverter {
    parse(options: XRayUSConverterOptions): void;
}

/* *
 *
 * Functions
 *
 * */

export function initConverter (
    key: string
): XRayUSConverter {
    switch (key) {
        case 'TestConverter':
            return new TestConverter();
        default:
            throw new Error(`Unsupported key: ${key}`);
    }

}
