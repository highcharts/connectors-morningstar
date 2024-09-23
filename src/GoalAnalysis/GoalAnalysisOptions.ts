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
    MorningstarMetadata,
    MorningstarOptions
} from '../Shared/MorningstarOptions';


/* *
 *
 *  API Options
 *
 * 
 * */


export interface GoalAnalysisConverterOptions extends MorningstarConverterOptions {
    // Nothing to add yet
}


export interface GoalAnalysisMetadata extends MorningstarMetadata {

    /**
     * Annualised required return percentage.
     */
    annualisedRequiredReturn: number;

    /**
     * Expected return on initial investment.
     */
    expectedReturn: number;

    /**
     * Target investment goal amount.
     */
    financialGoal: number;

    /**
     * Probability percentage of reaching investment goal.
     */
    probabilityOfReachingTarget: number;

    /**
     * Required return percentage.
     */
    requiredReturn: number;

    /**
     * Required return value.
     */
    requiredReturnValue: number;

    /**
     * Standard deviation value.
     */
    standardDeviation: number;

    /**
     * Total gain percentage.
     */
    totalGain: number;

    /**
     * Total investment value at end of time period.
     */
    totalInvestment: number;

    /**
     * Total return percentage.
     */
    totalReturn: number;

    /**
     * Number of years to reach goal.
     */
    years: number;

}


export interface GoalAnalysisOptions extends MorningstarOptions {

    /**
     * Amount investor invests yearly.
     */
    annualInvestment?: number;

    /**
     * Weight list of individual asset classes.
     */
    assetClassWeights?: Array<number>;

    /**
     * Investor’s current savings amount.
     */
    currentSavings?: number;

    /**
     * Returns time series data for charting purposes.
     */
    includeDetailedInvestmentGrowthGraph?: boolean;

    requestProbability?: number;

    /**
     * Investor’s target goal amount.
     */
    target?: number;

    /**
     * Time horizon in years.
     */
    timeHorizon?: number;

}


/* *
 *
 *  Default Export
 *
 * */


export default GoalAnalysisOptions;
