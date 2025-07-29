/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Mateusz Bernacik
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */

import MorningstarConverter from '../../Shared/MorningstarConverter';
import type { PerformanceConverterOptions } from '../PerformanceOptions';

/* *
 *
 *  Class
 *
 * */


export class CalendarYearReturnsConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: PerformanceConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: PerformanceConverterOptions
    ): void {
        const table = this.table,
            userOptions = {
                ...this.options,
                ...options
            };

        const portfolioPerformance = userOptions.json;
        const calendarYearReturn = portfolioPerformance.Performance[0].Returns.CalendarYearReturn;


        const calendarYearData = calendarYearReturn.Portfolio.CalendarYear;
        const benchmarkData = calendarYearReturn.Benchmark?.CalendarYear;

        for (let i = 0; i < calendarYearData.length; i++) {
            const { Id, Value: PortfolioValue } = calendarYearData[i];
            const idColumn = 'Id';
            const portfolioValueColumn = 'Portfolio_Value';

            table.setCell(idColumn, i, Id);
            table.setCell(portfolioValueColumn, i, PortfolioValue);

            if (benchmarkData && benchmarkData.length > i) {
                const { Value: BenchmarkValue } = benchmarkData[i];
                const benchmarkValueColumn = 'Benchmark_Value';

                table.setCell(benchmarkValueColumn, i, BenchmarkValue);
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default CalendarYearReturnsConverter;
