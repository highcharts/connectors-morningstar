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
        this.lastRequestTimestamp = 0;
        this.options = options;
        this.requestDelay = 0;
        this.url = new URL(
            options.url ??
            MorningstarAPI.regionURL[MorningstarAPI.detectRegion()],
            window.location.href
        );
        this.version = (
            options.version ??
            parseInt((this.url.pathname.match(/\/v(\d+)(?:\/|$)/) || [])[ 1 ], 10)
        );
        this.version = (this.version > 0 ? this.version : 1);

        // Validate API URL
        if (this.url.protocol !== 'https:') {
            throw new Error('Insecure API protocol');
        }

    }


    /* *
     *
     *  Properties
     *
     * */


    public authorized?: boolean;


    protected lastRequestTimestamp: number;


    public readonly options: MorningstarAPIOptions;


    protected requestDelay: number;


    public readonly url: URL;


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

            const rateLimit = parseInt(response.headers.get('X-RateLimit-Limit') || '0', 10);

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
     *  Constants
     *
     * */


    export const regionURL: Record<('APAC'|'EMEA'|'NorthAmerica'), string> = {
        APAC: 'https://www.apac-api.morningstar.com/ecint/v1/',
        EMEA: 'https://www.emea-api.morningstar.com/ecint/v1/',
        NorthAmerica: 'https://www.us-api.morningstar.com/ecint/v1/'
    };


    const countriesEMEA = [
        'AD', 'AE', 'AL', 'AM', 'AO', 'AT', 'AX', 'BA', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BW',
        'BY', 'CD', 'CF', 'CG', 'CH', 'CI', 'CM', 'CV', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DZ', 'EE',
        'EG', 'EH', 'ER', 'ES', 'ET', 'EU', 'FI', 'FO', 'FR', 'GA', 'GB', 'GE', 'GG', 'GH', 'GI',
        'GL', 'GM', 'GN', 'GQ', 'GR', 'GW', 'HR', 'HU', 'IE', 'IL', 'IM', 'IQ', 'IR', 'IS', 'IT',
        'JE', 'JO', 'KE', 'KW', 'LB', 'LI', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD',
        'ME', 'MG', 'MK', 'ML', 'MR', 'MT', 'MW', 'MZ', 'NA', 'NE', 'NG', 'NL', 'NO', 'OM', 'PL',
        'PS', 'PT', 'QA', 'RO', 'RS', 'RW', 'SA', 'SC', 'SD', 'SE', 'SI', 'SJ', 'SK', 'SL', 'SM',
        'SN', 'SO', 'SS', 'ST', 'SX', 'SY', 'SZ', 'TD', 'TF', 'TG', 'TN', 'TR', 'TZ', 'UA', 'UG',
        'VA', 'YE', 'ZA', 'ZM', 'ZW'
    ];


    const countriesNorthAmerica = [
        'AG', 'AI', 'AW', 'BB', 'BL', 'BM', 'BQ', 'BS', 'BZ', 'CA', 'CR', 'CU', 'CW', 'DM', 'DO',
        'GD', 'GP', 'GT', 'HN', 'HT', 'JM', 'KN', 'KY', 'LC', 'MF', 'MQ', 'MS', 'MX', 'NI', 'PA',
        'PM', 'PR', 'SV', 'UM', 'US', 'VC', 'VG', 'VI'
    ];


    /* *
     *
     *  Functions
     *
     * */


    export function detectRegion(): ('APAC'|'EMEA'|'NorthAmerica') {
        const country = window.navigator.language.toUpperCase().match(/-(\w\w)/);

        if (country) {
            if (countriesEMEA.includes(country[1])) {
                return 'EMEA';
            }
            if (countriesNorthAmerica.includes(country[1])) {
                return 'NorthAmerica';
            }
            return 'APAC';
        }

        return 'NorthAmerica';
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarAPI;
