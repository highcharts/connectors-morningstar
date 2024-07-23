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
    RatingSeriesOptions
} from '../TimeSeriesOptions';
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


export interface TimeSeriesRatingConverterOptions
    extends MorningstarConverterOptions, RatingSeriesOptions {

}


/* *
 *
 *  Class
 *
 * */


export class TimeSeriesConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor(
        options?: TimeSeriesRatingConverterOptions
    ) {
        super(options);

        this.options = options as Required<TimeSeriesRatingConverterOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<TimeSeriesRatingConverterOptions>;

    /* *
     *
     *  Functions
     *
     * */


    public parse(
        options: TimeSeriesRatingConverterOptions
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
        const sortedRating: Array<Rating> = [];

        for (const security of json.Security) {
            if (!security.RatingSeries) {
                continue;
            }
            securityIds.push(security.Id);
            for (const history of security.RatingSeries) {
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


export default TimeSeriesConverter;
