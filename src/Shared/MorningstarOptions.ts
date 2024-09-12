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


import type * as External from './External';


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


export interface MorningstarConverterOptions extends External.DataConverterOptions {

    /**
     * JSON data from Morningstar Direct Web Service.
     */
    json?: unknown;

}


export interface MorningstarHoldingAmountOptions extends MorningstarSecurityOptions {

    /**
     * Holding amount.
     */
    amount: number;

    /**
     * Name of holding.
     */
    name?: string;

}


export interface MorningstarHoldingWeightOptions extends MorningstarSecurityOptions {

    /**
     * Name of holding.
     */
    name?: string;

    /**
     * Holding weight.
     */
    weight: (number|string);

}


export interface MorningstarHoldingValueOptions extends MorningstarSecurityOptions {

    /**
     * Name of holding.
     */
    name?: string;

    /**
     * Holding value.
     */
    value: number;

}


export interface MorningstarOptions extends External.DataConnectorOptions {

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


/**
 * Options to load the Morningstar Direct Web Service options from a provided
 * Postman file.
 */
export interface MorningstarPostmanOptions {

    /**
     * Postman JSON to use.
     */
    environmentJSON?: unknown;

    /**
     * URL or path to the shared Postman Environment to use.
     */
    environmentURL?: string;

}


export interface MorningstarSecurityOptions {

    /**
     * Security identifier.
     */
    id: string;

    /**
     * Security identifier type.
     */
    idType: string;

    /**
     * Type of security.
     */
    type?: (string|MorningstarSecurityType);

}


/* *
 *
 *  Enums
 *
 * */


export enum MorningstarSecurityType {
    'Bond' = 'BD',
    '529 Portfolio' = 'CT',
    'Cash' = 'CASH',
    'Category Average' = 'CA',
    'Closed-End Fund' = 'FC',
    'Economics Series' = 'EI',
    'Exchange-Traded Fund' = 'FE',
    'Index' = 'XI',
    'Insurance Product Fund' = 'FV',
    'Money Market Fund' = 'FM',
    'Open-End Fund' = 'FO',
    'Separate Account' = 'SA',
    'Stock' = 'ST',
    'UK LP SubAccounts' = 'VA',
    'Unit Investment Trust' = 'FI',
    'Variable Annuity' = 'V1'
}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarOptions;
