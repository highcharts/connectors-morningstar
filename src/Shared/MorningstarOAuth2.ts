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
 *  Namespace
 *
 * */


export namespace OAuth2 {


    /* *
     *
     *  Declarations
     *
     * */


    /**
     * JSON object of a failed OAuth2 response.
     */
    export interface OAuth2MessageJSON {

        /**
         * Status message.
         */
        message: string;

    }


    /**
     * JSON object of an successful OAuth2 response.
     */
    export interface OAuth2TokenJSON {

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
        token_type: string;

    }


    /* *
     *
     *  Constants
     *
     * */


    export const url = '/token/oauth';


    /* *
     *
     *  Functions
     *
     * */


    export function getAuthenticationRequest(
        username: string,
        password: string,
        init?: RequestInit
    ): RequestInit {
        const base64 = btoa(`${username}:${password}`);
        const headers = new Headers();

        headers.set('Authorization', `Basic ${base64}`);

        return {
            ...init,
            cache: 'no-cache',
            credentials: 'same-origin',
            headers,
            method: 'POST',
            redirect: 'error'
        };
    }


    export function getAuthorizedRequest(
        accessToken: string,
        init?: RequestInit
    ): RequestInit {
        const headers = new Headers();

        headers.set('Authorization', `Bearer ${accessToken}`);

        return {
            ...init,
            cache: 'no-cache',
            credentials: 'same-origin',
            headers,
            method: 'POST',
            redirect: 'error'
        };
    }


    export function getDummyRequest(): RequestInit {
        return {
            cache: 'no-cache',
            credentials: 'omit',
            redirect: 'error'
        };
    }



    export function isOAuth2MessageJSON(
        json: unknown
    ): json is OAuth2MessageJSON {
        return (
            json !== null &&
            typeof json === 'object' &&
            typeof (json as OAuth2MessageJSON).message === 'string'
        );
    }


    export function isOAuth2TokenJSON(
        json: unknown
    ): json is OAuth2TokenJSON {
        return (
            json !== null &&
            typeof json === 'object' &&
            typeof (json as OAuth2TokenJSON).access_token === 'string' &&
            typeof (json as OAuth2TokenJSON).expires_in === 'number' &&
            typeof (json as OAuth2TokenJSON).token_type == 'string'
        );
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default OAuth2;
