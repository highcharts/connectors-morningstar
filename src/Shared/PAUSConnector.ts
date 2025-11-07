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
import MorningstarAPI from './MorningstarAPI';
import type PAUSOptions from './PAUSOptions';
import { PAUSPayload } from './PAUSOptions';
import MorningstarRegion from './MorningstarRegion';


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
        options: PAUSOptions
    ) {
        super(options);

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: PAUSOptions;

    public response?: Response;

    protected abstract url: string;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<this> {
        await super.load();

        const api = this.api = this.api || new MorningstarAPI(this.options.api);

        const fullUrl = new MorningstarURL(
            `${this.url}?langcult=${this.options.langcult || 'en-US'}`,
            this.options?.api?.url || MorningstarRegion.baseURLs['Americas']
        );
        const bodyPayload = this.getPayload();

        const response = await api.fetch(fullUrl, {
            body: JSON.stringify(bodyPayload),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        });

        this.response = response;

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
