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


export class XRayAssetAllocationsConverter extends MorningstarConverter {


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

        if (json?.assetAllocation) {
            for (const asset of json.assetAllocation) {
                const categoryStr = `${asset.type}_Type` + benchmarkSuffix,
                    valueStr = `${asset.type}_${asset.salePosition}` + benchmarkSuffix,
                    values = asset.values,
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


export default XRayAssetAllocationsConverter;
