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


export class RegionalExposureConverter extends SecurityDetailsConverter {


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


    public readonly metadata: SecurityDetailsMetadata | SecurityCompareMetadata;


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

        isCompare = SecurityDetailsJSON.isSecurityCompareResponse(json);

        // Add regional exposure to table
        for (const security of json) {

            // Update table
            const id = security.Id,
                isin = security.Isin,
                regionalExposure = security.Portfolios[0].RegionalExposure,
                colStrType = 'RegionalExposure_Type' + (isCompare ? `_${id}` : ''),
                notClassifiedStr = 'RegionalExposure_NotClassified' + (isCompare ? `_${id}` : ''),
                assetStr = 'RegionalExposure_Assets' + (isCompare ? `_${id}` : '');

            ids.push(id);
            isins.push(isin);

            table.setColumn(colStrType);
            table.setColumn(assetStr);
            table.setColumn(notClassifiedStr);

            for (let i = 0; i < regionalExposure.length; i++) {
                const asset = regionalExposure[i];
                const colStrAsset =
                    `RegionalExposure_${asset.SalePosition}` + (isCompare ? `_${id}` : '');
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
            (metadata as SecurityDetailsMetadata).id = ids[0];
            (metadata as SecurityDetailsMetadata).isin = isins[0];
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default RegionalExposureConverter;
