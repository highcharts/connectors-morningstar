/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
import { SecurityDetailsConverterOptions, SecurityCompareMetadata } from '../SecurityDetails/SecurityDetailsOptions';


/* *
 *
 *  Class
 *
 * */


export abstract class SecurityCompareConverter extends MorningstarConverter {

    /* *
     *
     *  Properties
     *
     * */

    public abstract metadata: SecurityCompareMetadata;

    /* *
     *
     *  Functions
     *
     * */

    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    public parse (options: SecurityDetailsConverterOptions) {}

}


/* *
 *
 *  Default Export
 *
 * */


export default SecurityCompareConverter;
