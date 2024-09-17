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


import type {
    MorningstarConverterOptions,
    MorningstarHoldingAmountOptions,
    MorningstarHoldingWeightOptions,
    MorningstarOptions
} from '../Shared/MorningstarOptions';


/* *
 *
 *  API Options
 *
 * */


export interface XRayBenchmarkDataPointOptions {

    /**
     * A comma-separated list of benchmark data points to return.
     */
    dataPoints: Array<XRayBenchmarkDataPoints>;

    /**
     * Type of data points.
     */
    type: 'benchmark';

}


export type XRayBenchmarkDataPoints = (
    | 'GrowthSeries'
    | 'HistoricalPerformanceSeries'
    | 'PerformanceReturn'
    | ['PerformanceReturn', ...Array<string>]
    | 'ShowBreakdown'
);


export interface XRayConverterOptions extends MorningstarConverterOptions {

}


export type XRayDataPointOptions = (
    | XRayBenchmarkDataPointOptions
    | XRayHoldingDataPointOptions
    | XRayPortfolioDataPointOptions
);


export interface XRayHoldingDataPointOptions {

    /**
     * A comma-separated list of holding data points to return.
     */
    dataPoints: Array<XRayHoldingDataPoints>;

    /**
     * Type of data points.
     */
    type: 'holding';

}


/**
 * @todo Consider sub-collections or reduction to `string`
 */
export type XRayHoldingDataPoints = (
    | 'Alpha'
    | 'ArithmeticMean'
    | 'AveragePrice'
    | 'Beta'
    | 'CalculatedSRRI'
    | 'CalmarRatio'
    | 'CouponFrequency'
    | 'CouponType'
    | 'CurrencyId'
    | 'CurrencyName'
    | 'DiscountPremium'
    | 'EquityWeighting'
    | 'EquityWeightingLong'
    | 'HoldingId'
    | 'HoldingType'
    | 'InitialAmount'
    | 'InitialWeight'
    | 'Kurtosis'
    | 'MarketValue'
    | 'MorningstarRiskM255'
    | 'Name'
    | 'NAVCFLC'
    | 'NAVCFLE'
    | 'NAVCFLP'
    | 'NAVEPLC'
    | 'NAVEPLE'
    | 'NAVEPLP'
    | 'OngoingCharge'
    | 'PortfolioId'
    | 'RiskRewardVolatility'
    | 'SecurityId'
    | 'SecurityType'
    | 'SharpeRatio'
    | 'SortinoRatio'
    | 'SRRI'
    | 'StandardDeviation'
    | 'StarRating'
    | 'TDYNAV'
    | 'UCITS'
    | 'Weight'
);


export type XRayHoldingOptions = (
    | Array<MorningstarHoldingAmountOptions>
    | Array<MorningstarHoldingWeightOptions>
);


export interface XRayOptions extends MorningstarOptions {

    /**
     * Morningstar-defined unique identifier of a benchmark.
     *
     * If no benchmark is set, it will default to
     * `Morningstar US Market TR USD`.
     *
     * @default 'XIUSA0010V'
     */
    benchmarkId?: string;

    /**
     * Options related to the x-ray data parser.
     */
    converter?: XRayConverterOptions;

    /**
     * Currency of the portfolio. ISO 4217 3-character currency code.
     */
    currencyId?: string;

    /**
     * Data points for the x-ray.
     */
    dataPoints?: XRayDataPointOptions;

    /**
     * Array of portfolio holdings.
     */
    holdings?: XRayHoldingOptions;

}


export interface XRayPortfolioDataPointOptions {

    /**
     * A comma-separated list of portfolio data points to return.
     */
    dataPoints: Array<XRayPortfolioDataPoints>;

    /**
     * Type of data points.
     */
    type: 'portfolio';

}


export type XRayPortfolioDataPoints = (
    // Version 1
    | 'ActualManagementFee'
    | 'Alpha'
    | 'ArithmeticMean'
    | 'AssetAllocation'
    | 'BenchmarkId'
    | 'BenchmarkName'
    | 'BestWorstPeriods'
    | 'Beta'
    | 'BondStyleBox'
    | 'CalmarRatio'
    | 'Correlation'
    | 'CorrelationMatrix'
    | ['CorrelationMatrix', ...Array<string>]
    | 'CountryExposure'
    | 'CreditQuality'
    | 'CumulativePerformanceSeries'
    | 'CurrencyId'
    | 'DailyGrowthSeries'
    | 'DailyPerformanceReturn'
    | ['DailyPerformanceReturn', ...Array<string>]
    | 'DownsideCaptureRatio'
    | 'EffectiveDuration'
    | 'EffectiveMaturity'
    | 'Esg'
    | 'ExcessReturnArithmetic'
    | 'ExcessReturnGeometric'
    | 'ExpenseRatio'
    | 'GlobalBondSector'
    | 'GlobalStockSector'
    | 'GrowthSeries'
    | 'HistoricalPerformanceSeries'
    | ['HistoricalPerformanceSeries', ...Array<string>]
    | 'HoldingCount'
    | 'InformationRatio'
    | 'Kurtosis'
    | 'ManagementExpenseRatio'
    | 'ManagementFee'
    | 'MarketCapital'
    | 'NegativeHoldingCount'
    | 'OngoingCharge'
    | 'PerformanceReturn'
    | ['PerformanceReturn', ...Array<string>]
    | 'PortfolioId'
    | 'PositiveHoldingCount'
    | 'ProspectiveBookValueYield'
    | 'ProspectiveCashFlowYield'
    | 'ProspectiveEarningsYield'
    | 'ProspectiveRevenueYield'
    | 'RegionalExposure'
    | 'RSquared'
    | 'SharpeRatio'
    | 'Skewness'
    | 'SortinoRatio'
    | 'SRRI'
    | 'StandardDeviation'
    | ['StandardDeviation', ...Array<string>]
    | 'StyleBox'
    | 'TrackingError'
    | 'TreynorRatio'
    | 'Type'
    | 'UpsideCaptureRatio'
    // Version 2
    | 'portfolioriskscoreV2'
);


/* *
 *
 *  Default Export
 *
 * */


export default XRayOptions;
