/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Eskil Gjerde Sviggum
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import MorningstarConverter from '../Shared/MorningstarConverter';
import MorningstarURL from '../Shared/MorningstarURL';


/* *
 *
 *  Class
 *
 * */


export abstract class TimeSeriesConverter extends MorningstarConverter {

    /* *
     *
     *  Properties
     *
     * */

    public abstract path: string;

    /* *
     *
     *  Functions
     *
     * */

    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    public decorateURL (url: MorningstarURL) {}

}


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesConverter;
