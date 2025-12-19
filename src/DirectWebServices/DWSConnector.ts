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

import type { DWSRequest, DWSResponse, DWSConnectorOptions, DWSConnectorMetadata } from './DWSOptions';

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

    public override readonly options: DWSConnectorOptions;

    public responses: Array<DWSResponse> = [];

    public requests: Array<DWSRequest> = [];

    public override metadata!: DWSConnectorMetadata;

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

        for (const { url, type } of requests) {
            const fullUrl = new MorningstarURL(
                `/direct-web-services/v1/${url.includes('?') ? `${url}&` : `${url}?`}languageId=${options.languageId || 'ENG'}`,
                options.api?.url || MorningstarRegion.baseURLs['Americas']
            );

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
