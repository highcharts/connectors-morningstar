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


import type { MorningstarAPIOptions } from './MorningstarOptions';

import MorningstarAuthentication from './MorningstarAccess';
import MorningstarError from './MorningstarError';
import MorningstarRegion from './MorningstarRegion';
import MorningstarURL from './MorningstarURL';


/* *
 *
 *  Class
 *
 * */


export class MorningstarAPI {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: MorningstarAPIOptions = {}
    ) {

        this.baseURL = new URL(
            options.url ??
            MorningstarRegion.baseURLs[MorningstarRegion.detect()],
            window.location.href
        );

        if (this.baseURL.protocol !== 'https:') {
            throw new Error('Insecure API protocol');
        }

        this.lastRequestTimestamp = 0;
        this.options = options;
        this.requestDelay = 0;
        this.version = (
            options.version ??
            parseInt((this.baseURL.pathname.match(/\/v(\d+)(?:\/|$)/) || [])[ 1 ], 10)
        );
        this.version = (this.version > 0 ? this.version : 1);

        this.access = new MorningstarAuthentication(options.access);

    }


    /* *
     *
     *  Properties
     *
     * */


    public readonly access: MorningstarAuthentication;


    public readonly baseURL: URL;


    protected lastRequestTimestamp: number;


    public readonly options: MorningstarAPIOptions;


    protected requestDelay: number;


    public readonly version: number;


    /* *
     *
     *  Functions
     *
     * */


    public delay (
        milliseconds: number
    ): Promise<void> {
        return new Promise(resolve => window.setTimeout(resolve, milliseconds));
    }


    public async fetch (
        url: MorningstarURL,
        requestInit: RequestInit = {}
    ): Promise<Response> {

        if (URL.canParse(url)) {
            throw new Error('Absolute URLs are not supported.');
        }

        const requestDelay = (
            this.requestDelay -
            ((new Date()).getTime() - this.lastRequestTimestamp)
        );

        // Apply delay for rate limit
        if (requestDelay > 0) {
            await this.delay(requestDelay);
        }

        this.lastRequestTimestamp = (new Date()).getTime();

        if (this.access.authorized) {
            requestInit = this.access.authorizeRequest(requestInit);
        }

        const response = await window.fetch(url, requestInit);

        if (!response.url.startsWith('https')) {
            throw new Error('Unsecured connection');
        }

        if (response.status >= 400) {
            throw new MorningstarError(response);
        }

        if (response.headers.get('Content-Type') !== 'application/json') {
            throw new Error('Unexpected data');
        }

        const rateLimit = parseInt(response.headers.get('X-RateLimit-Limit') || '0', 10);

        // Update potential delay for rate limit
        if (rateLimit > 0) {
            this.requestDelay = (3600000 / rateLimit);
        }

        return response;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarAPI;
