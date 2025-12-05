/* *
 *
 *  (c) 2009-2025 Highsoft AS
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


    public constructor (
        options: MorningstarConverterOptions = {}
    ) {
        super(options);

        this.options = options as Required<MorningstarConverterOptions>;
        this.table = new External.DataTable();
        this.tables = [];
    }


    /* *
     *
     *  Properties
     *
     * */


    public override options: Required<MorningstarConverterOptions>;


    protected table: External.DataTable;
    protected tables: External.DataTable[];


    /* *
     *
     *  Functions
     *
     * */


    /**
     * Initiates parsing of Morningstar JSON response structure.
     *
     * @param {MorningstarConverterOptions} options
     * Options for the parser
     *
     */
    public abstract parse(options: MorningstarConverterOptions): void;


    /**
     * Returns the DataTable for the converter
     *
     * @return {External.DataTable}
     */
    public getTable (): External.DataTable {
        return this.table;
    }

    /**
     * Returns the DataTable for the converter
     *
     * @return {External.DataTable}
     */
    public getTables (): External.DataTable[] {
        return this.tables;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarConverter;
