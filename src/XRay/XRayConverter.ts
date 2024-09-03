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


import MorningstarConverter from '../Shared/MorningstarConverter';
import { XRayConverterOptions } from './XRayOptions';
import XRayJSON from './XRayJSON';


/* *
 *
 *  Classes
 *
 * */


export class XRayConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: XRayConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: XRayConverterOptions
    ): void { 
        /// const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;
        const xrays: Array<XRayJSON.XRayResponse> = [];

        // Validate JSON

        if (XRayJSON.isResponse(json)) {
            xrays.push(...json.XRay);
        } else if (XRayJSON.isXRayResponse(json)) {
            xrays.push(json);
        } else {
            throw new Error('Invalid data');
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default XRayConverter;
