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
    CreditQualityConverter,
    EquityStyleConverter,
    FixedIncomeStyleConverter
} from './USConverters';

import type MorningstarConverter from './MorningstarConverter';
import type { XRayUSConverterOptions } from '../XRayUS/XRayUSOptions';

/* *
 *
 *  Constants
 *
 * */

export const DATA_TABLES = [
    { key: 'CreditQuality' },
    { key: 'EquityStyle' },
    { key: 'FixedIncomeStyle' }
];

/* *
 *
 * Interfaces
 *
 * */

export interface XRayUSConverter extends MorningstarConverter {
    parse(options: XRayUSConverterOptions, hasMultiple?: boolean): void;
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
        case 'CreditQuality':
            return new CreditQualityConverter();
        case 'EquityStyle':
            return new EquityStyleConverter();
        case 'FixedIncomeStyle':
            return new FixedIncomeStyleConverter();
        default:
            throw new Error(`Unsupported key: ${key}`);
    }

}
