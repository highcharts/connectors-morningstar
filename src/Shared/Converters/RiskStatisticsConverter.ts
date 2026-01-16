/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */

import MorningstarConverter from '../MorningstarConverter';
import type { XRayConverterOptions } from '../../XRay';

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
        options?: XRayConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: XRayConverterOptions
    ): void {
        const table = this.table,
            benchmark = options.json.benchmark,
            isBenchmark = Array.isArray(benchmark),
            benchmarkSuffix = isBenchmark ? '_Benchmark' : '',
            json = isBenchmark ? benchmark[0].riskStatistics : options.json.riskStatistics;

        if (json?.sharpeRatio) {
            let i = 0;
            for (const sharpeRatio of json.sharpeRatio) {
                table.setCell(
                    'SharpeRatio_TimePeriod' + benchmarkSuffix,
                    i,
                    sharpeRatio.timePeriod
                );
                table.setCell(
                    'SharpeRatio' + benchmarkSuffix,
                    i,
                    sharpeRatio.value
                );
                i++;
            }
        }

        if (json?.standardDeviation) {
            let i = 0;
            for (const standardDeviation of json.standardDeviation) {
                table.setCell(
                    'StandardDeviation_TimePeriod' + benchmarkSuffix,
                    i,
                    standardDeviation.timePeriod
                );
                table.setCell(
                    'StandardDeviation' + benchmarkSuffix,
                    i,
                    standardDeviation.value
                );
                i++;
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default RiskStatisticsConverter;
