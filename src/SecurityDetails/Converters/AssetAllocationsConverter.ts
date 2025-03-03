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
    SecurityCompareMetadata,
    SecurityDetailsMetadata
} from '../SecurityDetailsOptions';
import SecurityDetailsJSON from '../SecurityDetailsJSON';
import SecurityDetailsConverter from '../SecurityDetailsConverter';

/* *
 *
 *  Class
 *
 * */


export class AssetAllocationsConverter extends SecurityDetailsConverter {


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
        if (json.length > 1){
            isCompare = true;
        }
        // Create tables
        for (const security of json) {
            const id = security.Id,
                isin = security.Isin,
                assetAllocations = security.Portfolios[0].AssetAllocations,
                assetAllocationsTypeStr =
                'AssetAllocations_Type' + (isCompare? `_${id}` : '');

            table.setColumn(assetAllocationsTypeStr);

            ids.push(id);
            isins.push(isin);

            for (let i = 0; i < assetAllocations.length; i++) {
                const asset = assetAllocations[i],
                    assetAllocationsAssetStr =
                    `AssetAllocations_${asset.Type}_${asset.SalePosition}` + (isCompare? `_${id}` : '');
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


export default AssetAllocationsConverter;
