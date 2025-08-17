/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


'use strict';

/* *
 *
 *  Imports
 *
 * */


import type { MorningstarConverterOptions, MorningstarMetadata } from '../Shared';
import type { PAUSOptions, PAUSPayload, Portfolio, RequestSettings, Holding } from '../Shared/PAUSOptions';
import type XRayUSJSON from './XRayUSJSON';


/* *
 *
 *  API Options
 *
 * */

export interface XRayUSMetadata extends MorningstarMetadata {
    securityReference: Array<XRayUSJSON.SecurityReference>;
}

export interface XRayUSOptions extends PAUSOptions {
    portfolios: Array<XRayUSPortfolio>;
    requestSettings: XRayUSRequestSettings;
}

export interface XRayUSRequestPayload extends PAUSPayload {
    portfolios: Array<XRayUSPortfolio>;
    requestSettings: XRayUSRequestSettings;
}

export interface XRayUSRequestSettings extends RequestSettings {
    /**
     * Currency used to calculate output values.
     * @default 'USD'
     */
    outputCurrency: 'USD' | 'CAD' | 'EUR' | 'GBP' | 'AUD';

    /**
     * End date period for the analysis.
     * @default 'MonthEnd'
     */
    analysisDateTimePeriod?: 'MonthEnd' | 'QuarterEnd' | 'YearEnd' | 'CustomDate';

    /**
     * Start date of the analysis.
     * @default 'EarliestCommon'
     */
    portfolioPerformanceStartDate?:
    | 'EarliestCommon'
    | 'EarliestAvailable'
    | 'EarliestCommonExtended'
    | 'EarliestCommonExtended10Year'
    | 'Year10'
    | 'CustomDate';

    /**
     * End date passed for the analysis. Required when
     * analysisDateTimePeriod is set to CustomDate.
     * @example '2022-10-31'
     */
    portfolioPerformanceEndDate?: string;

    /**
     * When true, if more than one portfolio is being queried, the most recent
     * common end date for the portfolios is passed in the request.
     * @default false
     */
    enablePerformanceCommonEndDate?: boolean;

    /**
     * Month End or Quarter End performance returns and risks.
     * @default 'Monthly'
     */
    performanceFrequency?: 'Monthly' | 'Quarterly';

    /**
     * Return the specified data sections in the response.
     */
    returnDataSections?: Array<'CorrelationMatrix' | 'RollingReturns'>;

    /**
     * Enable to include portfolio in correlation matrix.
     * @default false
     */
    includePortfolioInCorrelationMatrix?: boolean;

    /**
     * Frequency of rolling return data. Only works and is the required field
     * when returnDataSections=RollingReturns.
     */
    rollingReturnFrequencies?:
    | 'Month3'
    | 'Month6'
    | 'Year1'
    | 'Year3'
    | 'Year5'
    | 'Year10';

    /**
     * Rolling return step. Only works when returnDataSections=RollingReturns.
     * @default 1
     */
    rollingReturnStep?: number;

    /**
     * Maximum number of correlation matrix holdings to return in the response.
     * @default 50
     */
    maxCorrelationMatrixHoldingNumber?: number;

    /**
     * Initial value of the portfolio.
     * @default 10000
     */
    initialValue?: number;

    /**
     * When true, both gross and net values are included in the response for
     * trailing returns, MPTStatistics and PerformanceHistory.
     * @default false
     */
    includeGrossNetReturns?: boolean;

    /**
     * This will pick up the latest PerformanceStartDate across the portfolios
     * and set the same against all the portfolios.
     * @default false
     */
    synchronizePortfolioStartDate?: boolean;

    /**
     * Custom Start date of the analysis. Required when
     * PortfolioPerformanceStartDate is set to CustomDate.
     * @example '2022-10-31'
     */
    portfolioPerformanceCustomStartDate?: string;
}

export interface XRayUSPortfolio extends Portfolio {
    /**
     * Portfolio fees.
     */
    fees?: {
        /**
         * @default 0
         */
        annualFeePercent: number;

        /**
         * @default 'Monthly'
         */
        annualFeeFrequency: 'Monthly' | 'Quarterly' | 'SemiAnnually' | 'Annually';
    };

    /**
     * Internal rate of return fees. This is an annual fee.
     */
    irrFees?: number;
}

export interface XRayUSHolding extends Holding {
    /**
     * Specifies the amount of the fee as a percentage.
     * This is holding level fee.
     * @default 0
     */
    annualFeePercent?: number;

    /**
     * Defines how often annual fee are applied.
     * @default 'Monthly'
     */
    annualFeeFrequency?: 'Monthly' | 'Quarterly' | 'SemiAnnually' | 'Annually';
}

export interface XRayUSConverterOptions extends MorningstarConverterOptions {
    json: XRayUSJSON.XRayUS;
    hasMultiple?: boolean;
}

/* *
 *
 *  Default Export
 *
 * */


export default XRayUSOptions;
