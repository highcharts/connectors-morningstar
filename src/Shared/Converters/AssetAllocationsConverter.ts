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


import type {
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import type SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';

/* *
 *
 *  Class
 *
 * */


export class AssetAllocationsConverter extends MorningstarConverter {


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
            hasMultiple = options.hasMultiple,
            id = security.Id,
            columnStrPostfix = hasMultiple ? `_${id}` : '',
            assetAllocations = security.Portfolios[0].AssetAllocations || [];

        for (let i = 0; i < assetAllocations.length; i++) {
            const { Type, SalePosition, BreakdownValues } = assetAllocations[i],
                assetAllocationsAssetStr = `${Type}_${SalePosition}` + columnStrPostfix,
                assetAllocationsTypeStr = `${Type}_` + 'Type' + columnStrPostfix;

            for (let j = 0; j < BreakdownValues.length; j++) {
                const { Type, Value } = BreakdownValues[j];

                table.setCell(assetAllocationsTypeStr, j, Type);
                table.setCell(assetAllocationsAssetStr, j, Value);
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default AssetAllocationsConverter;
