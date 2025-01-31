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
 *  - Pawel Lysy
 *  - Askel Eirik Johansson
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type {
    MorningstarConverterOptions,
    MorningstarMetadata,
    MorningstarOptions,
    MorningstarSecurityOptions
} from '../Shared/MorningstarOptions';


/* *
 *
 *  API Options
 *
 * 
 * */


export interface SecurityCompareConverterOptions extends MorningstarConverterOptions {
    type?: SecurityCompareConverterType
}

export type SecurityCompareConverterType = (
    | 'TrailingPerformance'
    | 'AssetAllocations'
    | 'CountryExposure'
    | 'RegionalExposure'
    | 'GlobalStockSectorBreakdown'
);


export interface SecurityCompareMetadata extends MorningstarMetadata {
    ids?: string[];
    isins?: string[];
    domicile?: string;
    currency?: string;
    returnType?: string;
    type?: string;
    currencyId?: string;
    date?: string;
}


export interface SecurityCompareSecurity extends Omit<MorningstarSecurityOptions, 'id'> {
    ids: Array<string>
}

export interface SecurityCompareOptions extends MorningstarOptions {
    security: SecurityCompareSecurity,
    viewIds?: string,
    converter?: SecurityCompareConverterOptions
}


/* *
 *
 *  Default Export
 *
 * */


export default SecurityCompareOptions;
