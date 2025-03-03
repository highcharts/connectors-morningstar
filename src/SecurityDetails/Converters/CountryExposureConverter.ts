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


export class CountryExposureConverter extends SecurityDetailsConverter {


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

        // Add country exposure to table

        for (const security of json) {

            // Update table

            const id = security.Id,
                isin = security.Isin,
                countryExposure = security.Portfolios[0].CountryExposure,
                assetStr = 'CountryExposure_Assets' + (isCompare? `_${id}` : ''),
                notClassifiedStr = 'CountryExposure_NotClassified' + (isCompare? `_${id}` : ''),
                countryExpTypeStr = 'CountryExposure_Type' + (isCompare? `_${id}` : '');
                

            ids.push(id);
            isins.push(isin);

            table.setColumn(assetStr);
            table.setColumn(notClassifiedStr);
            table.setColumn(countryExpTypeStr);

            for (let i = 0; i < countryExposure.length; i++) {
                const asset = countryExposure[i],
                    colStr = 
                        `CountryExposure_${asset.Type}_${asset.SalePosition}` +
                        (isCompare? `_${id}` : '');
                    
                table.setColumn(colStr);

                // Populate NotClassified for all assets.
                table.setCell(assetStr, i, `${asset.Type}_${asset.SalePosition}`);
                table.setCell(notClassifiedStr, i, asset.NotClassified);

                for (let j = 0; j < asset.BreakdownValues.length; j++) {
                    table.setCell(
                        colStr,
                        j,
                        asset.BreakdownValues[j].Value
                    );

                    table.setCell(
                        countryExpTypeStr,
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


export default CountryExposureConverter;
