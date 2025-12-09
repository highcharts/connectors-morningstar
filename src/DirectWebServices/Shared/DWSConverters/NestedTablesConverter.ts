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
import * as External from '../../../Shared/External';

/* *
 *
 *  Class
 *
 * */


export class NestedTablesConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: any
    ) {
        super(options as MorningstarConverterOptions);

        const tables = this.tables;

        tables.push(new External.DataTable({ id: 'Table1' }));
        tables.push(new External.DataTable({ id: 'Table2' }));
        tables.push(new External.DataTable({ id: 'Table3' }));
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (): void {
        const tables = this.tables;

        tables[0].setCell('First table', 0, 'some value');
        tables[1].setCell('Second table', 0, 'some value');
        tables[2].setCell('Third table', 0, 'some value');
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default NestedTablesConverter;
