/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
    SecurityCompareConverterOptions,
    SecurityCompareMetadata
} from '../SecurityCompareOptions';
import SecurityCompareJSON from '../SecurityCompareJSON';
import SecurityCompareConverter from '../SecurityCompareConverter';

/* *
 *
 *  Class
 *
 * */


export class AssetAllocationsConverter extends SecurityCompareConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: SecurityCompareConverterOptions
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


    public readonly metadata: SecurityCompareMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: SecurityCompareConverterOptions
    ): void {
        const metadata = this.metadata;
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON
        if (!SecurityCompareJSON.isSecurityCompareResponse(json)) {
            throw new Error('Invalid data');
        }

        // Prepare table

        table.deleteColumns();

        // Add asset allocations to table
        if (json.length) {
            const ids = [],
                isins = [];
            // Create tables
            for (let security = 0; security < json.length; security++) {
                const securityCompare = json[security],
                    id = securityCompare.Id,
                    isin = securityCompare.Isin,
                    assetAllocations = securityCompare.Portfolios[0].AssetAllocations,
                    assetAllocationsTypeStr =
                    `AssetAllocations_Type_${id}`;
                table.setColumn(assetAllocationsTypeStr);

                ids.push(id);
                isins.push(isin);
                for (let i = 0; i < assetAllocations.length; i++) {
                    const asset = assetAllocations[i],
                        assetAllocationsAssetStr =
                        `AssetAllocations_${asset.Type}_${asset.SalePosition}_${id}`;
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

            metadata.ids = ids;
            metadata.isins = isins;
        }

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default AssetAllocationsConverter;
