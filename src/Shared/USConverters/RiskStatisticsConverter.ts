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
            riskStatistics = options.json.Risks?.RiskStatistics;

        if (riskStatistics?.length) {
            riskStatistics.forEach((statistic, i) => {
                const {
                    Benchmark,
                    Portfolio,
                    Security,
                    TrailingTimePeriod,
                    DataFrequency
                } = statistic;

                table.setCell('TrailingTimePeriod', i, TrailingTimePeriod);
                table.setCell('DataFrequency', i, DataFrequency);

                for (const key of Object.keys(Benchmark) as Array<keyof typeof Benchmark>) {
                    table.setCell('Benchmark_' + key + columnSuffix, i, Benchmark[key]);
                }

                for (const key of Object.keys(Portfolio) as Array<keyof typeof Portfolio>) {
                    table.setCell(key + columnSuffix, i, Portfolio[key]);
                }

                for (const security of Security) {
                    const { SecurityId, RiskStatisticsItem, Weight } = security;

                    // Set weight once per security
                    table.setCell(`Weight_${SecurityId}${columnSuffix}`, i, Weight);

                    // Set risk statistics for each property
                    for (const key of Object.keys(RiskStatisticsItem || {}) as Array<keyof typeof RiskStatisticsItem>) {
                        table.setCell(`${key}_${SecurityId}${columnSuffix}`, i, RiskStatisticsItem[key]);
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
