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


export class FixedIncomeStyleConverter extends MorningstarConverter {


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
            breakdown =
            options.json.Analysis.InvestmentStyle.FixedIncomeStyle
                .FixedIncomeStyleBreakdown;

        if (breakdown) {
            let rowIndex = 0;

            for (const key of Object.keys(breakdown) as Array<keyof typeof breakdown>) {
                if (key === 'SecurityBreakdown') {
                    breakdown.SecurityBreakdown.forEach((security) => {
                        table.setColumn(
                            'Value_' + security.SecurityId,
                            Object.values(security.FixedIncomeStyleBreakdownItem)
                        );
                    });
                    continue;
                }

                if (key === 'AsOfDate') {
                    continue;
                }


                if (key === 'Unclassified') {
                    table.setCell('Unclassified' + columnSuffix, 0, breakdown[key]);
                    continue;
                }

                table.setCell('Type', rowIndex, key);
                table.setCell('Value' + columnSuffix, rowIndex, breakdown[key]);

                ++rowIndex;
            }

            // Set destructured x & y values
            table.setColumn('Style', STYLE_BOX_VALUES.X);
            table.setColumn('Size', STYLE_BOX_VALUES.Y);
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default FixedIncomeStyleConverter;
