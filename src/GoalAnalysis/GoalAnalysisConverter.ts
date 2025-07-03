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
 *  Imports
 *
 * */


import {
    GoalAnalysisConverterOptions,
    GoalAnalysisMetadata
} from './GoalAnalysisOptions';
import GoalAnalysisJSON from './GoalAnalysisJSON';
import MorningstarConverter from '../Shared/MorningstarConverter';


/* *
 *
 *  Class
 *
 * */


export class GoalAnalysisConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: GoalAnalysisConverterOptions
    ) {
        super(options);

        this.metadata = {
            annualisedRequiredReturn: 0,
            columns: {},
            expectedReturn: 0,
            financialGoal: 0,
            probabilityOfReachingTarget: 0,
            requiredReturn: 0,
            requiredReturnValue: 0,
            standardDeviation: 0,
            totalGain: 0,
            totalInvestment: 0,
            totalReturn: 0,
            years: 0
        };
    }


    /* *
     *
     *  Properties
     *
     * */


    public readonly metadata: GoalAnalysisMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: GoalAnalysisConverterOptions
    ): void {
        const metadata = this.metadata;
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!GoalAnalysisJSON.isGoalAnalysisResponse(json)) {
            throw new Error('Invalid data');
        }

        // Prepare table

        table.deleteColumns();
        table.setColumn('Goal_Probability');
        table.setColumn('Goal_Amount');

        let seriesData = json.seriesData?.[0]?.data;

        for (let i = 0, iEnd = seriesData.length; i < iEnd; ++i) {
            table.setColumn(`Goal_AssetClass_${i}`);
        }

        // Add analysis to table

        let assetClassIndex = 0;
        let rowIndex = 0;

        for (const probabilityAccumulate of json.probabilityAccumulate) {
            table.setCell(
                'Goal_Probability',
                rowIndex,
                probabilityAccumulate.probability
            );
            table.setCell(
                'Goal_Amount',
                rowIndex,
                probabilityAccumulate.Amount
            );

            assetClassIndex = 0;
            seriesData = json.seriesData?.[rowIndex]?.data;

            for (const assetClassData of seriesData) {
                table.setCell(
                    `Goal_AssetClass_${assetClassIndex}`,
                    rowIndex,
                    assetClassData
                );
                ++assetClassIndex;
            }

            ++rowIndex;
        }

        // Update meta data

        metadata.annualisedRequiredReturn = json.annualisedRequiredReturn;
        metadata.expectedReturn = json.expectedReturn;
        metadata.financialGoal = json.financialGoal;
        metadata.probabilityOfReachingTarget = json.probabilityOfReachingTarget;
        metadata.requiredReturn = json.requiredReturn;
        metadata.requiredReturnValue = json.requiredReturnValue;
        metadata.standardDeviation = json.standardDeviation;
        metadata.totalGain = json.totalGain;
        metadata.totalInvestment = json.totalInvestment;
        metadata.totalReturn = json.totalReturn;
        metadata.years = json.years;

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default GoalAnalysisConverter;
