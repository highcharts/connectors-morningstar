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
import { XRayConverterOptions, XRayMetadata } from '../../XRay';

/* *
 *
 *  Class
 *
 * */


export class HistoricalPerformanceConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: XRayConverterOptions
    ) {
        super(options);

        this.metadata = {
            columns: {}
        };
    }


    /* *
     *
     *  Properties
     *
     * */

    public readonly metadata: XRayMetadata;

    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: XRayConverterOptions,
        benchmarkId: string = 'XRay'
    ): void {
        const table = this.table,
            json = options.json;

        for (const historicalPerformance of json.historicalPerformanceSeries || []) {
            const periodRowId = `${benchmarkId}_${historicalPerformance.returnType}_${historicalPerformance.timePeriod}`;
            const valueRowId = `${benchmarkId}_${historicalPerformance.returnType}_${historicalPerformance.timePeriod}_Value`;

            let rowIndex = 0;

            for (const historicalReturn of historicalPerformance.returns) {
                table.setCell(periodRowId, rowIndex, historicalReturn[0]);
                table.setCell(valueRowId, rowIndex, historicalReturn[1]);
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


export default HistoricalPerformanceConverter;
