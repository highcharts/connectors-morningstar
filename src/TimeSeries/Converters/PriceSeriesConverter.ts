/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Eskil Gjerde Sviggum
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import MorningstarConverter from '../../Shared/MorningstarConverter';
import { PriceSeriesOptions } from '../TimeSeriesOptions';
import TimeSeriesJSON from '../TimeSeriesJSON';


/* *
 *
 *  Declarations
 *
 * */


interface Price {
    Id: string;
    EndDate: number;
    Value: number;
}


/* *
 *
 *  Class
 *
 * */


export class PriceSeriesConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: PriceSeriesOptions = { type: 'Price' }
    ) {
        super(options);

        this.options = options as Required<PriceSeriesOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<PriceSeriesOptions>;


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: PriceSeriesOptions
    ): void {
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!TimeSeriesJSON.isTimeSeriesResponse(json)) {
            throw new Error('Invalid data');
        }

        // Cumulate prices by date

        const securityIds: Array<string> = [];
        const sortedPrices: Array<Price> = [];

        for (const security of json.Security) {

            if (!security.HistoryDetail) {
                continue;
            }

            securityIds.push(security.Id);

            for (const detail of security.HistoryDetail) {
                sortedPrices.push({
                    EndDate: Date.parse(detail.EndDate),
                    Id: security.Id,
                    Value: parseFloat(detail.Value)
                });
            }

        }

        // Sort prices by date

        sortedPrices.sort((a, b) => (
            a.EndDate === b.EndDate ?
                0 :
                a.EndDate < b.EndDate ? -1 : 1
        ));

        // Reset table

        table.deleteColumns();
        table.setColumn('Date');

        for (const securityId of securityIds) {
            table.setColumn(securityId);
        }

        // Add prices to table

        let currentTableDate: number = 0;
        let currentTableIndex: number = -1;

        for (const price of sortedPrices) {
            if (currentTableDate !== price.EndDate) {
                currentTableDate = price.EndDate;
                table.setCell('Date', ++currentTableIndex, currentTableDate);
            }
            table.setCell(price.Id, currentTableIndex, price.Value);
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default PriceSeriesConverter;