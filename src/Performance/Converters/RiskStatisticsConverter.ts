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


export class RiskStatisticsConverter extends MorningstarConverter {


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
                    table.setCell(`${key}_Benchmark`, i, Benchmark[key]);
                }

                for (const key of Object.keys(Portfolio) as Array<keyof typeof Portfolio>) {
                    table.setCell(`${key}${columnSuffix}`, i, Portfolio[key]);
                }

                for (const security of Security) {
                    const { SecurityId, RiskStatisticsItem, Weight } = security;

                    table.setCell(`Weight_${SecurityId}${columnSuffix}`, i, Weight);

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
