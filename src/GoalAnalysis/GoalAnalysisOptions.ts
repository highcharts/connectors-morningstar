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
    MorningstarOptions
} from '../Shared/MorningstarOptions';


/* *
 *
 *  API Options
 *
 * 
 * */


export interface GoalAnalysisAssetClassWeights {

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
     * Value of initial investment at end of time series based on different
     * probability percentages.
     */
    probabilityAccumulate: number;

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
     * Value of initial investment at end of each year of the time series based
     * on different probability percentages.
     */
    seriesData: number;

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

export interface GoalAnalysisConverterOptions extends MorningstarConverterOptions {
    // Nothing to add yet
}


export interface GoalAnalysisOptions extends MorningstarOptions {

    /**
     * Weight list of individual asset classes.
     */
    assetClassWeights?: GoalAnalysisAssetClassWeights;

}


/* *
 *
 *  Default Export
 *
 * */


export default GoalAnalysisOptions;
