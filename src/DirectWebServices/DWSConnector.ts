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


import type DWSOptions from './DWSOptions';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarRegion from '../Shared/MorningstarRegion';


/* *
 *
 *  Class
 *
 * */


export abstract class DWSConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: DWSOptions
    ) {
        super(options);

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: DWSOptions;

    public response?: Response;

    protected url!: string;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<this> {
        await super.load();

        const api = this.api = this.api || new MorningstarAPI(this.options.api);

        const fullUrl = new MorningstarURL(
            `/direct-web-services/v1/${this.url}?languageId=${this.options.languageId}`,
            this.options?.api?.url || MorningstarRegion.baseURLs['Americas']
        );

        const response = await api.fetch(fullUrl, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        });

        this.response = response;

        return this;
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default DWSConnector;
