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


import {
    InvestmentDetailsConverterOptions,
    InvestmentDetailsMetadata
} from './InvestmentDetailsOptions';
import InvestmentDetailsJSON from './InvestmentDetailsJSON';
import MorningstarConverter from '../Shared/MorningstarConverter';


/* *
 *
 *  Class
 *
 * */


export class InvestmentDetailsConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: InvestmentDetailsConverterOptions
    ) {
        super(options);

        // this.mets
    }


    /* *
     *
     *  Properties
     *
     * */


    // public readonly metadata: InvestmentDetailsMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: InvestmentDetailsConverterOptions
    ): void {
        // const metadata = this.metadata;
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!InvestmentDetailsJSON.isInvestmentDetailsResponse(json)) {
            throw new Error('Invalid data');
        }

        const investmentDetails = json[0];

        // Prepare table
        console.log(investmentDetails.TrailingPerfromance[0].Return[0].Date)

        table.deleteColumns();
        table.setColumn('InvestmentDetails_TrailingPerformance_Date');
        table.setColumn('InvestmentDetails_TrailingPerformance_TimePeriod');
        table.setColumn('InvestmentDetails_TrailingPerformance_Value');

        // let seriesData = json.seriesData?.[0]?.data;

        // for (let i = 0, iEnd = seriesData.length; i < iEnd; ++i) {
        //     table.setColumn(`Goal_AssetClass_${i}`);
        // }

        // Add analysis to table

        // let assetClassIndex = 0;
        // let rowIndex = 0;

        // for (const probabilityAccumulate of json.probabilityAccumulate) {
        //     table.setCell(
        //         'Goal_Probability',
        //         rowIndex,
        //         probabilityAccumulate.probability
        //     );
        //     table.setCell(
        //         'Goal_Amount',
        //         rowIndex,
        //         probabilityAccumulate.Amount
        //     );

        //     assetClassIndex = 0;
        //     seriesData = json.seriesData?.[rowIndex]?.data;

        //     for (const assetClassData of seriesData) {
        //         table.setCell(
        //             `Goal_AssetClass_${assetClassIndex}`,
        //             rowIndex,
        //             assetClassData
        //         );
        //         ++assetClassIndex;
        //     }

        //     ++rowIndex;
        // }

        // Update meta data

        // metadata.annualisedRequiredReturn = json.annualisedRequiredReturn;
        // metadata.expectedReturn = json.expectedReturn;
        // metadata.financialGoal = json.financialGoal;
        // metadata.probabilityOfReachingTarget = json.probabilityOfReachingTarget;
        // metadata.requiredReturn = json.requiredReturn;
        // metadata.requiredReturnValue = json.requiredReturnValue;
        // metadata.standardDeviation = json.standardDeviation;
        // metadata.totalGain = json.totalGain;
        // metadata.totalInvestment = json.totalInvestment;
        // metadata.totalReturn = json.totalReturn;
        // metadata.years = json.years;

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default InvestmentDetailsConverter;
