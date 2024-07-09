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


import type { MorningstarAccessOptions } from "./MorningstarOptions";

import MorningstarRegion from "./MorningstarRegion";


/* *
 *
 *  Declarations
 *
 * */


/**
 * JSON object of a failed OAuth2 response.
 */
interface OAuth2MessageJSON {

    /**
     * Status message.
     */
    message: string;

}


/**
 * JSON object of an successful OAuth2 response.
 */
interface OAuth2TokenJSON {

    /**
     * Access token.
     */
    access_token: string;

    /**
     * Timeout in seconds.
     */
    expires_in: number;

    /**
     * Validation type.
     */
    token_type: 'Bearer';


}


/* *
 *
 *  Functions
 *
 * */


function isOAuth2MessageJSON(
    json: unknown
): json is OAuth2MessageJSON {
    return (
        json !== null &&
        typeof json === 'object' &&
        typeof (json as OAuth2MessageJSON).message === 'string'
    );
}


function isOAuth2TokenJSON(
    json: unknown
): json is OAuth2TokenJSON {
    return (
        json !== null &&
        typeof json === 'object' &&
        typeof (json as OAuth2TokenJSON).access_token === 'string' &&
        typeof (json as OAuth2TokenJSON).expires_in === 'number' &&
        (json as OAuth2TokenJSON).token_type === 'Bearer'
    );
}


/* *
 *
 *  Class
 *
 * */


export class MorningstarAccess {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor(
        options: MorningstarAccessOptions = {}
    ) {

        this.url = (
            options.url ?
                new URL(options.url, window.location.href) :
                new URL('/token/oauth', MorningstarRegion.baseURLs[MorningstarRegion.detect()])
        );

        if (this.url.protocol !== 'https:') {
            throw new Error('Insecure API protocol');
        }

        if (options.token) {
            this.token = options.token;
            this.tokenType = 'Option';
        }

        this.setPayload(options.username, options.password);

        delete options.password;
        delete options.username;

    }


    /* *
     *
     *  Properties
     *
     * */


    /**
     * Indicates the result of the last authenticate result.
     */
    public authorized?: boolean;


    public errorMessage?: string;


    private payload?: string;


    private timeout?: number;


    private token?: string;


    private tokenType?: ('Bearer'|'Option');


    private readonly url: URL;


    /* *
     *
     *  Functions
     *
     * */


    public async authenticate(
        username?: string,
        password?: string
    ): Promise<boolean> {

        window.clearTimeout(this.timeout);

        delete this.authorized;
        delete this.errorMessage;
        delete this.timeout;

        if (this.tokenType === 'Bearer') {
            delete this.token;
            delete this.tokenType;
        }

        if (
            typeof password === 'string' &&
            typeof username === 'string'
        ) {
            this.setPayload(username, password);
        }

        if (!this.payload) {

            if (this.token) {
                this.authorized = true;
            }

            return !!this.authorized;
        }

        const payload = this.payload;
        const requestInit: RequestInit = {
            cache: 'no-cache',
            credentials: 'omit',
            headers: new Headers({
                Authorization: `Basic ${payload}`
            }),
            method: 'POST',
            redirect: 'error'
        };

        delete this.payload;

        try {
            const response = await fetch(this.url, requestInit);
            const responseJSON: unknown = await response.json();

            if (
                response.status === 200 &&
                isOAuth2TokenJSON(responseJSON)
            ) {

                this.authorized = true;
                this.payload = payload;
                this.token = responseJSON.access_token;
                this.tokenType = responseJSON.token_type;

                this.setTimeout(responseJSON.expires_in);

            } else {

                this.authorized = false;

                if (isOAuth2MessageJSON(responseJSON)) {

                    this.errorMessage = responseJSON.message;

                }

            }

        } catch(error) {

            this.authorized = false;
            this.errorMessage = '' + error;

        }

        return !!this.authorized;
    }


    public authorizeRequest(
        requestInit: RequestInit
    ): RequestInit {
        const token = this.token;
        const tokenType = (
            this.tokenType === 'Option' ?
                'Bearer' :
                this.tokenType
        );

        if (
            typeof token === 'undefined' ||
            typeof tokenType === 'undefined'
        ) {
            return requestInit;
        }

        const headers = (
            requestInit.headers instanceof Headers ?
                requestInit.headers :
                new Headers(requestInit.headers)
        );

        headers.set('Authorization', `${tokenType} ${token}`);

        requestInit.cache = 'no-cache';
        requestInit.credentials = 'same-origin';
        requestInit.headers = headers;
        requestInit.redirect = 'error';

        return requestInit;
    }


    protected setPayload(
        username?: string,
        password?: string
    ): void {

        delete this.payload;

        if (
            typeof password === 'string' &&
            typeof username === 'string'
        ) {
            username = unescape(encodeURIComponent(username));
            password = unescape(encodeURIComponent(password));
            this.payload = btoa(`${username}:${password}`);
        }

    }


    protected setTimeout(
        seconds: number
    ): void {

        window.clearTimeout(this.timeout);

        this.timeout = window.setTimeout(
            (): void => void this.authenticate(),
            seconds * 1000
        );

    }


    public setToken(
        token: string
    ): void {
        this.authorized = true;
        this.token = token;
        this.tokenType = 'Bearer';
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarAccess;
