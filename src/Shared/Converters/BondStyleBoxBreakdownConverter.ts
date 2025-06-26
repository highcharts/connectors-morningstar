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


import {
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';

/* *
 *
 *  Class
 *
 * */


export class BondStyleBoxBreakdownConverter extends MorningstarConverter {


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
            hasMultiple = options.hasMultiple;

        // Create table
        const id = security.Id,
            bondStyleBoxBreakdowns = security.Portfolios[0].BondStyleBoxBreakdown;

        if (!bondStyleBoxBreakdowns || !bondStyleBoxBreakdowns.length) {
            return;
        }

        const typeColumnName =
                'BondStyleBoxBreakdown_Type' + (hasMultiple ? `_${id}` : '');

        for (let i = 0; i < bondStyleBoxBreakdowns.length; i++) {
            const breakdown = bondStyleBoxBreakdowns[i];

            for (let j = 0; j < breakdown.BreakdownValues.length; j++) {
                const salePositionColumnName =
                    `BondStyleBoxBreakdown_${breakdown.SalePosition}` +
                    (hasMultiple ? `_${id}` : '');

                // Set up BondStyleBoxBreakdowns Type column only once
                if (i === 0) {
                    table.setCell(
                        typeColumnName,
                        j,
                        breakdown.BreakdownValues[j].Type
                    );
                }

                // Set up BondStyleBoxBreakdowns SalePosition values
                table.setCell(
                    salePositionColumnName,
                    j,
                    breakdown.BreakdownValues[j].Value
                );

            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default BondStyleBoxBreakdownConverter;
