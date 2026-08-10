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
            const dates = new Set<string>();
            const columns: Array<{
                name: string;
                values: Map<string, number>;
            }> = [];

            // Collect dates and per-investment values in a single pass.
            for (const investment of investments) {
                const { timeSeries, identifiers } = investment,
                    columnSuffix = hasMultiple ? `_${identifiers.performanceId}` : '',
                    values = new Map<string, number>();

                for (const series of timeSeries) {
                    for (const point of series.data) {
                        dates.add(point.date);
                        values.set(point.date, point.value);
                    }
                }

                columns.push({ name: `Value${columnSuffix}`, values });
            }

            const sortedDates = [...dates].sort();

            table.setColumn('Date', sortedDates);

            for (const { name, values } of columns) {
                table.setColumn(
                    name,
                    sortedDates.map((date): (number | null) => values.get(date) ?? null)
                );
            }
        }
    }
}

export default TimeSeriesConverter;
