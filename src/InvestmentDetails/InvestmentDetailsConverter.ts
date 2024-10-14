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
 *  - Askel Eirik Johansson
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

        this.metadata = {
            columns: {}
        };
    }


    /* *
     *
     *  Properties
     *
     * */


    public readonly metadata: InvestmentDetailsMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: InvestmentDetailsConverterOptions
    ): void {
        const metadata = this.metadata;
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

        table.deleteColumns();
        table.setColumn('InvestmentDetails_TrailingPerformance_TimePeriod');
        table.setColumn('InvestmentDetails_TrailingPerformance_Value');

        // Add trailing performance to table

        const trailingPerformanceReturn = investmentDetails.TrailingPerformance[0].Return;

        for (let i = 0, iEnd = trailingPerformanceReturn.length; i < iEnd; ++i) {
            table.setCell(
                'InvestmentDetails_TrailingPerformance_TimePeriod',
                i,
                trailingPerformanceReturn[i].TimePeriod
            );
            table.setCell(
                'InvestmentDetails_TrailingPerformance_Value',
                i,
                trailingPerformanceReturn[i].Value
            );
        }

        // Update meta data

        metadata.Id = investmentDetails.Id;
        metadata.Isin = investmentDetails.Isin;

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default InvestmentDetailsConverter;
