/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
    SecurityDetailsMetadata,
    SecurityCompareMetadata
} from '../SecurityDetailsOptions';
import SecurityDetailsJSON from '../SecurityDetailsJSON';
import SecurityDetailsConverter from '../SecurityDetailsConverter';

/* *
 *
 *  Class
 *
 * */


export class GlobalStockSectorBreakdownConverter extends SecurityDetailsConverter {


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
            columns: {}
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
            ids = [],
            isins = [],
            table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            json = userOptions.json;
        let isCompare = false;

        // Validate JSON

        if (!SecurityDetailsJSON.isSecurityDetailsResponse(json)) {
            throw new Error('Invalid data');
        }

        // Prepare table

        table.deleteColumns();

        if (!json.length) {
            return;
        }

        if (json.length > 1) {
            isCompare = true;
        }

        // Add global stock sector breakdown to table
        for (const security of json) {
            const GlobalStockSectorBreakdown =
                security.Portfolios[0].GlobalStockSectorBreakdown,
                id = security.Id,
                isin = security.Isin,
                colStrType = 'GlobalStockSectorBreakdown_Type' + (isCompare? `_${id}` : ''),
                notClassifiedStr = 'GlobalStockSectorBreakdown_NotClassified' + (isCompare? `_${id}` : ''),
                assetStr = 'GlobalStockSectorBreakdown_Assets' + (isCompare? `_${id}` : '');

            ids.push(id);
            isins.push(isin);

            table.setColumn(colStrType);
            table.setColumn(assetStr);
            table.setColumn(notClassifiedStr);

            for (let i = 0; i < GlobalStockSectorBreakdown.length; i++) {
                const asset = GlobalStockSectorBreakdown[i],
                    colStrAsset = `GlobalStockSectorBreakdown_${asset.SalePosition}` + (isCompare? `_${id}` : '');

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
        }

        // Update meta data
        if (isCompare){
            (metadata as SecurityCompareMetadata).ids = ids;
            (metadata as SecurityCompareMetadata).isins = isins;
        } else {
            metadata.id = ids[0];
            metadata.isin = isins[0];
        }
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default GlobalStockSectorBreakdownConverter;
