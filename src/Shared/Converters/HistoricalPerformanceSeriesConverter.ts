/* *
 *
 *  (c) 2009-2025 Highsoft AS
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


import {
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
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
            hasMultiple = options.hasMultiple;

        // Create table
        const id = security.Id,
            HistoricalPerformance = security.HistoricalPerformanceSeries;

        if (!HistoricalPerformance || !HistoricalPerformance.length) {
            return;
        }

        for (let i = 0, iEnd = HistoricalPerformance.length; i < iEnd; ++i) {
            const { ReturnType, TimePeriod, Frequency } = HistoricalPerformance[i];

            const columnStr = `${ReturnType}_${TimePeriod}_${Frequency}`;

            const Return = HistoricalPerformance[i].Return;

            for (let i = 0, iEnd = Return.length; i < iEnd; ++i) {
                table.setCell(
                    columnStr + '_Date' + (hasMultiple ? `_${id}` : ''),
                    i,
                    Return[i].Date
                );
                table.setCell(
                    columnStr + '_Value' + (hasMultiple ? `_${id}` : ''),
                    i,
                    Return[i].Value
                );
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
