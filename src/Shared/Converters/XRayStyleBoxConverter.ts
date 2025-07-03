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
import { XRayConverterOptions } from '../../XRay';

/* *
 *
 *  Class
 *
 * */


export class XRayStyleBoxConverter extends MorningstarConverter {


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
            json = isBenchmark ? benchmark[0].breakdowns : options.json.breakdowns;

        if (json?.styleBox) {
            for (const styleBox of json.styleBox) {
                const categoryStr = `${styleBox.salePosition}_Categories` + benchmarkSuffix,
                    valueStr = `${styleBox.salePosition}_Values` + benchmarkSuffix,
                    values = styleBox.values,
                    valueIndex = Object.keys(values);

                for (let i = 0; i < valueIndex.length; i++) {
                    table.setCell(categoryStr, i, valueIndex[i]);
                    table.setCell(valueStr, i, values[parseInt(valueIndex[i])]);
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


export default XRayStyleBoxConverter;
