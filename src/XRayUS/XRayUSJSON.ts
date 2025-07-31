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
        // Add more return types here
        PortfolioName: string;
        Analysis: {
            FixedIncomeAnalysis: FixedIncomeAnalysis
        }
    }

    export interface FixedIncomeAnalysis {
        CreditQuality: {
            Portfolio: Record<string, number>;
            Benchmark: Record<string, number>;
        }
    }

}


/* *
 *
 *  Default Export
 *
 * */


export default XRayUSJSON;
