/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */

import type { MorningstarConverterOptions } from '../Shared';

import type {
    PAUSOptions,
    PAUSPayload,
    RequestSettings,
    Portfolio,
    Holding,
    Benchmark
} from '../Shared/PAUSOptions';
import HypoJSON from './HypoPerformanceJSON';


/* *
 *
 *  API Options
 *
 * */

export interface HypoPerformanceOptions extends PAUSOptions {
    langcult?: string;
    portfolios: Array<HypoPerformancePortfolio>;
    requestSettings: HypoPerformanceRequestSettings;
}

export interface HypoPerformanceRequestPayload extends PAUSPayload {
    view?: {
        id: string;
    };
    requestSettings: HypoPerformanceRequestSettings;
    portfolios: Array<HypoPerformancePortfolio>;
}

export interface HypoCalculationSettings {
    hypoType?: string;
    filingStatus?: string;
    taxableIncome?: number;
    payTaxes?: string;
    federalIncomeTaxRate?: number;
    capitalGainTaxRate?: number;
    stateIncomeTaxRate?: number;
    dividendTaxRate?: number;
    illustrationTrailingTimePeriod?: string;
    startDate?: string;
    endDate?: string;
    synchronizePortfolioStartDate?: boolean;
    investmentDetailReturnsFrequency?: string;
    liquidateOnEndDate?: boolean;
    subsequentInvestmentType?: string;
    subsequentInvestmentAmount?: number;
    subsequentInvestmentWithdrawalFrequency?: string;
    assetBasedAnnualFee?: number;
    assetFeeFrequency?: string;
    assetFeeType?: string;
    payFees?: string;
    payFeesUseCashFirst?: boolean;
    frontLoadType?: string;
    portfolioAmountFee?: number;
    salesFeeAmount?: number;
    applySalesCharge?: boolean;
    applyFeeForRebalance?: boolean;
    entryExitFeeType?: string;
    rebalanceFrequency?: string;
    rebalanceThreshold?: number;
    reinvestDividends?: boolean;
    reinvestCapitalGains?: boolean;
    customFeeType?: string;
}

export interface HypoPerformanceRequestSettings extends RequestSettings {
    hypoCalculationSettings?: HypoCalculationSettings;
    outputReturnsFrequency?: string;
}

export interface HypoPerformancePortfolio extends Portfolio {
    holdings: Array<HypoPerformanceHolding>;
    benchmark: HypoBenchMark;
}

export interface HypoBenchMark extends Benchmark {
    holdings: Array<HypoPerformanceHolding>;
}

export interface HypoPerformanceHolding extends Holding {
    units?: number;
    value?: number;
    assetBasedAnnualFee?: number;
    assetFeeType?: string;
    assetFeeFrequency?: string;
    loadFeeType?: string;
    loadFeeAmount?: number;
    frontLoadType?: string;
}

export interface HypoConverterOptions extends MorningstarConverterOptions {
    json: HypoJSON.Hypo
}


/* *
 *
 *  Default Export
 *
 * */


export default HypoPerformanceOptions;
