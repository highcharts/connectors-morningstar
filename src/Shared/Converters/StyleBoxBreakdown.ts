/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type {
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import type SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';
import { getBreakdown } from '../SharedSecurityDetails';
import { STYLE_BOX_VALUES } from '../Utilities';

/* *
 *
 *  Class
 *
 * */


export class StyleBoxBreakdownConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: SecurityDetailsConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Properties
     *
     * */


    /* *
     *
     *  Functions
     *
     * */

    public override parse (
        options: SecurityDetailsConverterOptions
    ): void {
        const table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            security = userOptions.json as SecurityDetailsJSON.SecurityDetailsResponse,
            hasMultiple = options.hasMultiple,
            id = security.Id,
            columnStrPostfix = hasMultiple ? `_${id}` : '',
            StyleBoxBreakdowns = security.Portfolios[0].StyleBoxBreakdown || [];

        getBreakdown(
            id,
            StyleBoxBreakdowns,
            table,
            !!hasMultiple
        );

        // Set destructured x & y values
        table.setColumn('Style' + columnStrPostfix, STYLE_BOX_VALUES.X);
        table.setColumn('Size' + columnStrPostfix, STYLE_BOX_VALUES.Y);
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default StyleBoxBreakdownConverter;
