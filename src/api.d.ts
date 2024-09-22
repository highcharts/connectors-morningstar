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


/* *
 *
 *  Imports
 *
 * */


import RNANewsOptions from './RNANews/RNANewsOptions';
import TimeSeriesOptions from './TimeSeries/TimeSeriesOptions';
import XRayOptions from './XRay/XRayOptions';


/* *
 *
 *  API Options
 *
 * */


/**
 * Available types of the Highcharts Morningstar Connectors.
 */
interface Options {
    RNANews: RNANewsOptions;
    TimeSeries: TimeSeriesOptions;
    XRay: XRayOptions;
}
