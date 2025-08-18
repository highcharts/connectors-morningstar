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
 *  Namespace
 *
 * */


namespace PerformanceJSON {

    export interface PerformanceResponse {
        Performance: Array<Performance>;
    }

    export interface Performance {
        PortfolioName: string;
        Returns: Returns;
        Risks: {
            CorrelationMatrix: Array<CorrelationMatrixItem>;
        }
    }

    export interface Returns {
        CalendarYearReturn: {
            AsOfDate: string;
            Benchmark: {
                CalendarYear: Array<{
                    Id: number;
                    Value: number
                }>;
            };
            Portfolio: {
                CalendarYear: Array<{
                    Id: number;
                    Value: number
                }>;
            };
        };
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
