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


import type { MorningstarAPIOptions } from './MorningstarOptions';

import MorningstarAuthentication from './MorningstarAccess';
import MorningstarError from './MorningstarError';
import MorningstarRegion from './MorningstarRegion';
import MorningstarURL from './MorningstarURL';
import { version } from '../version';


/* *
 *
 *  Constants
 *
 * */


const webServiceExceptionPattern = new RegExp([
    '<StatusCode>([^<>]*)</StatusCode>',
    '.*',
    '<StatusMessage>([^<>]*)</StatusMessage>'
].join(''), 'su');


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
            parseInt((this.baseURL.pathname.match(/\/v(\d+)(?:\/|$)/u) || [])[ 1 ], 10)
        );
        this.version = (this.version > 0 ? this.version : 1);

        this.access = new MorningstarAuthentication(options);

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

        if (url.searchParams.get('outputType') !== 'compactjson') {
            url.searchParams.set('outputType', 'json');
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

        if (
            this.access.authorized ||
            await this.access.authenticate()
        ) {
            requestInit = this.access.authorizeRequest(requestInit);
        }

        const headers = (
            requestInit.headers instanceof Headers ?
                requestInit.headers :
                new Headers(requestInit.headers)
        );

        headers.set('User-Agent', `HighchartsConnectorsMorningstar/${version}`);

        const response = await window.fetch(url, requestInit);

        if (!response.url.startsWith('https')) {
            throw new Error('Unsecured connection');
        }

        if (response.status >= 400) {
            throw new MorningstarError(requestInit, response);
        }

        const contentType = response.headers.get('Content-Type');

        if (contentType) {
            const content = await response.blob();

            // Prevent "Body has already been read" error
            response.blob = async (): Promise<Blob> => content;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            response.json = async (): Promise<any> => JSON.parse(await content.text());
            response.text = (): Promise<string> => content.text();
        }

        if (contentType?.startsWith('text/xml')) {
            const xml = await response.text();
            const exceptionMatch = xml.match(webServiceExceptionPattern);

            if (exceptionMatch) {
                const submessage = exceptionMatch[2].trim();
                const substatus = parseInt(exceptionMatch[1]);
                throw new MorningstarError(requestInit, response, substatus, submessage);
            } else {
                throw new Error(`Unexpected data: ${contentType}`);
            }
        } else if (contentType?.startsWith('application/json')) {
            // Pass through
        } else {
            throw new Error(`Unexpected data: ${contentType}`);
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
