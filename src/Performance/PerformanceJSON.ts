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
    }

    export interface Returns {
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

}


/* *
 *
 *  Default Export
 *
 * */


export default PerformanceJSON;
