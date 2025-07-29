/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Mateusz Bernacik
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type {
    PAUSOptions,
    PAUSPayload,
    RequestSettings,
    Portfolio,
    Holding
} from '../Shared/PAUSOptions';
import type { MorningstarConverterOptions } from '../Shared';
import type PerformanceJSON from './PerformanceJSON';


/* *
 *
 *  API Options
 *
 * */

export interface PerformanceOptions extends PAUSOptions {
    portfolios: Array<PerformancePortfolio>;
    requestSettings: PerformanceRequestSettings;
}

export interface PerformanceRequestPayload extends PAUSPayload {
    requestSettings: PerformanceRequestSettings;
    portfolios: Array<PerformancePortfolio>;
}

export interface PerformanceRequestSettings extends RequestSettings {
    includePortfolioCorrelationMatrix?: boolean;
    initialValue?: number;
    analysisDateTimePeriod?: string;
    portfolioPerformanceStartDate?: string;
    portfolioPerformanceEndDate?: string;
    enablePerformanceCommonEndDate?: boolean;
}

export interface PerformancePortfolio extends Portfolio {
    fees?: fees;
    irrFees?: number;
    holdings: Array<PerformanceHolding>;
}

export interface fees {
    annualFeePercent: number;
    annualFeeFrequency: string;
}

export interface PerformanceHolding extends Holding {
    units?: number;
    value?: number;
    annualFeePercent?: number;
    annualFeeFrequency?: string;
}

export interface PerformanceConverterOptions extends MorningstarConverterOptions {
    json: PerformanceJSON.PerformanceResponse;
}


/* *
 *
 *  Default Export
 *
 * */


export default PerformanceOptions;
