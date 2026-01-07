/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
import {
    DWSTimeSeriesConverterOptions,
    DWSTimeSeriesConverterMetadata
} from './TimeSeriesOptions';

import type { TimeSeriesResponse } from './TimeSeriesJSON';


/* *
 *
 *  Class
 *
 * */


export class DWSTimeSeriesConverter extends MorningstarConverter {

    /* *
        *
        *  Constructor
        *
        * */


    public constructor (
        options?: DWSTimeSeriesConverterOptions
    ) {
        super(options);

        this.metadata = {
            columns: {},
            rawResponse: []
        };
    }

    /**
     *
     *  Properties
     *
     */

    public readonly metadata: DWSTimeSeriesConverterMetadata;

    /* *
     *
     *  Functions
     *
     * */


    public override parse (options: DWSTimeSeriesConverterOptions): void {
        const table = this.table,
            json = options.json as TimeSeriesResponse,
            investments = json.investments;

        if (investments) {
            const hasMultiple = investments.length > 1;
            for (const investment of investments) {
                const { timeSeries, identifiers } = investment,
                    columnSuffix = hasMultiple ? `_${identifiers.performanceId}` : '';

                table.metadata = { ...identifiers };

                for (const series of timeSeries) {
                    const { data } = series;

                    let rowIndex = 0;
                    for (const point of data) {
                        const date = point.date,
                            value = point.value;


                        table.setCell(
                            `Date${columnSuffix}`,
                            rowIndex,
                            date
                        );

                        table.setCell(
                            `Value${columnSuffix}`,
                            rowIndex,
                            value
                        );

                        rowIndex++;
                    }
                }
            }
        }

    }
}

export default DWSTimeSeriesConverter;
