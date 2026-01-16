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


import type {
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import type SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';
import { STYLE_BOX_VALUES } from '../Utilities';

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
            hasMultiple = options.hasMultiple,
            id = security.Id,
            columnStrPostfix = hasMultiple ? `_${id}` : '',
            bondStyleBoxBreakdowns = security.Portfolios[0].BondStyleBoxBreakdown || [],
            typeColumnName = 'Type' + columnStrPostfix;

        for (let i = 0; i < bondStyleBoxBreakdowns.length; i++) {
            const { SalePosition, BreakdownValues } = bondStyleBoxBreakdowns[i],
                salePositionColumnName = `${SalePosition}` + columnStrPostfix;

            for (let j = 0; j < BreakdownValues.length; j++) {
                const { Type, Value } = BreakdownValues[j];

                table.setCell(typeColumnName, j, Type);
                table.setCell(salePositionColumnName, j, Value);

            }
        }

        // Set destructured x & y values
        table.setColumn('Term' + (hasMultiple ? `_${id}` : ''), STYLE_BOX_VALUES.X);
        table.setColumn('Quality' + (hasMultiple ? `_${id}` : ''), STYLE_BOX_VALUES.Y);
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default BondStyleBoxBreakdownConverter;
