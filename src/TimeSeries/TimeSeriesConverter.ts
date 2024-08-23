/* *
 *
 *  (c) 2009-2024 Highsoft AS
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

    public securitiesFetchBehaviour: FetchMultipleBehaviour = 'pipe';

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
 *  Types
 *
 * */

export type FetchMultipleBehaviour = 'pipe' | 'iterate';


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesConverter;
