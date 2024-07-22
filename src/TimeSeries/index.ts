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


import TimeSeriesConnector from './TimeSeriesConnector';
import TimeSeriesCumulativeReturnConverter from './Converters/TimeSeriesCumulativeReturnConverter';
import TimeSeriesRatingConverter from './Converters/TimeSeriesRatingConverter';


/* *
 *
 *  Exports
 *
 * */


export * from './TimeSeriesConnector';
export * from './TimeSeriesOptions';


/* *
 *
 *  Default Export
 *
 * */


export default {
    TimeSeriesConnector,
    TimeSeriesCumulativeReturnConverter,
    TimeSeriesRatingConverter
};
