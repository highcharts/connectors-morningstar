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
            hasMultiple = options.hasMultiple;

        // Create table
        const id = security.Id,
            assetAllocations = security.Portfolios[0].AssetAllocations,
            assetAllocationsTypeStr =
            'AssetAllocations_Type' + (hasMultiple ? `_${id}` : '');

        table.setColumn(assetAllocationsTypeStr);

        for (let i = 0; i < assetAllocations.length; i++) {
            const asset = assetAllocations[i],
                assetAllocationsAssetStr =
                `AssetAllocations_${asset.Type}_${asset.SalePosition}` +
                (hasMultiple ? `_${id}` : '');
            table.setColumn(assetAllocationsAssetStr);

            for (let j = 0; j < asset.BreakdownValues.length; j++) {
                table.setCell(
                    assetAllocationsAssetStr,
                    j,
                    asset.BreakdownValues[j].Value
                );

                table.setCell(
                    assetAllocationsTypeStr,
                    j,
                    asset.BreakdownValues[j].Type
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


export default AssetAllocationsConverter;
