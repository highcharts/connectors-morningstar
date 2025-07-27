/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Mateusz Bernacik
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import MorningstarConnector from './MorningstarConnector';
import MorningstarURL from './MorningstarURL';
import type PAUSOptions from './PAUSOptions';
import * as External from './External';
import { PAUSPayload } from './PAUSOptions';


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


    public override async load (url?: string): Promise<this> {
        await super.load();

        if (url && this.api) {
            const fullUrl = new MorningstarURL(url, this.api.baseURL);
            const bodyPayload = this.getPayload();

            await this.api.fetch(fullUrl, {
                body: JSON.stringify(bodyPayload),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            });
        }

        return this;
    }

    protected abstract getPayload(): PAUSPayload;
}


/* *
 *
 *  Default Export
 *
 * */


export default PAUSConnector;
