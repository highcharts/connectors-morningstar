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
import BreakdownsConverter from './BreakdownsConverter';
import HistoricalPerformanceConverter from './HistoricalPerformanceConverter';
import XRayTrailingPerformanceConverter from './XRayTrailingPerformanceConverter';

/* *
 *
 *  Class
 *
 * */


export class BenchmarkConverter extends MorningstarConverter {


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
        const json = options.json;
        for (const benchmark of json.benchmark || []) {
            if (benchmark.breakdowns) {
                const converter = new BreakdownsConverter();
                converter.parse.call(this, { json: benchmark });
            }
            if (benchmark.historicalPerformanceSeries) {
                const converter = new HistoricalPerformanceConverter();
                converter.parse.call(this, { json: benchmark });
            }
            if (benchmark.trailingPerformance) {
                const converter = new XRayTrailingPerformanceConverter();
                converter.parse.call(this, { json: benchmark });
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default BenchmarkConverter;
