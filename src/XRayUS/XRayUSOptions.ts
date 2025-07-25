/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


'use strict';

/* *
 *
 *  Imports
 *
 * */


import type { MorningstarConverterOptions, MorningstarMetadata } from '../Shared';
import type { PAUSOptions, PAUSPayload, Portfolio, RequestSettings } from '../Shared/PAUSOptions';
import type XRayUSJSON from './XRayUSJSON';


/* *
 *
 *  API Options
 *
 * */

export interface XRayUSMetadata extends MorningstarMetadata {

}

export interface XRayUSOptions extends PAUSOptions {
    configId: string;
    langcult?: string;
    portfolios: Array<XRayUSPortfolio>;
    requestSettings: XRayUSRequestSettings;
}

export interface XRayUSRequestPayload extends PAUSPayload {
    Config?: {
        Id: string;
    };
    Portfolios: Array<XRayUSPortfolio>;
    RequestSettings: XRayUSRequestSettings;
}

export interface XRayUSRequestSettings extends RequestSettings {

}

export interface XRayUSPortfolio extends Portfolio {

}

export interface XRayUSConverterOptions extends MorningstarConverterOptions {
    json: XRayUSJSON.XRayUS;
    hasMultiple?: boolean;
}

/* *
 *
 *  Default Export
 *
 * */


export default XRayUSOptions;
