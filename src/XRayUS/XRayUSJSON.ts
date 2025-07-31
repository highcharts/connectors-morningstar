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
        }
    }

    export interface FixedIncomeAnalysis {
        CreditQuality: {
            Portfolio: Record<string, number>;
            Benchmark: Record<string, number>;
        }
    }

    export interface InvestmentStyle {
        EquityStyle: EquityStyle;
        FixedIncomeStyle: FixedIncomeStyle;
    }

    export interface EquityStyle {
        EquityStyleBreakdown: {
            Portfolio: Record<string, number>;
            SecurityBreakdown: Array<SecurityBreakdown>;
        };
    }

    export interface FixedIncomeStyle {
        FixedIncomeStyleBreakdown: {
            [key: string]: number | string | Array<SecurityBreakdown>;
            SecurityBreakdown: Array<SecurityBreakdown>;
        };
    }

    export interface SecurityBreakdown {
        EquityStyleBreakdownItem?: Record<string, number>;
        FixedIncomeStyleBreakdownItem?: Record<string, number>;
        SecurityId: string;
    }

}


/* *
 *
 *  Default Export
 *
 * */


export default XRayUSJSON;
