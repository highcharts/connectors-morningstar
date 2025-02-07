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
 *  - Jedrzej Ruta
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import TimeSeriesConverter from '../TimeSeriesConverter';
import { ReturnSeriesOptions } from '../TimeSeriesOptions';
import TimeSeriesJSON from '../TimeSeriesJSON';


/* *
 *
 *  Declarations
 *
 * */


interface Return {
    Id: string;
    EndDate: number;
    Value: number;
}


/* *
 *
 *  Class
 *
 * */


export class ReturnSeriesConverter extends TimeSeriesConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: ReturnSeriesOptions = { type: 'Return' }
    ) {
        super(options);

        this.options = options as Required<ReturnSeriesOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<ReturnSeriesOptions>;

    public override path: string = 'timeseries/return';


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: ReturnSeriesOptions
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
        const sortedReturns: Array<Return> = [];

        for (const security of json.TimeSeries.Security) {

            if (!security.ReturnSeries) {
                continue;
            }

            securityIds.push(security.Id);

            for (const history of security.ReturnSeries) {
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
        let currentTableIndex: number = -1;

        for (const sortedReturn of sortedReturns) {
            if (currentTableDate !== sortedReturn.EndDate) {
                currentTableDate = sortedReturn.EndDate;
                table.setCell('Date', ++currentTableIndex, currentTableDate);
            }
            table.setCell(sortedReturn.Id, currentTableIndex, sortedReturn.Value);
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default ReturnSeriesConverter;
