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
    MorningstarConverter,
    MorningstarConverterOptions
} from '../../Shared/MorningstarConverter';
import {
    CumulativeReturnSeriesOptions
} from '../TimeSeriesOptions';
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


export interface TSCumulativeReturnConverterOptions
    extends MorningstarConverterOptions, CumulativeReturnSeriesOptions {
    // Nothing to add
}


/* *
 *
 *  Class
 *
 * */


export class TimeSeriesCumulativeReturnConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor(
        options?: TSCumulativeReturnConverterOptions
    ) {
        super(options);

        this.options = options as Required<TSCumulativeReturnConverterOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<TSCumulativeReturnConverterOptions>;

    /* *
     *
     *  Functions
     *
     * */


    public parse(
        options: TSCumulativeReturnConverterOptions
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

        // Cumulate security ratings by date

        const securityIds: Array<string> = [];
        const sortedRating: Array<CumulativeReturn> = [];

        for (const security of json.TimeSeries.Security) {
            if (!security.CumulativeReturnSeries) {
                continue;
            }
            securityIds.push(security.Id);
            for (const history of security.CumulativeReturnSeries) {
                for (const detail of history.HistoryDetail) {
                    sortedRating.push({
                        EndDate: Date.parse(detail.EndDate),
                        Id: security.Id,
                        Value: parseFloat(detail.Value)
                    });
                }
            }
        }

        // Sort ratings by date

        sortedRating.sort((a, b) => (
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

        for (const rating of sortedRating) {
            if (currentTableDate !== rating.EndDate) {
                currentTableDate = rating.EndDate;
                table.setCell('Date', ++currentTableIndex, currentTableDate);
            }
            table.setCell(rating.Id, currentTableIndex, rating.Value);
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesCumulativeReturnConverter;
