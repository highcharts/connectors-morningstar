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

        for (const trailingPerformance of json.trailingPerformance || []) {
            const periodRowId = `${benchmarkId}_${trailingPerformance.type}_TimePeriod`;
            const valueRowId = `${benchmarkId}_${trailingPerformance.type}_Value`;

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
