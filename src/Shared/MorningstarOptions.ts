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


import type DataConnectorOptions from '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorOptions';


/* *
 *
 *  API Options
 *
 * */


export interface MorningstarAPIOptions {

    /**
     * Access options to get authorized access to the Morningstar Direct Web
     * Services.
     */
    access?: MorningstarAccessOptions;

    /**
     * Absolute URL or relative URL path to the API to be used.
     *
     * Defaults to the nearest region of the Morningstar Direct Web Services
     * based on the browser localization settings.
     */
    url?: string;

    /**
     * Manually set the version of API.
     *
     * Default to the version number of the API URL or `1`.
     */
    version?: number;

}


export interface MorningstarAccessOptions {

    /**
     * Use the password in combination with the username for the Morningstar
     * Direct Web Services.
     */
    password?: string;

    /**
     * Use the given token for the Morningstar Direct Web Services instead of
     * username and password.
     */
    token?: string;

    /**
     * Absolute URL or relative URL path to the API to be used.
     *
     * Defaults to the nearest region of the Morningstar Direct Web Services
     * based on the browser localization settings. 
     */
    url?: string;

    /**
     * Use the username in combination with the password for the Morningstar
     * Direct Web Services.
     */
    username?: string;

}


export interface MorningstarConverterOptions {

}


/**
 * Options to load the Morningstar Direct Web Service options from a provided
 * Postman file.
 */
export interface MorningstarPostmanOptions {

    /**
     * URL or path to the shared Postman Environment to use.
     */
    environmentURL?: string;

}


export interface MorningstarOptions extends DataConnectorOptions {

    /**
     * Options to configure the API communication with the Morningstar Direct
     * Web Services.
     */
    api?: MorningstarAPIOptions;

    /**
     * Options to configure connector details.
     */
    converter?: MorningstarConverterOptions;

    /**
     * Options to configure the connector from provided Postman files.
     */
    postman?: MorningstarPostmanOptions;

}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarOptions;
