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

            for (const [key, value] of Object.entries(breakdown)) {
                if (key === 'Unclassified' && !Array.isArray(value)) {
                    table.setCell('Unclassified' + columnSuffix, 0, value);

                    continue;
                }

                if (key === 'SecurityBreakdown') {
                    breakdown.SecurityBreakdown.forEach((security) => {
                        if (!security.FixedIncomeStyleBreakdownItem) {
                            return;
                        }

                        table.setColumn(
                            'Value_' + security.SecurityId,
                            Object.values(security.FixedIncomeStyleBreakdownItem)
                        );
                    });

                    continue;
                }

                // Skip properties that are not style types
                if (Array.isArray(value) || key === 'AsOfDate') {
                    continue;
                }

                table.setCell('Type', rowIndex, key);
                table.setCell('Value' + columnSuffix, rowIndex, value);

                ++rowIndex;
            }
        }

        // Set destructured x & y values
        table.setColumn('Style', STYLE_BOX_VALUES.X);
        table.setColumn('Size', STYLE_BOX_VALUES.Y);
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default FixedIncomeStyleConverter;
