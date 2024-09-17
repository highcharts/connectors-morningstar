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

}


export interface MorningstarHoldingWeightOptions extends MorningstarSecurityOptions {

    /**
     * Holding weight.
     */
    weight: (number|string);

}


export interface MorningstarHoldingValueOptions extends MorningstarSecurityOptions {

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
     * Name of the security.
     */
    name?: string;

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
    Bond = 'BD',
    Cash = 'CASH',
    CategoryAverage = 'CA',
    ClosedEndFund = 'FC',
    EconomicsSeries = 'EI',
    ExchangeTradedFund = 'FE',
    Index = 'XI',
    InsuranceProductFund = 'FV',
    MoneyMarketFund = 'FM',
    OpenEndFund = 'FO',
    Portfolio529 = 'CT',
    SeparateAccount = 'SA',
    Stock = 'ST',
    UKLPSubAccounts = 'VA',
    UnitInvestmentTrust = 'FI',
    VariableAnnuity = 'V1'
}


/* *
 *
 *  Functions
 *
 * */


export function isMorningstarHoldingAmountOptions (
    options?: unknown
): options is MorningstarHoldingAmountOptions {
    return (
        !!options &&
        typeof options === 'object' &&
        (
            typeof (options as MorningstarHoldingAmountOptions).amount === 'number' ||
            typeof (options as MorningstarHoldingAmountOptions).amount === 'string'
        ) &&
        typeof (options as MorningstarHoldingValueOptions).value === 'undefined' &&
        typeof (options as MorningstarHoldingWeightOptions).weight === 'undefined'
    );
}


export function isMorningstarHoldingValueOptions (
    options?: unknown
): options is MorningstarHoldingValueOptions {
    return (
        !!options &&
        typeof options === 'object' &&
        typeof (options as MorningstarHoldingAmountOptions).amount === 'undefined' &&
        (
            typeof (options as MorningstarHoldingValueOptions).value === 'number' ||
            typeof (options as MorningstarHoldingValueOptions).value === 'string'
        ) &&
        typeof (options as MorningstarHoldingWeightOptions).weight === 'undefined'
    );
}


export function isMorningstarHoldingWeightOptions (
    options?: unknown
): options is MorningstarHoldingWeightOptions {
    return (
        !!options &&
        typeof options === 'object' &&
        typeof (options as MorningstarHoldingAmountOptions).amount === 'undefined' &&
        typeof (options as MorningstarHoldingValueOptions).value === 'undefined' &&
        (
            typeof (options as MorningstarHoldingWeightOptions).weight === 'number' ||
            typeof (options as MorningstarHoldingWeightOptions).weight === 'string'
        )
    );
}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarOptions;
