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
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import TimeSeriesConverter from '../TimeSeriesConverter';
import { RatingSeriesOptions } from '../TimeSeriesOptions';
import TimeSeriesJSON from '../TimeSeriesJSON';


/* *
 *
 *  Declarations
 *
 * */


interface Rating {
    Id: string;
    EndDate: number;
    Value: number;
}


/* *
 *
 *  Class
 *
 * */


export class RatingSeriesConverter extends TimeSeriesConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: RatingSeriesOptions = { type: 'Rating' }
    ) {
        super(options);

        this.options = options as Required<RatingSeriesOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<RatingSeriesOptions>;

    public override path: string = 'timeseries/rating';


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: RatingSeriesOptions
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

        // Cumulate security ratings by date

        const securityIds: Array<string> = [];
        const sortedRatings: Array<Rating> = [];

        for (const security of json.Security) {

            if (!security.RatingSeries) {
                continue;
            }

            securityIds.push(security.Id);

            for (const history of security.RatingSeries) {
                for (const detail of history.HistoryDetail) {
                    sortedRatings.push({
                        EndDate: Date.parse(detail.EndDate),
                        Id: security.Id,
                        Value: parseFloat(detail.Value)
                    });
                }
            }

        }

        // Sort ratings by date

        sortedRatings.sort((a, b) => (
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
        let currentTableIndex: number = -1;

        for (const rating of sortedRatings) {
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


export default RatingSeriesConverter;
