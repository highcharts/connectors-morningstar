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
import { TimeSeriesGrowthOptions } from '../TimeSeriesOptions';
import TimeSeriesJSON from '../TimeSeriesJSON';


/* *
 *
 *  Declarations
 *
 * */


interface Growth {
    Id: string;
    EndDate: number;
    Value: number;
}


/* *
 *
 *  Class
 *
 * */


export class GrowthSeriesConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor(
        options?: TimeSeriesGrowthOptions
    ) {
        super(options);

        this.options = options as Required<TimeSeriesGrowthOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<TimeSeriesGrowthOptions>;

    /* *
     *
     *  Functions
     *
     * */


    public parse(
        options: TimeSeriesGrowthOptions
    ): void {
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!TimeSeriesJSON.isTimeSeriesReponse(json)) {
            throw new Error('Invalid data');
        }

        // Cumulate security ratings by date

        const securityIds: Array<string> = [];
        const sortedGrowths: Array<Growth> = [];

        for (const security of json.Security) {

            if (!security.GrowthSeries) {
                continue;
            }

            securityIds.push(security.Id);

            for (const history of security.GrowthSeries) {
                for (const detail of history.HistoryDetail) {
                    sortedGrowths.push({
                        EndDate: Date.parse(detail.EndDate),
                        Id: security.Id,
                        Value: parseFloat(detail.Value)
                    });
                }
            }

        }

        // Sort ratings by date

        sortedGrowths.sort((a, b) => (
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

        // Add ratings to table

        let currentTableDate: number = 0;
        let currentTableIndex: number = 0;

        for (const growth of sortedGrowths) {
            if (currentTableDate !== growth.EndDate) {
                currentTableDate = growth.EndDate;
                table.setCell('Date', ++currentTableIndex, currentTableDate);
            }
            table.setCell(growth.Id, currentTableIndex, growth.Value);
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default GrowthSeriesConverter;
