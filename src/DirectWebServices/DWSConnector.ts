/* *
 *
 *  (c) 2009-2026 Highsoft AS
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

import type { DWSRequest, DWSResponse, DWSConnectorOptions } from './DWSOptions';

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
        options: DWSConnectorOptions
    ) {
        if (options.api) {
            options.api.isDWS = true;
        }

        super(options);
        this.options = options;
    }

    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: DWSConnectorOptions;

    public responses: Array<DWSResponse> = [];

    public requests: Array<DWSRequest> = [];

    protected url!: string;

    /* *
     *
     *  Functions
     *
     * */

    public override async load (): Promise<this> {
        await super.load();

        const { requests, options, responses } = this;

        const api = this.api = this.api || new MorningstarAPI(options.api);

        const idType = options.security?.idType;

        for (const { url, type } of requests) {
            const fullUrl = new MorningstarURL(
                `/direct-web-services/v1/${url}`,
                options.api?.url || MorningstarRegion.baseURLs['Americas']
            );

            fullUrl.searchParams.set('languageId', options.languageId || 'ENG');

            // If a security contains an optional idType, add the param
            if (idType) {
                fullUrl.searchParams.set('idType', idType);
            }

            const response = await api.fetch(fullUrl, {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET'
            });

            responses.push({ [type]: response });
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
