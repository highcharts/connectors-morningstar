/* *
 *
 *  (c) 2009-2026 Highsoft AS
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


export interface PriceSeriesOptions extends TimeSeriesConverterOptions {

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


export type PriceType = (
    | 'PRICE'
    | 'NAV-CF'
    | 'SPLITADJ'
    | 'BONDCLEANPRICE'
    | 'BONDACCRUEDINTEREST'
    | 'TAXADJNAV'
);


export interface RatingSeriesOptions extends TimeSeriesConverterOptions {

    /**
     * Series type to retrieve.
     */
    type: 'Rating';

}

export interface OHLCVSeriesOptions extends TimeSeriesConverterOptions {

    /**
     * Series type to retrieve.
     */
    type: 'OHLCV';

    /**
     * When this property is `true`, open, high and low are replaced with
     * the close value if the volume is zero.
     *
     * If volume is zero, open high low are zero too. If you do not prefer this
     * behavior, you can enable this property.
     *
     * @default false
     */
    replaceZeroWithCloseValue?: boolean;

    /**
     * Security to retrieve.
     */
    securities?: Array<MorningstarSecurityOptions>;

}

export interface ReturnSeriesOptions extends TimeSeriesConverterOptions {

    /**
     * Series type to retrieve.
     */
    type: 'Return';

}

export interface RollingReturnSeriesOptions extends TimeSeriesConverterOptions {

    /**
     *
     * Defines the length of the rolling time window for calculating returns.
     * It represents the number of days, months, or years, depending on the
     * selected frequency. By default, the frequency is daily.
     *
     * @default 10
     */
    rollingPeriod?: number;

    /**
     * Series type to retrieve.
     */
    type: 'RollingReturn';

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
     * Specifies the frequency of the data.
     * Default is `daily`.
     */
    frequency?: TimeSeriesFrequency;

    /**
     * Localization options.
     */
    localization?: LocalizationOptions;

    /**
     * Securities to retrieve.
     *
     * **NOTE: When series type is `OHLCV`, only one security is supported.**
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


export type TimeSeriesFrequency = (
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'quarterly'
    | 'annual'
);


export type TimeSeriesType = (
    | CumulativeReturnSeriesOptions
    | DividendSeriesOptions
    | GrowthSeriesOptions
    | PriceSeriesOptions
    | RatingSeriesOptions
    | OHLCVSeriesOptions
    | ReturnSeriesOptions
    | RollingReturnSeriesOptions
);


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesOptions;
