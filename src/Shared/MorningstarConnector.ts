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


import * as Dashboards from '@highcharts/dashboards';

import MorningstarAPI from './MorningstarAPI';
import MorningstarConverter from './MorningstarConverter';
import MorningstarOptions from './MorningstarOptions';


/* *
 *
 *  Class
 *
 * */


export abstract class MorningstarConnector extends Dashboards.DataConnector {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: MorningstarOptions = {}
    ) {
        super(options);

        this.api = new MorningstarAPI(options.api);
    }


    /* *
     *
     *  Properties
     *
     * */


    protected readonly api: MorningstarAPI;


    public abstract override readonly converter: MorningstarConverter;


    /* *
     *
     *  Functions
     *
     * */


    public override async load(): Promise<this> {

        if (!this.api.authorized) {
            await this.api.authenticate();
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
