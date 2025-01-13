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
        const metadata = this.metadata;
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!SecurityDetailsJSON.isSecurityDetailsResponse(json)) {
            throw new Error('Invalid data');
        }

        // Prepare table

        table.deleteColumns();
        table.setColumn('AssetAllocations_Type');

        // Add asset allocations to table

        if (json.length) {

            // Update table

            const securityDetails = json[0];
            const assetAllocations = securityDetails.Portfolios[0].AssetAllocations;

            table.setColumn('AssetAllocations_Type');

            for (let i = 0; i < assetAllocations.length; i++) {
                const asset = assetAllocations[i];

                table.setColumn(`AssetAllocations_${asset.Type}_${asset.SalePosition}`);

                for (let j = 0; j < asset.BreakdownValues.length; j++) {
                    table.setCell(
                        `AssetAllocations_${asset.Type}_${asset.SalePosition}`,
                        j,
                        asset.BreakdownValues[j].Value
                    );

                    table.setCell(
                        'AssetAllocations_Type',
                        j,
                        asset.BreakdownValues[j].Type
                    );
                }
            }

            // Update meta data

            metadata.id = securityDetails.Id;
            metadata.isin = securityDetails.Isin;
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default AssetAllocationsConverter;
