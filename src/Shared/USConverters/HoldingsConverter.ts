/* *
 *
 *  (c) 2009-2026 Highsoft AS
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

import MorningstarConverter from '../MorningstarConverter';
import type { XRayUSConverterOptions } from '../../XRayUS/XRayUSOptions';

/* *
 *
 *  Class
 *
 * */


export class HoldingsConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: XRayUSConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: XRayUSConverterOptions,
        hasMultiple?: boolean
    ): void {
        const table = this.table,
            columnSuffix = hasMultiple ? `_${options.json.PortfolioName}` : '',
            portfolioHoldings = options.json.Holdings.PortfolioHoldings;

        if (portfolioHoldings) {
            let rowIndex = 0;

            for (const security of portfolioHoldings.Security) {
                for (const key of Object.keys(security) as Array<keyof typeof security>) {
                    const columnName = key + columnSuffix;
                    table.setCell(columnName, rowIndex, security[key]);
                }
                ++rowIndex;
            }
        }

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default HoldingsConverter;
