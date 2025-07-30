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
            equityStyleBreakdown =
                options.json.Analysis.InvestmentStyle.EquityStyle.EquityStyleBreakdown,
            portfolio = equityStyleBreakdown.Portfolio,
            securityBreakdown = equityStyleBreakdown.SecurityBreakdown;

        // Set data for whole portfolio
        if (portfolio) {
            let rowIndex = 0;

            for (const [key, value] of Object.entries(portfolio)) {
                if (key === 'Unclassified') {
                    table.setCell('Unclassified' + columnSuffix, 0, value);

                    continue;
                }

                table.setCell('Type', rowIndex, key);
                table.setCell('Value' + columnSuffix, rowIndex, value);

                ++rowIndex;
            }
        }

        // Set data for each security
        if (securityBreakdown) {
            securityBreakdown.forEach((security) => {
                if (!security.EquityStyleBreakdownItem) {
                    return;
                }

                let rowIndex = 0;

                for (const [key, value] of Object.entries(security.EquityStyleBreakdownItem)) {
                    if (key === 'Unclassified') {
                        table.setCell('Unclassified_' + security.SecurityId, 0, value);

                        continue;
                    }

                    table.setCell('Value_' + security.SecurityId, rowIndex, value);

                    ++rowIndex;
                }
            });
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


export default EquityStyleConverter;
