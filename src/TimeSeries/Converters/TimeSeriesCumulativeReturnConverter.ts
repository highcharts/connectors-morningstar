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

interface CumulativeReturnJSON {
    TimeSeries: CumulativeReturnTimeSeriesJSON;
}


interface CumulativeReturnSecurityJSON {
    Id: string;
    RatingSeries: Array<CumulativeReturnSeriesJSON>;
}


interface CumulativeReturnSeriesJSON {
    HistoryDetail: Array<CumulativeReturnHistoryDetailJSON>;
}


interface CumulativeReturnTimeSeriesJSON {
    Security: Array<CumulativeReturnSecurityJSON>;
}


interface CumulativeReturnHistoryDetailJSON {
    EndDate: string;
    Value: string;
}



export interface TSCumulativeReturnConverterOptions
    extends MorningstarConverterOptions, CumulativeReturnSeriesOptions {
    // Nothing to add
}


/* *
 *
 *  Functions
 *
 * */


function isCumulativeReturnHistoryDetailJSON(
    json?: unknown
): json is CumulativeReturnHistoryDetailJSON {
    return (
        !!json &&
        typeof json === 'object' &&
        typeof (json as CumulativeReturnHistoryDetailJSON).EndDate === 'string' &&
        typeof (json as CumulativeReturnHistoryDetailJSON).Value === 'string'
    );
}


function isCumulativeReturnJSON(
    json?: unknown
): json is CumulativeReturnJSON {
    return (
        !!json &&
        typeof json === 'object' &&
        typeof (json as CumulativeReturnJSON).TimeSeries === 'object' &&
        isCumulativeReturnTimeSeriesJSON((json as CumulativeReturnJSON).TimeSeries)
    );
}


function isCumulativeReturnSecurityJSON(
    json?: unknown
): json is CumulativeReturnSecurityJSON {
    return (
        !!json &&
        typeof json === 'object' &&
        typeof (json as CumulativeReturnSecurityJSON).Id === 'string' &&
        typeof (json as CumulativeReturnSecurityJSON).RatingSeries === 'object' &&
        (json as CumulativeReturnSecurityJSON).RatingSeries instanceof Array &&
        (
            (json as CumulativeReturnSecurityJSON).RatingSeries.length === 0 ||
            isCumulativeReturnSeriesJSON((json as CumulativeReturnSecurityJSON).RatingSeries[0])
        )
    );
}


function isCumulativeReturnSeriesJSON(
    json?: unknown
): json is CumulativeReturnSeriesJSON {
    return (
        !!json &&
        typeof json === 'object' &&
        typeof (json as CumulativeReturnSeriesJSON).HistoryDetail === 'object' &&
        (json as CumulativeReturnSeriesJSON).HistoryDetail instanceof Array &&
        (
            (json as CumulativeReturnSeriesJSON).HistoryDetail.length === 0 ||
            isCumulativeReturnHistoryDetailJSON(
                (json as CumulativeReturnSeriesJSON).HistoryDetail[0]
            )
        )
    );
}


function isCumulativeReturnTimeSeriesJSON(
    json?: unknown
): json is CumulativeReturnJSON {
    return (
        !!json &&
        typeof json === 'object' &&
        typeof (json as CumulativeReturnTimeSeriesJSON).Security === 'object' &&
        (json as CumulativeReturnTimeSeriesJSON).Security instanceof Array &&
        (
            (json as CumulativeReturnTimeSeriesJSON).Security.length === 0 ||
            isCumulativeReturnSecurityJSON((json as CumulativeReturnTimeSeriesJSON).Security[0])
        )
    );
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

        if (!isCumulativeReturnJSON(json)) {
            throw new Error('Invalid data');
        }

        // Cumulate security ratings by date

        const securityIds: Array<string> = [];
        const sortedRating: Array<CumulativeReturn> = [];

        for (const security of json.TimeSeries.Security) {
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


export default TimeSeriesCumulativeReturnConverter;
