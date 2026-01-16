/* *
 *
 *  (c) 2009-2026 Highsoft AS
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
import { RollingReturnSeriesOptions } from '../TimeSeriesOptions';
import TimeSeriesJSON from '../TimeSeriesJSON';
import MorningstarURL from '../../Shared/MorningstarURL';


/* *
 *
 *  Declarations
 *
 * */


interface RollingReturn {
    Id: string;
    EndDate: number;
    Value: number;
}


/* *
 *
 *  Class
 *
 * */


export class RollingReturnSeriesConverter extends TimeSeriesConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: RollingReturnSeriesOptions = { type: 'RollingReturn' }
    ) {
        super(options);

        this.options = options as Required<RollingReturnSeriesOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<RollingReturnSeriesOptions>;

    public override path: string = 'timeseries/rollingreturn';


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: RollingReturnSeriesOptions
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

        // Cumulate security rolling returns by date

        const securityIds: Array<string> = [];
        const sortedRollingReturns: Array<RollingReturn> = [];

        for (const security of json.TimeSeries.Security) {

            if (!security.RollingReturn) {
                continue;
            }

            securityIds.push(security.Id);

            for (const history of security.RollingReturn) {
                for (const detail of history.HistoryDetail) {
                    sortedRollingReturns.push({
                        EndDate: Date.parse(detail.EndDate),
                        Id: security.Id,
                        Value: parseFloat(detail.Value)
                    });
                }
            }

        }

        // Sort rolling returns by date

        sortedRollingReturns.sort((a, b) => (
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

        // Add rolling returns to table

        let currentTableDate: number = 0;
        let currentTableIndex: number = -1;

        for (const rollingReturn of sortedRollingReturns) {
            if (currentTableDate !== rollingReturn.EndDate) {
                currentTableDate = rollingReturn.EndDate;
                table.setCell('Date', ++currentTableIndex, currentTableDate);
            }
            table.setCell(rollingReturn.Id, currentTableIndex, rollingReturn.Value);
        }

    }

    public override decorateURL (url: MorningstarURL) {
        if (this.options.rollingPeriod !== undefined) {
            url.searchParams.set('rollingPeriod', `${this.options.rollingPeriod}`);
        }
    }

}


/* *
 *
 *  Default Export
 *
 * */


export default RollingReturnSeriesConverter;
