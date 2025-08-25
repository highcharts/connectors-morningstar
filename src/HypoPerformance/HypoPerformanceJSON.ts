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
 *  Namespace
 *
 * */


namespace HypoJSON {

    export interface HypoResponse {
        Hypo: Array<Hypo>;
    }

    export interface Hypo {
        PortfolioName: string;
        PortfolioSummary: PortfolioSummary;
    }

    export interface PortfolioSummary {
        AsOfDate: string;
        PortfolioSummaryChart: PortfolioSummaryChart;
    }

    export interface PortfolioSummaryChart {
        Frequency: string;
        Portfolio: Portfolio;
        Benchmark: Portfolio;
        NetAmountInvested: Array<{
            Id: string;
            Value: number;
        }>;
    }

    export interface Portfolio {
        StartDate: string;
        Data: Array<{
            Id: string;
            Value: number;
        }>;
    }

}


/* *
 *
 *  Default Export
 *
 * */


export default HypoJSON;
