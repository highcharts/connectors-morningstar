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


export interface TimeSeriesConverterOptions extends MorningstarConverterOptions {

}


export interface TimeSeriesOptions extends MorningstarOptions {
    converter?: TimeSeriesConverterOptions;
}


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesOptions;
