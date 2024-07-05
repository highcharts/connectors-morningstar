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


import MorningstarOAuth2 from './MorningstarOAuth2';
import MorningstarError from './MorningstarError';
import {
    MorningstarAPIOptions,
    MorningstarAuthenticationOptions
} from './MorningstarOptions';


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
        this.baseURL = new URL(
            options.url ??
            MorningstarAPI.regionalBaseURL[MorningstarAPI.detectRegion()],
            window.location.href
        );
        this.version = (
            options.version ??
            parseInt((this.baseURL.pathname.match(/\/v(\d+)(?:\/|$)/) || [])[ 1 ], 10)
        );
        this.version = (this.version > 0 ? this.version : 1);

        // Validate API URL
        if (this.baseURL.protocol !== 'https:') {
            throw new Error('Insecure API protocol');
        }

    }


    /* *
     *
     *  Properties
     *
     * */


    private accessTimeout?: number;


    private accessToken?: string;


    public authorized?: boolean;


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


    public async authenticate(
        options: (MorningstarAuthenticationOptions|undefined) = this.options.authentication || {}
    ): Promise<boolean> {

        window.clearTimeout(this.accessTimeout);

        delete this.accessTimeout;
        delete this.accessToken;
        delete this.authorized;

        if (options.accessToken) {
            this.setAccessTimeout(3600, options);
            this.accessToken = options.accessToken;
            this.authorized = true;
            return true;
        }

        if (
            !options.password ||
            !options.username
        ) {
            return false;
        }

        // First validate connection without credentials, expect a fail.
        try {
            await this.fetch(MorningstarOAuth2.url, MorningstarOAuth2.getDummyRequest());
            return false;
        }
        catch (error) {
            if (
                !(error instanceof MorningstarError) ||
                error.response.status !== 403 ||
                !MorningstarOAuth2.isOAuth2MessageJSON(await error.response.json())
            ) {
                return false;
            }
        }

        // Now do the real request with credentials.
        const response = await this.fetch(
            MorningstarOAuth2.url,
            MorningstarOAuth2.getAuthenticationRequest(options.username, options.password)
        );

        const responseJSON: unknown = await response.json();

        if (MorningstarOAuth2.isOAuth2TokenJSON(responseJSON)) {
            this.setAccessTimeout(responseJSON.expires_in, options);
            this.accessToken = responseJSON.access_token;
            this.authorized = true;
            return true;
        }

        return false;
    }


    public delay (
        milliseconds: number
    ): Promise<void> {
        return new Promise(resolve => window.setTimeout(resolve, milliseconds));
    }


    public async fetch (
        url: string,
        init?: RequestInit
    ): Promise<Response> {

        if (URL.canParse(url)) {
            throw new Error('Absolute URLs are not supported.');
        }

        const finalURL = new URL(url, this.baseURL);
        const requestDelay = (
            this.requestDelay -
            ((new Date()).getTime() - this.lastRequestTimestamp)
        );

        // Apply delay for rate limit
        if (requestDelay > 0) {
            await this.delay(requestDelay);
        }

        this.lastRequestTimestamp = (new Date()).getTime();

        if (this.accessToken) {
            init = MorningstarOAuth2.getAuthorizedRequest(this.accessToken, init);
        }

        const response = await window.fetch(finalURL, init);

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


    protected setAccessTimeout(
        seconds: number,
        options: MorningstarAuthenticationOptions = this.options.authentication || {}
    ): void {

        if (seconds > 1) {
            --seconds;
        }

        this.accessTimeout = window.setTimeout(
            (): void => void this.authenticate(options),
            seconds * 1000
        );

    }


}


/* *
 *
 *  Class Namespace
 *
 * */


export namespace MorningstarAPI {


    /* *
     *
     *  Declarations
     *
     * */


    export type Region = ('Americas'|'APAC'|'EMEA');


    /* *
     *
     *  Constants
     *
     * */


    const countriesAmericas = [
        'AG', 'AI', 'AR', 'AW', 'BB', 'BL', 'BM', 'BO', 'BQ', 'BR', 'BS', 'BZ', 'CA', 'CL', 'CO',
        'CR', 'CU', 'CW', 'DM', 'DO', 'EC', 'FK', 'GD', 'GF', 'GP', 'GS', 'GT', 'GY', 'HN', 'HT',
        'JM', 'KN', 'KY', 'LC', 'MF', 'MQ', 'MS', 'MX', 'NI', 'PA', 'PE', 'PM', 'PR', 'PY', 'SR',
        'SV', 'UM', 'US', 'UY', 'VC', 'VE', 'VG', 'VI'
    ];


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


    export const regionalBaseURL: Record<Region, string> = {
        Americas: 'https://www.us-api.morningstar.com/',
        APAC: 'https://www.apac-api.morningstar.com/',
        EMEA: 'https://www.emea-api.morningstar.com/'
    };


    /* *
     *
     *  Functions
     *
     * */


    export function detectRegion(): Region {
        const country = window.navigator.language.toUpperCase().match(/-(\w\w)/);

        if (country) {
            if (countriesAmericas.includes(country[1])) {
                return 'Americas';
            }
            if (countriesEMEA.includes(country[1])) {
                return 'EMEA';
            }
            return 'APAC';
        }

        return 'Americas';
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarAPI;
