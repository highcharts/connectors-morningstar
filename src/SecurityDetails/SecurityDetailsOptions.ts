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

    /**
     * Specifies the type of data to retrieve for the security details.
     * Available types: 'TrailingPerformance', 'AssetAllocations',
     * 'RegionalExposure', 'GlobalStockSectorBreakdown', 'CountryExposure'.
     *
     * @default 'TrailingPerformance'
     */
    type?: SecurityDetailsConverterType

}


interface Metadata extends MorningstarMetadata {
    domicile?: string;
    currency?: string;
    returnType?: string;
    type?: string;
    currencyId?: string;
    date?: string;
}


export interface SecurityDetailsMetadata extends Metadata {
    id?: string;
    isin?: string;
}


export interface SecurityCompareMetadata extends Metadata {
    ids?: string[];
    isins?: string[];
}


export interface SecurityDetailsOptions extends MorningstarOptions {
    security?: MorningstarSecurityOptions,
    viewId?: string,
    converter?: SecurityDetailsConverterOptions
}


interface SecurityCompareSecurity extends Omit<MorningstarSecurityOptions, 'id'> {
    ids: Array<string>
}


export interface SecurityCompareOptions extends MorningstarOptions {
    security: SecurityCompareSecurity,
    viewIds?: string,
    converter?: SecurityDetailsConverterOptions
}


export type SecurityDetailsConverterType  = (
   | 'TrailingPerformance'
   | 'AssetAllocations'
   | 'RegionalExposure'
   | 'GlobalStockSectorBreakdown'
   | 'CountryExposure'
 );


/* *
 *
 *  Default Export
 *
 * */


export default SecurityDetailsOptions;
