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
import PAUSConnectorOptions from './PAUSConnectorOptions';
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
        options: PAUSConnectorOptions = {},
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


    // protected api?: MorningstarAPI;

    public override readonly options: PAUSConnectorOptions;


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
