/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */

import MorningstarConverter from '../../Shared/MorningstarConverter';
import type { HypoConverterOptions } from '../HypoPerformanceOptions';

/* *
 *
 *  Class
 *
 * */


export class TestConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: HypoConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        // eslint-disable-next-line
        options: HypoConverterOptions
    ): void {
        const table = this.table;

        table.setCell('Foo', 0, 'Bar');

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default TestConverter;
