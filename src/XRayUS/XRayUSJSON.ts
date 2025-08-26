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
 *  Namespace
 *
 * */


namespace XRayUSJSON {

    export interface XRayUSResponse {
        XRay: Array<XRayUS>;
        SecurityReference: Array<SecurityReference>;
    }

    export interface SecurityReference {
        BaseCurrency: string;
        ISIN: string;
        InceptionDate: string;
        Name: string;
        SecurityId: string;
        SecurityReferenceTypes: Array<string>;
        Type: string;
    }

    export interface XRayUS {
        PortfolioName: string;
        Analysis: {
            FixedIncomeAnalysis: FixedIncomeAnalysis;
            InvestmentStyle: InvestmentStyle;
        };
        Holdings: {
            AsOfDate: string;
            PortfolioHoldings: PortfolioHoldings;
        };
        Statistics: {
            FundStatistics: FundStatistics
        };

    }

    export interface PortfolioHoldings {
        AsOfDate: string;
        Security: Array<Security>;
    }

    export interface Security {
        FundPortfolioDate: string;
        MarketValue: number;
        Name: string;
        PercentAssets: number;
        SecurityId: string;
        Year1: number;
        Year3: number;
        Year5: number;
        Year10: number;
        NotClassifiedHoldingId: string;
    }

    export interface FixedIncomeAnalysis {
        CreditQuality: {
            Portfolio: CreditQualityBreakdown;
            Benchmark: CreditQualityBreakdown;
        };
    }

    export interface InvestmentStyle {
        AsOfDate: string;
        EquityStyle: EquityStyle;
        FixedIncomeStyle: FixedIncomeStyle;
    }

    export interface EquityStyle {
        AsOfDate: string;
        EquityStyleBreakdown: {
            AsOfDate: string;
            Portfolio: EquityStyleBreakdownItem;
            SecurityBreakdown: Array<EquityStyleSecurityBreakdownItem>;
        };
    }

    export interface FixedIncomeStyle {
        AsOfDate: string;
        FixedIncomeStyleBreakdown: FixedIncomeStyleBreakdown;
        Portfolio: {
            EffectiveDuration: number;
            EffectiveMaturity: number;
        };
        PortfolioAnalyzed: number;
    }

    export interface FixedIncomeStyleBreakdown extends FixedIncomeStyleBreakdownItem {
        AsOfDate: string;
        SecurityBreakdown: Array<FixedIncomeStyleSecurityBreakdownItem>;
    }

    export interface FixedIncomeStyleSecurityBreakdownItem {
        Analyzed: number;
        FixedIncomeStyleBreakdownItem: FixedIncomeStyleBreakdownItem;
        NotAnalyzed: number;
        SecurityId: string;
    }

    export interface EquityStyleSecurityBreakdownItem {
        Analyzed: number;
        EquityStyleBreakdownItem: EquityStyleBreakdownItem;
        NotAnalyzed: number;
        SecurityId: string;
    }

    interface FixedIncomeStyleBreakdownItem {
        HighLtd: number;
        HighMod: number;
        HighExt: number;
        MedLtd: number;
        MedMod: number;
        MedExt: number;
        LowLtd: number;
        LowMod: number;
        LowExt: number;
        Unclassified: number;
    }

    interface EquityStyleBreakdownItem {
        LargeBlend: number;
        LargeGrowth: number;
        LargeValue: number;
        MidBlend: number;
        MidGrowth: number;
        MidValue: number;
        SmallBlend: number;
        SmallGrowth: number;
        SmallValue: number;
        Unclassified: number;
    }

    interface CreditQualityBreakdown {
        AAA: number;
        AA: number;
        A: number;
        BBB: number;
        BB: number;
        B: number;
        BelowB: number;
        NotRated: number;
    }

    interface FundStatistics {
        AsOfDate: string;
        PortfolioAnalyzed: number;
        Portfolio: FundStatisticsPortfolioBreakdown;
        SecurityBreakdown: Array<FundStatisticsSecurityBreakdown>
    }

    interface FundStatisticsPortfolioBreakdown {
        AverageNetExpenseRatio: number;
        AverageGrossExpenseRatio: number;
        PotentialCapGainsExposure: number;
        AverageManagementExpenseRatio: number;
        AverageManagementFee: number;
        EstimatedMutualFundExpensesAmount: number;
    }

    interface FundStatisticsSecurityBreakdown {
        SecurityId: string;
        Analyzed: number;
        NotAnalyzed: number;
        FundStatisticsItem: FundStatisticsItem;
    }

    interface FundStatisticsItem {
        AverageNetExpenseRatio: number;
        AverageGrossExpenseRatio: number;
        PotentialCapGainsExposure: number;
    }

}


/* *
 *
 *  Default Export
 *
 * */


export default XRayUSJSON;
