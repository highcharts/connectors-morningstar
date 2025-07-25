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

}

export interface XRayUSOptions extends PAUSOptions {
    portfolios: Array<XRayUSPortfolio>;
    requestSettings: XRayUSRequestSettings;
}

export interface XRayUSRequestPayload extends PAUSPayload {
    Config?: {
        Id: string;
    };
    Portfolios: Array<XRayUSPortfolio>;
    RequestSettings: XRayUSRequestSettings;
}

export interface XRayUSRequestSettings extends RequestSettings {
    /**
     * Currency used to calculate output values.
     * @default 'USD'
     */
    OutputCurrency: 'USD' | 'CAD' | 'EUR' | 'GBP' | 'AUD';

    /**
     * End date period for the analysis.
     * @default 'MonthEnd'
     */
    AnalysisDateTimePeriod?: 'MonthEnd' | 'QuarterEnd' | 'YearEnd' | 'CustomDate';

    /**
     * Start date of the analysis.
     * @default 'EarliestCommon'
     */
    PortfolioPerformanceStartDate?:
    | 'EarliestCommon'
    | 'EarliestAvailable'
    | 'EarliestCommonExtended'
    | 'EarliestCommonExtended10Year'
    | 'Year10'
    | 'CustomDate';

    /**
     * End date passed for the analysis. Required when
     * AnalysisDateTimePeriod is set to CustomDate.
     * @example '2022-10-31'
     */
    PortfolioPerformanceEndDate?: string;

    /**
     * When true, if more than one portfolio is being queried, the most recent
     * common end date for the portfolios is passed in the request.
     * @default false
     */
    EnablePerformanceCommonEndDate?: boolean;

    /**
     * Month End or Quarter End performance returns and risks.
     * @default 'Monthly'
     */
    PerformanceFrequency?: 'Monthly' | 'Quarterly';

    /**
     * Asset class group configs.
     */
    AssetClassGroupConfigs?: {
        assetClassGroupConfig: Array<{
            id: 'ACG-USBROAD' | 'ACG-USDETAILED-15' | 'ACG-CABROAD';
        }>;
    };

    /**
     * Return the specified data sections in the response.
     */
    ReturnDataSections?: 'CorrelationMatrix' | 'RollingReturns';

    /**
     * Enable to include portfolio in correlation matrix.
     * @default false
     */
    IncludePortfolioInCorrelationMatrix?: boolean;

    /**
     * Frequency of rolling return data. Only works and is the required field
     * when ReturnDataSections=RollingReturns.
     */
    RollingReturnFrequencies?:
    | 'Month3'
    | 'Month6'
    | 'Year1'
    | 'Year3'
    | 'Year5'
    | 'Year10';

    /**
     * Rolling return step. Only works when ReturnDataSections=RollingReturns.
     * @default 1
     */
    RollingReturnStep?: number;

    /**
     * Maximum number of correlation matrix holdings to return in the response.
     * @default 50
     */
    MaxCorrelationMatrixHoldingNumber?: number;

    /**
     * Initial value of the portfolio.
     * @default 10000
     */
    InitialValue?: number;

    /**
     * When true, both gross and net values are included in the response for
     * trailing returns, MPTStatistics and PerformanceHistory.
     * @default false
     */
    IncludeGrossNetReturns?: boolean;

    /**
     * This will pick up the latest PerformanceStartDate across the portfolios
     * and set the same against all the portfolios.
     * @default false
     */
    SynchronizePortfolioStartDate?: boolean;

    /**
     * Custom Start date of the analysis. Required when
     * PortfolioPerformanceStartDate is set to CustomDate.
     * @example '2022-10-31'
     */
    PortfolioPerformanceCustomStartDate?: string;
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

    /**
     * The Morningstar unique identifier of a security (PerformanceId)
     */
    performanceId?: string;

    /**
     * The public unique identifier of a security (FundCode)
     */
    fundCode?: string;
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
