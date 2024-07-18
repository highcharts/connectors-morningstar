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


/* *
 *
 *  Imports
 *
 * */


import type LocalizationOptions from '../Shared/LocalizationOptions';
import type {
    MorningstarConverterOptions,
    MorningstarOptions,
    MorningstarSecurityOptions
} from '../Shared/MorningstarOptions';


/* *
 *
 *  API Options
 *
 * */


export interface TimeSeriesConverterOptions extends MorningstarConverterOptions {

}


export interface CumulativeReturnSeriesOptions {

    /**
     * Series type to retrieve.
     */
    type: 'CumulativeReturn';

}


export interface DividendSeriesOptions {

    /**
     * Series type to retrieve.
     */
    type: 'Dividend';

}


export interface GrowthSeriesOptions {

    /**
     * Series type to retrieve.
     */
    type: 'Growth';

}


export interface PriceSeriesOptions {

    /**
     * Series type to retrieve.
     */
    type: 'Price';

}


export interface TimeSeriesSecurityOptions extends MorningstarSecurityOptions {

    id: string;

    idType: ('ISIN'|'MORNINGSTAR'|'MSID'|'SECID');

}


export interface TimeSeriesOptions extends MorningstarOptions {

    converter?: TimeSeriesConverterOptions;

    /**
     * Localization options.
     */
    localization?: LocalizationOptions;

    /**
     * Security to retrieve.
     */
    securities?: Array<TimeSeriesSecurityOptions>;

    /**
     * Type-based series options.
     */
    series: TimeSeriesType;

    /**
     * Tax option.
     */
    tax: ('pretax'|'posttax');

}


export type TimeSeriesType = (
    | CumulativeReturnSeriesOptions
    | DividendSeriesOptions
    | GrowthSeriesOptions
    | PriceSeriesOptions
);


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesOptions;
