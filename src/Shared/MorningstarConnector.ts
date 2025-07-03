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
import MorningstarAPI from './MorningstarAPI';
import MorningstarOptions from './MorningstarOptions';
import MorningstarPostman from './MorningstarPostman';


/* *
 *
 *  Class
 *
 * */


export abstract class MorningstarConnector extends External.DataConnector {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: MorningstarOptions = {},
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


    protected api?: MorningstarAPI;

    protected readonly options: MorningstarOptions;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<this> {
        const options = this.options;

        // Expecting async Postman options
        if (!this.api) {
            this.api = new MorningstarAPI(
                options.postman ?
                    await MorningstarPostman.getAPIOptions(options.postman) :
                    options.api
            );
        }

        if (!this.api.access.authorized) {
            await this.api.access.authenticate();
        }

        return super.load();
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarConnector;
