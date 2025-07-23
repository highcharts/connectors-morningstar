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


import MorningstarConnector from './MorningstarConnector';
import PAUSOptions from './PAUSOptions';
import * as External from './External';


/* *
 *
 *  Class
 *
 * */


export abstract class PAUSConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: PAUSOptions,
        dataTables: Array<External.DataTableOptions> = []
    ) {
        super(options, dataTables);

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: PAUSOptions;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<any> {
        await super.load();
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default PAUSConnector;
