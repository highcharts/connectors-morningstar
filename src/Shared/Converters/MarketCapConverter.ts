/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
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


export class MarketCapConverter extends MorningstarConverter {


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


        // Update table
        const id = security.Id,
            isin = security.Isin,
            marketCap = security.Portfolios[0].MarketCapitalBreakdown,
            colStrType = 'MarketCap_Type' + (hasMultiple ? `_${id}` : ''),
            notClassifiedStr = 'MarketCap_NotClassified' + (hasMultiple ? `_${id}` : ''),
            assetStr = 'MarketCap_Assets' + (hasMultiple ? `_${id}` : '');

        table.setColumn(colStrType);
        table.setColumn(assetStr);
        table.setColumn(notClassifiedStr);

        for (let i = 0; i < marketCap.length; i++) {
            const asset = marketCap[i];
            const colStrAsset =
                `MarketCap_${asset.SalePosition}` + (hasMultiple ? `_${id}` : '');
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

        // Update meta data
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


export default MarketCapConverter;

