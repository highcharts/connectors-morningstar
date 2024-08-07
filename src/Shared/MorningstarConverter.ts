/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import * as External from './External';
import { MorningstarConverterOptions } from './MorningstarOptions';


/* *
 *
 *  Class
 *
 * */


export abstract class MorningstarConverter extends External.DataConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor(
        options: MorningstarConverterOptions = {}
    ) {
        super(options);

        this.options = options as Required<MorningstarConverterOptions>;
        this.table = new External.DataTable();
    }


    /* *
     *
     *  Properties
     *
     * */


    public override options: Required<MorningstarConverterOptions>;


    protected table: External.DataTable;


    /* *
     *
     *  Functions
     *
     * */


    public abstract override parse(
        options: MorningstarConverterOptions
    ): void;


    public override getTable(): External.DataTable {
        return this.table;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarConverter;
