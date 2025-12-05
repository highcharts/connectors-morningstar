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


import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarRegion from '../Shared/MorningstarRegion';

import type DWSOptions from './DWSOptions';
import type { DWSRequest, DWSResponse, DWSMetadata } from './DWSOptions';


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
        if (options.api) {
            options.api.isDWS = true;
        }

        super(options);

        this.metadata = {
            columns: {},
            rawResponses: []
        };

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: DWSOptions;

    public responses: Array<DWSResponse> = [];

    public requests: Array<DWSRequest> = [];

    public override metadata!: DWSMetadata;

    protected url!: string;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<this> {
        await super.load();

        const api = this.api = this.api || new MorningstarAPI(this.options.api);

        for (const { url, type } of this.requests || []) {

            const fullUrl = new MorningstarURL(
                `/direct-web-services/v1/${url}?languageId=${this.options.languageId || 'ENG'}`,
                this.options?.api?.url || MorningstarRegion.baseURLs['Americas']
            );

            const response = await api.fetch(fullUrl, {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET'
            });

            this.responses.push({ [type]: response });
        }

        return this.applyTableModifiers();
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default DWSConnector;
