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
import { STYLE_BOX_VALUES } from '../Utilities';

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
                const categoryStr = 'Type' + benchmarkSuffix,
                    valueStr = `${styleBox.salePosition}` + benchmarkSuffix,
                    values = styleBox.values,
                    valueIndex = Object.keys(values);

                for (let i = 0; i < valueIndex.length; i++) {
                    table.setCell(categoryStr, i, valueIndex[i]);
                    table.setCell(valueStr, i, values[parseInt(valueIndex[i])]);
                }

                // Set destructured x & y values
                table.setColumn('Style' + benchmarkSuffix, STYLE_BOX_VALUES.X);
                table.setColumn('Size' + benchmarkSuffix, STYLE_BOX_VALUES.Y);
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
