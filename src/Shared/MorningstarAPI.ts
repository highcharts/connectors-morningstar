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


import MorningstarError from './MorningstarError';
import { MorningstarAPIOptions } from './MorningstarOptions';


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
        options.path = options.path || MorningstarAPI.RegionPath.NorthAmerica;

        this.lastRequestTimestamp = 0;
        this.options = options;
        this.path = options.path;
        this.requestDelay = 0;
        this.version =
            parseInt((options.path.match(/\/v(\d+)\/?/) || [])[ 1 ], 10);
    }


    /* *
     *
     *  Properties
     *
     * */


    public authorized?: boolean;


    protected lastRequestTimestamp: number;


    public readonly options: MorningstarAPIOptions;


    public readonly path: string;


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
        input: (RequestInfo|URL),
        init?: RequestInit
    ): Promise<Response> {
        let response: (Response|undefined);

        try {
            const requestDelay = (
                this.requestDelay -
                ((new Date()).getTime() - this.lastRequestTimestamp)
            );

            // Apply delay for rate limit
            if (requestDelay > 0) {
                await this.delay(requestDelay);
            }

            this.lastRequestTimestamp = (new Date()).getTime();

            response = await window.fetch(input, init);

            if (response.status >= 400) {
                throw new Error();
            }

            const rateLimit = parseInt(
                response.headers.get('X-RateLimit-Limit') || '0',
                10
            );

            // Update potential delay for rate limit
            if (rateLimit > 0) {
                this.requestDelay = (3600000 / rateLimit);
            }

            return response;
        }
        catch (error) {
            if (response) {
                throw new MorningstarError(response);
            }
            throw error;
        }

    }


}


/* *
 *
 *  Namespace
 *
 * */


export namespace MorningstarAPI {


    /* *
     *
     *  Enums
     *
     * */


    export enum RegionPath {
        APAC = 'https://www.apac-api.morningstar.com/ecint/v1/',
        EMEA = 'https://www.emea-api.morningstar.com/ecint/v1/',
        NorthAmerica = 'https://www.us-api.morningstar.com/ecint/v1/',
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarAPI;
