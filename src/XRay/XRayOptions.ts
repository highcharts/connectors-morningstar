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


import type {
    MorningstarConverterOptions,
    MorningstarOptions
} from '../Shared/MorningstarOptions';


/* *
 *
 *  API Options
 *
 * */


export interface XRayConverterOptions extends MorningstarConverterOptions {

}


export interface XRayOptions extends MorningstarOptions {

    /**
     * Options related to the x-ray data parser.
     */
    converter?: XRayConverterOptions;

}


/* *
 *
 *  Default Export
 *
 * */


export default XRayOptions;
