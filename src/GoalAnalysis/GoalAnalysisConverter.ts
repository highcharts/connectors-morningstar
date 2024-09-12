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


import { GoalAnalysisConverterOptions } from './GoalAnalysisOptions';
import MorningstarConverter from '../Shared/MorningstarConverter';


/* *
 *
 *  Class
 *
 * */


export class GoalAnalysisConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options?: GoalAnalysisConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        options: GoalAnalysisConverterOptions
    ): void {
        /** @todo */
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default GoalAnalysisConverter;
