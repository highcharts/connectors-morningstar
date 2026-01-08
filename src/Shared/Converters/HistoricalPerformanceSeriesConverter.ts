/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type {
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import type SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';

/* *
 *
 *  Class
 *
 * */


export class HistoricalPerformanceSeriesConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: SecurityDetailsConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Properties
     *
     * */


    /* *
     *
     *  Functions
     *
     * */

    public override parse (
        options: SecurityDetailsConverterOptions
    ): void {
        const table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            security = userOptions.json as SecurityDetailsJSON.SecurityDetailsResponse,
            hasMultiple = options.hasMultiple,
            id = security.Id,
            columnStrPostfix = hasMultiple ? `_${id}` : '',
            historicalPerformance = security.HistoricalPerformanceSeries || [];

        for (let i = 0, iEnd = historicalPerformance.length; i < iEnd; i++) {
            const { ReturnType, TimePeriod, Frequency, Return } = historicalPerformance[i],
                columnStr = `${ReturnType}_${TimePeriod}_${Frequency}`,
                dateColumnStr = columnStr + '_Date' + columnStrPostfix,
                valueColumnStr = columnStr + '_Value' + columnStrPostfix;

            // Run loop backwards due to descending order of dates
            for (let j = Return.length - 1; j >= 0; j--) {
                const { Date, Value } = Return[j];

                table.setCell(dateColumnStr, Return.length - 1 - j, Date);
                table.setCell(valueColumnStr, Return.length - 1 - j, Value);
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default HistoricalPerformanceSeriesConverter;
