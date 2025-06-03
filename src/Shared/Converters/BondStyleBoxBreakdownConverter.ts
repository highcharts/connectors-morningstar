/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
    SecurityDetailsConverterOptions,
    SecurityDetailsMetadata
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

        this.metadata = {
            columns: {},
            ...(options && options.hasMultiple && { ids: [] }),
            ...(options && options.hasMultiple && { isins: [] })
        };
    }


    /* *
     *
     *  Properties
     *
     * */


    public readonly metadata: SecurityDetailsMetadata;


    /* *
     *
     *  Functions
     *
     * */

    public override parse (
        options: SecurityDetailsConverterOptions
    ): void {
        const metadata = this.metadata,
            table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            security = userOptions.json as SecurityDetailsJSON.SecurityDetailsResponse,
            hasMultiple = options.hasMultiple;

        // Create table
        const id = security.Id,
            isin = security.Isin,
            bondStyleBoxBreakdowns = security.Portfolios[0].BondStyleBoxBreakdown;

        const typeColumnName =
                'BondStyleBoxBreakdown_Type' + (hasMultiple ? `_${id}` : '');

        for (let i = 0; i < bondStyleBoxBreakdowns.length; i++) {
            const breakdown = bondStyleBoxBreakdowns[i];

            for (let j = 0; j < breakdown.BreakdownValues.length; j++) {
                const salePositionColumnName =
                    `BondStyleBoxBreakdown_SalePosition_${breakdown.SalePosition}` +
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

        // Update metadata
        if (hasMultiple){
            metadata.ids?.push(id);
            metadata.isins?.push(isin);
        } else {
            metadata.id = id;
            metadata.isin = isin;
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default BondStyleBoxBreakdownConverter;
