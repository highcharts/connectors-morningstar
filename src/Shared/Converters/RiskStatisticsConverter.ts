/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
            for (const sharpeRatio of json.sharpeRatio) {
                const columnName = `SharpeRatio_${sharpeRatio.frequency}_${sharpeRatio.timePeriod}` + benchmarkSuffix;
                table.setCell(columnName, 0, sharpeRatio.value);
            }
        }

        if (json?.standardDeviation) {
            let i = 0;
            for (const standardDeviation of json.standardDeviation) {
                table.setCell('StandardDeviation_TimePeriod', i, standardDeviation.timePeriod);
                table.setCell('StandardDeviation_Values', i, standardDeviation.value);
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
