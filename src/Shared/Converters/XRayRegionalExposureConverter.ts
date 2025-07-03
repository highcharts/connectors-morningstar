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


export class XRayRegionalExposureConverter extends MorningstarConverter {


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

        if (json?.regionalExposure) {
            for (const exposure of json.regionalExposure) {
                const columnName = `RegionalExposure_${exposure.salePosition}`,
                    categoryStr = `${columnName}_Categories` + benchmarkSuffix,
                    valueStr = `${columnName}_Values` + benchmarkSuffix,
                    values = exposure.values,
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


export default XRayRegionalExposureConverter;
