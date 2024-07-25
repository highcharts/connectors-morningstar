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


import MorningstarConverter from '../../Shared/MorningstarConverter';
import { CumulativeReturnSeriesOptions } from '../TimeSeriesOptions';
import TimeSeriesJSON from '../TimeSeriesJSON';


/* *
 *
 *  Declarations
 *
 * */


interface CumulativeReturn {
    Id: string;
    EndDate: number;
    Value: number;
}


/* *
 *
 *  Class
 *
 * */


export class CumulativeReturnSeriesConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor(
        options?: CumulativeReturnSeriesOptions
    ) {
        super(options);

        this.options = options as Required<CumulativeReturnSeriesOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<CumulativeReturnSeriesOptions>;

    /* *
     *
     *  Functions
     *
     * */


    public parse(
        options: CumulativeReturnSeriesOptions
    ): void {
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!TimeSeriesJSON.isResponse(json)) {
            throw new Error('Invalid data');
        }

        // Cumulate security returns by date

        const securityIds: Array<string> = [];
        const sortedReturns: Array<CumulativeReturn> = [];

        for (const security of json.TimeSeries.Security) {

            if (!security.CumulativeReturnSeries) {
                continue;
            }

            securityIds.push(security.Id);

            for (const history of security.CumulativeReturnSeries) {
                for (const detail of history.HistoryDetail) {
                    sortedReturns.push({
                        EndDate: Date.parse(detail.EndDate),
                        Id: security.Id,
                        Value: parseFloat(detail.Value)
                    });
                }
            }

        }

        // Sort returns by date

        sortedReturns.sort((a, b) => (
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

        // Add returns to table

        let currentTableDate: number = 0;
        let currentTableIndex: number = 0;

        for (const return_ of sortedReturns) {
            if (currentTableDate !== return_.EndDate) {
                currentTableDate = return_.EndDate;
                table.setCell('Date', ++currentTableIndex, currentTableDate);
            }
            table.setCell(return_.Id, currentTableIndex, return_.Value);
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default CumulativeReturnSeriesConverter;
