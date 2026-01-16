/* *
 *
 *  (c) 2009-2026 Highsoft AS
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


export class TrailingReturnsConverter extends MorningstarConverter {


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
        options: PerformanceConverterOptions,
        hasMultiple?: boolean
    ): void {
        const table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            portfolioPerformance = userOptions.json,
            trailingReturns = portfolioPerformance.Returns?.TrailingReturns;

        if (trailingReturns) {
            const portfolioName = portfolioPerformance.PortfolioName,
                columnSuffix = hasMultiple ? `_${portfolioName}` : '',
                trailingReturnsData = trailingReturns.Portfolio.TimePeriod,
                benchmarkData = trailingReturns.Benchmark?.TimePeriod;

            for (let i = 0; i < trailingReturnsData.length; i++) {
                const { Id, Value: portfolioValue } = trailingReturnsData[i];
                const idColumn = 'Id';
                const portfolioValueColumn = 'Value';

                table.setCell(idColumn, i, Id);
                table.setCell(`${portfolioValueColumn}${columnSuffix}`, i, portfolioValue);

                if (benchmarkData?.length > i) {
                    const { Value: benchmarkValue } = benchmarkData[i];
                    const benchmarkValueColumn = 'Value_Benchmark';

                    table.setCell(`${benchmarkValueColumn}${columnSuffix}`, i, benchmarkValue);
                }
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default TrailingReturnsConverter;
