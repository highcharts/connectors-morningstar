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


export class RiskStatisticsConverter extends MorningstarConverter {


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
            riskStatistics = options.json.Risks.RiskStatistics;

        if (riskStatistics.length) {

            table.setCell('TrailingTimePeriod', 0, riskStatistics[0].TrailingTimePeriod);
            table.setCell('DataFrequency', 0, riskStatistics[0].DataFrequency);

            riskStatistics.forEach((statistic) => {
                const { Benchmark, Portfolio, Security } = statistic;

                for (const key of Object.keys(Benchmark) as Array<keyof typeof Benchmark>) {
                    table.setCell('Benchmark_' + key + columnSuffix, 0, Benchmark[key]);
                }

                for (const key of Object.keys(Portfolio) as Array<keyof typeof Portfolio>) {
                    table.setCell(key + columnSuffix, 0, Portfolio[key]);
                }

                for (const security of Security) {
                    const { SecurityId, RiskStatisticsItem, Weight } = security;

                    for (const key of Object.keys(RiskStatisticsItem || {}) as Array<keyof typeof RiskStatisticsItem>) {
                        table.setCell(`${SecurityId}_${key}${columnSuffix}`, 0, RiskStatisticsItem[key]);
                        table.setCell(`${SecurityId}_Weight${columnSuffix}`, 0, Weight);
                    }
                }
            });
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default RiskStatisticsConverter;
