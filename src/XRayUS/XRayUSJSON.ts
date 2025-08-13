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
        },
        Risks: {
            RiskStatistics: Array<RiskStatistics>;
        };
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

    interface RiskStatistics {
        AsOfDate: string;
        TrailingTimePeriod: 'Year1' | 'Year2' | 'Year3' | 'Year5' | 'Year10';
        DataFrequency: 'Monthly' | 'Quarterly';
        Portfolio: RiskStatisticsPortfolio;
        Benchmark: RiskStatisticsBenchmark;
        Security: Array<RiskStatisticsSecurity>;
    }

    interface RiskStatisticsItem {
        Mean: number;
        SharpeRatio: number;
        StandardDeviation: number;
    }

    interface RiskStatisticsPortfolio extends RiskStatisticsItem {
        SortinoRatio: number;
        ExcessReturn: number;
        InformationRatio: number;
        TrackingError: number;
    }

    interface RiskStatisticsSecurity {
        RiskStatisticsItem: RiskStatisticsItem;
        SecurityId: string;
        Weight: number;
    }

    interface RiskStatisticsBenchmark extends RiskStatisticsItem {
        SortinoRatio: number;
    }

}


/* *
 *
 *  Default Export
 *
 * */


export default XRayUSJSON;
