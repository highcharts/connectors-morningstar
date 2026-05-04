/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Jedrzej Ruta
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */



import MorningstarConverter from '../../Shared/MorningstarConverter';
import type { TimeSeriesConverterOptions } from './TimeSeriesOptions';
import type { TimeSeriesResponse } from './TimeSeriesJSON';
import { defined } from 'highcharts';


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


    public constructor (
        options?: TimeSeriesConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (options: TimeSeriesConverterOptions): void {
        const table = this.table,
            { investments } = options.json as TimeSeriesResponse;

        if (investments) {
            const hasMultiple = investments.length > 1;

            // Create a table of dates shared among all investments.
            const dates = new Set<string>();

            for (const investment of investments) {
                for (const series of investment.timeSeries) {
                    for (const point of series.data) {
                        dates.add(point.date);
                    }
                }
            }

            const sortedDates = [...dates].sort();

            table.setColumn(
                'Date', sortedDates
            );

            // Assign point values via date indices.
            for (const investment of investments) {
                const { timeSeries, identifiers } = investment,
                    columnSuffix = hasMultiple ? `_${identifiers.performanceId}` : '';

                for (const series of timeSeries) {
                    for (const point of series.data) {

                        const dateRowIndex = table.getRowIndexBy('Date', point.date);

                        if (defined(dateRowIndex)) {
                            table.setCell(
                                `Value${columnSuffix}`,
                                dateRowIndex as number,
                                point.value
                            );
                        }
                    }
                }
            }
        }
    }
}

export default TimeSeriesConverter;
