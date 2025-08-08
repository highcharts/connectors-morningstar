/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */

import MorningstarConverter from '../../Shared/MorningstarConverter';
import type { HypoConverterOptions } from '../HypoPerformanceOptions';
import { monthOffsetToDateString } from '../../Shared/Utilities';

/* *
 *
 *  Class
 *
 * */


export class GrowthConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: HypoConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: HypoConverterOptions,
        hasMultiple?: boolean
    ): void {
        const table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            hypo = userOptions.json,
            portfolioName = hypo.PortfolioName,
            columnSuffix = hasMultiple ? `_${portfolioName}` : '';

        const summaryChart = hypo.PortfolioSummary.PortfolioSummaryChart,
            portfolioData = summaryChart.Portfolio.Data,
            benchmarkData = summaryChart.Benchmark.Data,
            startDate = summaryChart.Portfolio.StartDate,
            frequency = summaryChart.Frequency;

        for (let i = 0; i < portfolioData.length; i++) {
            const { Id, Value: portfolioValue } = portfolioData[i],
                idColumn = 'Id',
                dateColumn = 'Date',
                portfolioValueColumn = 'Value',
                benchmarkValueColumn = 'Value_Benchmark';

            // Set date based on frequency and the Id (offset) since startDate.
            switch (frequency) {
                case 'Monthly': {
                    const date = monthOffsetToDateString(startDate, parseInt(Id));
                    table.setCell(`${dateColumn}${columnSuffix}`, i, date);
                    break;
                }
            }

            table.setCell(`${idColumn}${columnSuffix}`, i, Id);
            table.setCell(`${portfolioValueColumn}${columnSuffix}`, i, portfolioValue);

            if (benchmarkData?.length > i) {
                const { Value: benchmarkValue } = benchmarkData[i];

                table.setCell(`${benchmarkValueColumn}${columnSuffix}`, i, benchmarkValue);
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default GrowthConverter;
