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
    MorningstarOptions,
    MorningstarSecurityOptions,
    MorningstarMetadata
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
     * 'RegionalExposure', 'GlobalStockSectorBreakdown',
     * 'CountryExposure', 'MarketCap', 'IndustryBreakdown',
     * 'IndustryGroupBreakdown, BondStatistics',
     * 'Meta'.
     *
     * @default 'TrailingPerformance'
     */
    type?: SecurityDetailsConverterType
    hasMultiple?: boolean

}



export interface SecurityDetailsOptions extends MorningstarOptions {
    /**
     * Security to retrieve.
     */
    security?: MorningstarSecurityOptions,
    /**
     * Unique identifier of a view.
     * Set of fields representing a data set or scenario.
     * Defines the data points to return in the response.
     *
     * @default 'MFsnapshot'
     */
    viewId?: string,
    /**
     * Retrieves security details based on the specified converter types.
     * If not specified, returns all available data for security details.
     */
    converters?: SecurityDetailsConverterType[]
    /**
     * Backward compatibility option for the old converter type.
     */
    converter?: SecurityDetailsConverterOptions;
}


export type SecurityDetailsConverterType  = (
   | 'TrailingPerformance'
   | 'AssetAllocations'
   | 'RegionalExposure'
   | 'GlobalStockSectorBreakdown'
   | 'CountryExposure'
   | 'PortfolioHoldings'
   | 'MarketCap'
   | 'IndustryBreakdown'
   | 'IndustryGroupBreakdown'
   | 'CreditQualityBreakdown'
   | 'BondStatistics'
   | 'Meta'
   | 'StyleBoxBreakdown'
   | 'BondStyleBoxBreakdown'
 );

export interface SecurityDetailsMetadata extends MorningstarMetadata {
    id?: string;
    isin?: string;
}


/* *
 *
 *  Default Export
 *
 * */


export default SecurityDetailsOptions;
