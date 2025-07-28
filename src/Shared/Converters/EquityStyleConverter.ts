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

import MorningstarConverter from '../MorningstarConverter';
import type { XRayUSConverterOptions } from '../../XRayUS/XRayUSOptions';
import { STYLE_BOX_VALUES } from '../Utilities';

/* *
 *
 *  Class
 *
 * */


export class EquityStyleConverter extends MorningstarConverter {


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
            portfolio =
            options.json.Analysis.InvestmentStyle.EquityStyle
                .EquityStyleBreakdown.Portfolio;

        if (portfolio) {
            let rowIndex = 0;

            for (const [key, value] of Object.entries(portfolio)) {
                table.setCell('Type' + columnSuffix, rowIndex, key);
                table.setCell('Value' + columnSuffix, rowIndex, value);

                ++rowIndex;
            }
        }

        // Set destructured x & y values
        table.setColumn('Style' + columnSuffix, STYLE_BOX_VALUES.X);
        table.setColumn('Size' + columnSuffix, STYLE_BOX_VALUES.Y);
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default EquityStyleConverter;
