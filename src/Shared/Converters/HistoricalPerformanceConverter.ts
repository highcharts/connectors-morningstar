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
            json = options.json;

        for (const historicalPerformance of json.historicalPerformanceSeries || []) {
            const periodRowId = `${historicalPerformance.returnType}_${historicalPerformance.timePeriod}`;
            const valueRowId = `${historicalPerformance.returnType}_${historicalPerformance.timePeriod}_Value`;

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
