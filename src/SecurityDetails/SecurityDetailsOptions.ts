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


export interface SecurityDetailsConverterOptions extends MorningstarConverterOptions {
    // Nothing to add yet
}


export interface SecurityDetailsMetadata extends MorningstarMetadata {
    id?: string;
    isin?: string;
    domicile?: string;
    currency?: string;
    returnType?: string;
    type?: string;
    currencyId?: string;
    date?: string;
}


export interface SecurityDetailsOptions extends MorningstarOptions {
    security?: MorningstarSecurityOptions,
    type?: SecurityDetailsConverterType
    viewId?: string,
}

export type SecurityDetailsConverterType  = (
   | 'trailingPerformance'
   | 'assetsAllocations'
 );


/* *
 *
 *  Default Export
 *
 * */


export default SecurityDetailsOptions;
