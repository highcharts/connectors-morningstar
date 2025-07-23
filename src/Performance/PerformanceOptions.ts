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
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type {
    PAUSConnectorOptions,
    PAUSPayload,
    RequestSettings,
    Portfolio,
    Holding
} from '../Shared/PAUSConnectorOptions';


/* *
 *
 *  API Options
 *
 * */

export interface PerformanceOptions extends PAUSConnectorOptions {
    configId: string;
}

export interface PerformanceRequestPayload extends PAUSPayload {
    Config?: {
        Id: string;
    };
    RequestSettings: PerformanceRequestSettings;
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
    fees: fees;
    irrFees: number;
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


/* *
 *
 *  Default Export
 *
 * */


export default PerformanceOptions;
