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


export interface CumulativeReturnSeriesOptions extends TimeSeriesConverterOptions {

    /**
     * Series type to retrieve.
     */
    type: 'CumulativeReturn';

}


export interface DividendSeriesOptions extends TimeSeriesConverterOptions {

    /**
     * Whether to include currency information as an additional column for each
     * security (`true`), or not (`false`). The name of the additional column
     * has the format `[SID]_Currency`, e.g. `F0GBR04S23_Currency`.
     *
     * @default false
     */
    includeCurrency?: boolean;

    /**
     * Series type to retrieve.
     */
    type: 'Dividend';

}


export interface GrowthSeriesOptions extends TimeSeriesConverterOptions {

    /**
     * Series type to retrieve.
     */
    type: 'Growth';

}


export interface PriceSeriesOptions extends TimeSeriesConverterOptions{

    /**
     * Series type to retrieve.
     */
    type: 'Price';

    /**
     * The type of price to retrieve.
     * 
     * `SPLITADJ` is the default when instrument type is `CEF`.
     */
    priceType?: PriceType;

}


export interface RatingSeriesOptions extends TimeSeriesConverterOptions{

    /**
     * Series type to retrieve.
     */
    type: 'Rating';

}


export interface TimeSeriesConverterOptions extends MorningstarConverterOptions {

    // Nothing to add yet.

}


export interface TimeSeriesOptions extends MorningstarOptions {

    /**
     * Common type-independent series options.
     */
    converter?: TimeSeriesConverterOptions;

    /**
     * Currency code (ISO alpha-3) for requested values.
     */
    currencyId?: string;

    /**
     * The end date for the requested securities data. This can be either a
     * JavaScript timestamp or a date string.
     */
    endDate?: (number|string);

    /**
     * Localization options.
     */
    localization?: LocalizationOptions;

    /**
     * Security to retrieve.
     */
    securities?: Array<MorningstarSecurityOptions>;

    /**
     * Type-based series options.
     */
    series?: TimeSeriesType;

    /**
     * The start date for the requested securities data. This can be either a
     * JavaScript timestamp or a date string.
     */
    startDate?: (number|string);

    /**
     * Tax option.
     */
    tax?: ('pretax'|'posttax');

}


export type TimeSeriesType = (
    | CumulativeReturnSeriesOptions
    | DividendSeriesOptions
    | GrowthSeriesOptions
    | PriceSeriesOptions
    | RatingSeriesOptions
);

export type PriceType = (
    | 'PRICE'
    | 'NAV-CF'
    | 'SPLITADJ'
    | 'BONDCLEANPRICE'
    | 'BONDACCRUEDINTEREST'
    | 'TAXADJNAV'
);

/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesOptions;
