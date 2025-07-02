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
        options: XRayConverterOptions
    ): void {
        const table = this.table,
            json = options.json;
        let rowIndex = 0;

        for (const holding of json.underlyHoldings || []) {
            for (const key in holding) {
                const columnName = `UnderlyingHoldings_${key}`;
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
