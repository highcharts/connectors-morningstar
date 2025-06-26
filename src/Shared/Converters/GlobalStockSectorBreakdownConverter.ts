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
        const GlobalStockSectorBreakdown =
            security.Portfolios[0].GlobalStockSectorBreakdown,
            id = security.Id,
            isin = security.Isin,
            colStrType = 'GlobalStockSectorBreakdown_Type' + (hasMultiple ? `_${id}` : ''),
            notClassifiedStr = 'GlobalStockSectorBreakdown_NotClassified' + (hasMultiple ? `_${id}` : ''),
            assetStr = 'GlobalStockSectorBreakdown_Assets' + (hasMultiple ? `_${id}` : '');

        table.setColumn(colStrType);
        table.setColumn(assetStr);
        table.setColumn(notClassifiedStr);

        for (let i = 0; i < GlobalStockSectorBreakdown.length; i++) {
            const asset = GlobalStockSectorBreakdown[i],
                colStrAsset = `GlobalStockSectorBreakdown_${asset.SalePosition}` +
                (hasMultiple ? `_${id}` : '');

            table.setColumn(colStrAsset);

            // Populate NotClassified for all assets.
            table.setCell(assetStr, i, asset.SalePosition);
            table.setCell(notClassifiedStr, i, asset.NotClassified);

            for (let j = 0; j < asset.BreakdownValues.length; j++) {
                table.setCell(
                    colStrAsset,
                    j,
                    asset.BreakdownValues[j].Value
                );

                table.setCell(
                    colStrType,
                    j,
                    asset.BreakdownValues[j].Type
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


export default GlobalStockSectorBreakdownConverter;
