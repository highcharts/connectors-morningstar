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
            for (const investment of investments) {
                const { timeSeries, identifiers } = investment,
                    columnSuffix = hasMultiple ? `_${identifiers.performanceId}` : '';

                for (const series of timeSeries) {
                    let rowIndex = 0;
                    for (const point of series.data) {
                        table.setCell(
                            `Date${columnSuffix}`,
                            rowIndex,
                            point.date
                        );

                        table.setCell(
                            `Value${columnSuffix}`,
                            rowIndex,
                            point.value
                        );

                        rowIndex++;
                    }
                }
            }
        }
    }
}

export default TimeSeriesConverter;
