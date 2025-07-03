/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
 *  Namespace
 *
 * */


namespace GoalAnalysisJSON {


    /* *
     *
     *  Declarations
     *
     * */


    export interface GoalAnalysisResponse {
        annualisedRequiredReturn: number;
        expectedReturn: number;
        financialGoal: number;
        probabilityAccumulate: Array<ProbabilityAccumulate>;
        probabilityOfReachingTarget: number;
        requiredReturn: number;
        requiredReturnValue: number;
        seriesData: Array<SeriesData>;
        standardDeviation: number;
        totalGain: number;
        totalInvestment: number;
        totalReturn: number;
        years: number;
    }


    export interface ProbabilityAccumulate {
        Amount: number;
        probability: number;
    }


    export interface SeriesData {
        data: Array<number>;
        probability: number;
    }


    /* *
     *
     *  Functions
     *
     * */


    export function isGoalAnalysisResponse (
        json?: unknown
    ): json is GoalAnalysisResponse {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as GoalAnalysisResponse).annualisedRequiredReturn === 'number' &&
            typeof (json as GoalAnalysisResponse).probabilityAccumulate === 'object' &&
            (json as GoalAnalysisResponse).probabilityAccumulate instanceof Array &&
            (
                (json as GoalAnalysisResponse).probabilityAccumulate.length === 0 ||
                isProbabilityAccumulate((json as GoalAnalysisResponse).probabilityAccumulate[0])
            ) &&
            typeof (json as GoalAnalysisResponse).seriesData === 'object' &&
            (json as GoalAnalysisResponse).seriesData instanceof Array &&
            (
                (json as GoalAnalysisResponse).seriesData.length === 0 ||
                isSeriesData((json as GoalAnalysisResponse).seriesData[0])
            )
        );
    }


    function isProbabilityAccumulate (
        json?: unknown
    ): json is ProbabilityAccumulate {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as ProbabilityAccumulate).Amount === 'number' &&
            typeof (json as ProbabilityAccumulate).probability === 'number'
        );
    }


    function isSeriesData (
        json?: unknown
    ): json is SeriesData {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as SeriesData).probability === 'number' &&
            typeof (json as SeriesData).data === 'object' &&
            (json as SeriesData).data instanceof Array &&
            (
                (json as SeriesData).data.length === 0 ||
                typeof (json as SeriesData).data[0] === 'number'
            )
        );
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default GoalAnalysisJSON;
