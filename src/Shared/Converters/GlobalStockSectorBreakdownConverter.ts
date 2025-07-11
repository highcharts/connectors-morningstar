/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Pawel Lysy
 *  - Askel Eirik Johansson
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


export class GlobalStockSectorBreakdownConverter extends MorningstarConverter {


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
        const GlobalStockSectorBreakdown =
            security.Portfolios[0].GlobalStockSectorBreakdown,
            id = security.Id,
            colStrType = 'Type' + (hasMultiple ? `_${id}` : ''),
            notClassifiedStr = 'NotClassified' + (hasMultiple ? `_${id}` : '');

        for (let i = 0; i < GlobalStockSectorBreakdown.length; i++) {
            const asset = GlobalStockSectorBreakdown[i],
                colStrAsset = `${asset.SalePosition}` +
                (hasMultiple ? `_${id}` : '');

            // Populate NotClassified for all assets.
            table.setCell(notClassifiedStr, i, asset.NotClassified);

            for (let j = 0; j < asset.BreakdownValues.length; j++) {
                table.setCell(
                    colStrType,
                    j,
                    asset.BreakdownValues[j].Type
                );
                table.setCell(
                    colStrAsset,
                    j,
                    asset.BreakdownValues[j].Value
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


export default GlobalStockSectorBreakdownConverter;
