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
 *  - Pawel Lysy
 *  - Askel Eirik Johansson
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type {
    MorningstarOptions
} from './MorningstarOptions';


/* *
 *
 *  API Options
 *
 *
 * */


export interface PAUSConnectorOptions extends MorningstarOptions {
    /**
     * Unique identifier of a view.
     * Set of fields representing a data set or scenario.
     * Defines the data points to return in the response.
     *
     * @default 'All'
     */
    viewId: string,
    requestSettings: RequestSettings;
    portfolios: Array<Portfolio>;
}


export interface RequestSettings {
    outputCurrency?: string;
    outputReturnsFrequency: string;
    assetClassGroupConfigs: {
        assetClassGroupConfig: Array<{
            id: string;
        }>;
    };
}

export interface Portfolio {
    name: string;
    totalValue: number;
    currency: string;
    holdings: Array<Holding>;
    benchmark: Benchmark;
}

export interface Holding {
    securityId?: string;
    type?: string;
    weight?: number;
}

export interface Benchmark {
    type: string;
    holdings: Array<Holding>;
}

export interface PAUSPayload {
    Portfolios: Array<Portfolio>;
    RequestSettings: RequestSettings;
    View?: {
        Id: string;
    };
}

/* *
 *
 *  Default Export
 *
 * */


export default PAUSConnectorOptions;
