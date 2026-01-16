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


export class UnderlyHoldingsConverter extends MorningstarConverter {


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
        let rowIndex = 0;

        for (const holding of json.underlyHoldings || []) {
            for (const key in holding) {
                const columnName = `${key}` + benchmarkSuffix;
                table.setCell(columnName, rowIndex, holding[key]);
            }
            ++rowIndex;
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default UnderlyHoldingsConverter;
