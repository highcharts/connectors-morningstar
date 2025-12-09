/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


'use strict';


/* *
*
*  Imports
*
* */

import MorningstarConverter from '../../../Shared/MorningstarConverter';
import { MorningstarConverterOptions } from '../../../Shared';

/* *
 *
 *  Class
 *
 * */


export class MockAssetAllocConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: any
    ) {
        super(options as MorningstarConverterOptions);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (): void {
        const table = this.table;

        table.setCell('Asset Allocation', 0, 'value');

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default MockAssetAllocConverter;
