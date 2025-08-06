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

import MorningstarConverter from '../MorningstarConverter';
import type { XRayUSConverterOptions } from '../../XRayUS/XRayUSOptions';

/* *
 *
 *  Class
 *
 * */


export class XRayCalendarYearReturnConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: XRayUSConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: XRayUSConverterOptions,
        hasMultiple?: boolean
    ): void {
        const table = this.table,
            columnSuffix = hasMultiple ? `_${options.json.PortfolioName}` : '',
            calendarYearReturn = options.json.Returns.CalendarYearReturn,
            portfolio = calendarYearReturn.Portfolio,
            benchmark = calendarYearReturn.Benchmark;

        if (portfolio) {
            for (let i = portfolio.CalendarYear.length - 1; i >= 0; i--) {
                const year = portfolio.CalendarYear[i];
                const rowIndex = portfolio.CalendarYear.length - 1 - i;

                table.setCell('Year', rowIndex, year.Id);
                table.setCell('Value' + columnSuffix, rowIndex, year.Value);
            }
        }

        if (benchmark) {
            for (let i = benchmark.CalendarYear.length - 1; i >= 0; i--) {
                const year = benchmark.CalendarYear[i];
                const rowIndex = benchmark.CalendarYear.length - 1 - i;

                table.setCell('Year', rowIndex, year.Id);
                table.setCell('Value_Benchmark' + columnSuffix, rowIndex, year.Value);
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default XRayCalendarYearReturnConverter;
