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

    // Nothing to add yet.

}


export interface TimeSeriesCumulativeReturnOptions extends TimeSeriesConverterOptions {

    /**
     * Series type to retrieve.
     */
    type: 'CumulativeReturn';

}


export interface TimeSeriesDividendOptions extends TimeSeriesConverterOptions {

    /**
     * Series type to retrieve.
     */
    type: 'Dividend';

}


export interface TimeSeriesGrowthOptions extends TimeSeriesConverterOptions {

    /**
     * Series type to retrieve.
     */
    type: 'Growth';

}


export interface TimeSeriesPriceOptions extends TimeSeriesConverterOptions{

    /**
     * Series type to retrieve.
     */
    type: 'Price';

}


export interface TimeSeriesRatingOptions extends TimeSeriesConverterOptions{

    /**
     * Series type to retrieve.
     */
    type: 'Rating';

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
    series: TimeSeriesType;

    /**
     * Tax option.
     */
    tax: ('pretax'|'posttax');

}


export type TimeSeriesType = (
    | TimeSeriesCumulativeReturnOptions
    | TimeSeriesDividendOptions
    | TimeSeriesGrowthOptions
    | TimeSeriesPriceOptions
    | TimeSeriesRatingOptions
);


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesOptions;
