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


export class XRayTrailingPerformanceConverter extends MorningstarConverter {


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
            json = isBenchmark ? benchmark[0] : options.json;

        for (const trailingPerformance of json.trailingPerformance || []) {
            const { returnType, type } = trailingPerformance,
                columnString = `${returnType}_${type}`,
                periodRowId = `${columnString}_TimePeriod` + benchmarkSuffix,
                valueRowId = `${columnString}_Value` + benchmarkSuffix;

            let rowIndex = 0;

            for (const trailingReturn of trailingPerformance.returns) {
                table.setCell(periodRowId, rowIndex, trailingReturn.timePeriod);
                table.setCell(valueRowId, rowIndex, trailingReturn.value);
                ++rowIndex;
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default XRayTrailingPerformanceConverter;
