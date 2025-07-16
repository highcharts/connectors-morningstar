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
} from '../Shared/MorningstarOptions';
import PerformanceJSON from './PerformanceJSON';


/* *
 *
 *  API Options
 *
 * */

export interface PerformanceOptions extends MorningstarOptions {
    portfolios?: any;
    requestSettings?: any;
    viewId?: string;
}

export interface PerformanceRequestPayload {
    Portfolios: any[];
    RequestSettings: {}
    View?: {
        Id: string;
    };
}

/* *
 *
 *  Default Export
 *
 * */


export default PerformanceOptions;
