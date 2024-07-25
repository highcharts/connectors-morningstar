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


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesOptions;
