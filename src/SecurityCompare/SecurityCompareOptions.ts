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
 *  - Pawel Lysy
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
);


export interface SecurityCompareMetadata extends MorningstarMetadata {
    id?: string;
    isin?: string;
    domicile?: string;
    currency?: string;
    returnType?: string;
    type?: string;
    currencyId?: string;
    date?: string;
}


export interface SecurityCompareSecurity extends MorningstarSecurityOptions {
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
