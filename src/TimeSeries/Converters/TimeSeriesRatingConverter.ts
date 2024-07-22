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


interface RatingHistoryDetailJSON {
    EndDate: string;
    Value: string;
}


interface RatingJSON {
    Security: Array<RatingSecurityJSON>;
}


interface RatingSecurityJSON {
    Id: string;
    RatingSeries: Array<RatingSeriesJSON>;
}


interface RatingSeriesJSON {
    HistoryDetail: Array<RatingHistoryDetailJSON>;
}


export interface TimeSeriesRatingConverterOptions
    extends MorningstarConverterOptions, RatingSeriesOptions {

}


/* *
 *
 *  Functions
 *
 * */


function isRatingHistoryDetailJSON(
    json?: unknown
): json is RatingHistoryDetailJSON {
    return (
        !!json &&
        typeof json === 'object' &&
        typeof (json as RatingHistoryDetailJSON).EndDate === 'string' &&
        typeof (json as RatingHistoryDetailJSON).Value === 'string'
    );
}


function isRatingJSON(
    json?: unknown
): json is RatingJSON {
    return (
        !!json &&
        typeof json === 'object' &&
        typeof (json as RatingJSON).Security === 'object' &&
        (json as RatingJSON).Security instanceof Array &&
        (
            (json as RatingJSON).Security.length === 0 ||
            isRatingSecurityJSON((json as RatingJSON).Security[0])
        )
    );
}


function isRatingSecurityJSON(
    json?: unknown
): json is RatingSecurityJSON {
    return (
        !!json &&
        typeof json === 'object' &&
        typeof (json as RatingSecurityJSON).Id === 'string' &&
        typeof (json as RatingSecurityJSON).RatingSeries === 'object' &&
        (json as RatingSecurityJSON).RatingSeries instanceof Array &&
        (
            (json as RatingSecurityJSON).RatingSeries.length === 0 ||
            isRatingSeriesJSON((json as RatingSecurityJSON).RatingSeries[0])
        )
    );
}


function isRatingSeriesJSON(
    json?: unknown
): json is RatingSeriesJSON {
    return (
        !!json &&
        typeof json === 'object' &&
        typeof (json as RatingSeriesJSON).HistoryDetail === 'object' &&
        (json as RatingSeriesJSON).HistoryDetail instanceof Array &&
        (
            (json as RatingSeriesJSON).HistoryDetail.length === 0 ||
            isRatingHistoryDetailJSON(
                (json as RatingSeriesJSON).HistoryDetail[0]
            )
        )
    );
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

        if (!isRatingJSON(json)) {
            throw new Error('Invalid data');
        }

        // Cumulate security ratings by date

        const securityIds: Array<string> = [];
        const sortedRating: Array<Rating> = [];

        for (const security of json.Security) {
            securityIds.push(security.Id);
            for (const series of security.RatingSeries) {
                for (const history of series.HistoryDetail) {
                    sortedRating.push({
                        EndDate: Date.parse(history.EndDate),
                        Id: security.Id,
                        Value: parseFloat(history.Value)
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
