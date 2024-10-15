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
 *  - Pawel Lysy
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
    MorningstarMetadata,
    MorningstarOptions
} from '../Shared/MorningstarOptions';


/* *
 *
 *  API Options
 *
 * 
 * */


export interface SecurityDetailsConverterOptions extends MorningstarConverterOptions {
    // Nothing to add yet
}


export interface SecurityDetailsMetadata extends MorningstarMetadata {
    Id?: string;
    Isin?: string;
    Domicile?: string;
    Currency?: string;
    ReturnType?: string;
    Type?: string;
    CurrencyId?: string;
    Date?: string;
}


export interface SecurityDetailsOptions extends MorningstarOptions {

    /**
     * Amount investor invests yearly.
     *
     * **Note:** Required when `includeDetailedInvestmentGrowthGraph`option is
     * set to `true`.
     */
    annualInvestment?: number;

    /**
     * Weight list of individual asset classes.
     */
    assetClassWeights?: Array<number>;

    /**
     * Investor’s current savings amount.
     *
     * **Note:** Required when `includeDetailedInvestmentGrowthGraph`option is
     * set to `true`.
     */
    currentSavings?: number;

    /**
     * Returns time series data for charting purposes.
     */
    includeDetailedInvestmentGrowthGraph?: boolean;

    requestProbability?: number;

    /**
     * Investor’s target goal amount.
     *
     * **Note:** Required when `includeDetailedInvestmentGrowthGraph`option is
     * set to `true`.
     */
    target?: number;

    /**
     * Time horizon in years.
     *
     * **Note:** Required when `includeDetailedInvestmentGrowthGraph`option is
     * set to `true`.
     */
    timeHorizon?: number;

}


/* *
 *
 *  Default Export
 *
 * */


export default SecurityDetailsOptions;
