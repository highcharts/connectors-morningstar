/* *
 *
 *  (c) 2009-2026 Highsoft AS
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
 *  Namespace
 *
 * */


namespace PerformanceJSON {

    export interface PerformanceResponse {
        Performance: Array<Performance>;
    }

    export interface Performance {
        PortfolioName: string;
        Returns?: Returns;
        Risks?: {
            RiskStatistics: Array<RiskStatistics>;
            MPTStatistics: Array<MPTStatisticsBreakdownItem>;
            CorrelationMatrix: Array<CorrelationMatrixItem>;
        }
    }

    interface RiskStatistics {
        AsOfDate: string;
        TrailingTimePeriod: TrailingTimePeriod;
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
        GrossMean?: number;
        GrossSharpeRatio?: number;
        GrossStandardDeviation?: number;
        InformationRatio: number;
        GrossInformationRatio?: number;
        TrackingError: number;
        GrossTrackingError: number;
        SortinoRatio: number;
        GrossSortinoRatio?: number;
        ExcessReturn: number;
        GrossExcessReturn?: number;
    }
    interface RiskStatisticsBenchmark extends RiskStatisticsItem {
        InformationRatio: number;
        TrackingError: number;
        SortinoRatio: number;
        ExcessReturn: number;
    }

    interface RiskStatisticsSecurity {
        RiskStatisticsItem: RiskStatisticsItem;
        SecurityId: string;
        Weight: number;
    }

    interface Returns {
        CalendarYearReturn: {
            AsOfDate: string;
            Benchmark: {
                CalendarYear: Array<{
                    Id: number;
                    Value: number;
                }>;
            };
            Portfolio: {
                CalendarYear: Array<{
                    Id: number;
                    Value: number;
                }>;
            };
        };
        TrailingReturns: {
            AsOfDate: string;
            Portfolio: {
                TimePeriod: Array<{
                    Id: string;
                    Value: number;
                    GrossValue: number;
                }>;
            };
            Benchmark: {
                TimePeriod: Array<{
                    Id: string;
                    Value: number;
                }>;
            };
        };
    }

    interface MPTStatisticsBreakdownItem {
        AsOfDate: string;
        TrailingTimePeriod: TrailingTimePeriod;
        DataFrequency: string;
        Portfolio: MPTStatisticsPortfolio;
    }

    interface MPTStatisticsPortfolio {
        Alpha: number;
        Beta: number;
        GrossAlpha?: number;
        GrossBeta?: number;
        GrossRSquared?: number;
        GrossUpCaptureRatio?: number;
        GrossDownCaptureRatio?: number;
        GrossTreynorRatio?: number;
        GrossOmegaRatio?: number;
        RSquared: number;
        UpCaptureRatio: number;
        DownCaptureRatio: number;
        TreynorRatio: number;
        OmegaRatio: number;
    }
    interface CorrelationMatrixItem {
        TrailingTimePeriod: TrailingTimePeriod;
        DataFrequency: 'Monthly';
        StartDate: string;
        EndDate: string;
        Correlations: Array<CorrelationItemKey>
    }

    interface CorrelationItemKey {
        Id: number;
        SecurityId: string;
        UseExtendedReturns: boolean;
        Type: 'Portfolio' | 'Security';
        CorrelatedItemKey: Array<CorrelatedItemKey>
    }

    interface CorrelatedItemKey {
        CorrelatedItemKeyId: number;
        Type: 'Portfolio' | 'Security';
        Value: number;
    }

    type TrailingTimePeriod = (
        | 'Year1'
        | 'Year2'
        | 'Year3'
        | 'Year5'
        | 'Year10'
    );

}


/* *
 *
 *  Default Export
 *
 * */


export default PerformanceJSON;
