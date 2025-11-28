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


'use strict';


/* *
 *
 *  Imports
 *
 * */

import type {
    MorningstarOptions
} from '../../Shared/MorningstarOptions';


/* *
 *
 *  API Options
 *
 *
 * */

export type InvestmentsConverters = Record<InvestmentsConverterType, InvestmentsConverterOptions>;

export interface InvestmentsOptions extends MorningstarOptions {
    converters?: InvestmentsConverters;
    security?: InvestmentsSecurityOptions;
}

export interface InvestmentsConverterOptions {
    startDate?: string;
    endDate?: string;
}

export interface InvestmentsSecurityOptions {
    id: string;
}

export type InvestmentsConverterType =
    'MockAssetAlloc'|
    'MockBasicDetails';


/* *
 *
 *  Default Export
 *
 * */


export default InvestmentsOptions;
