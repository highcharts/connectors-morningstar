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
    SecurityCompareMetadata
} from '../../SecurityDetails/SecurityDetailsOptions';
import SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import SecurityCompareConverter from '../SecurityCompareConverter';

/* *
 *
 *  Class
 *
 * */


export class CountryExposureConverter extends SecurityCompareConverter {


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


    public readonly metadata: SecurityCompareMetadata;


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

        // Validate JSON

        if (!SecurityDetailsJSON.isSecurityCompareResponse(json)) {
            throw new Error('Invalid data');
        }

        // Prepare table

        table.deleteColumns();

        if (!json.length) {
            return;
        }

        // Add country exposure to table

        for (const security of json) {

            // Update table

            const id = security.Id,
                isin = security.Isin,
                countryExposure = security.Portfolios[0].CountryExposure,
                assetStr = `CountryExposure_Assets_${id}`,
                notClassifiedStr = `CountryExposure_NotClassified_${id}`,
                countryExpTypeStr = 'CountryExposure_Type_' + id;
                

            ids.push(id);
            isins.push(isin);

            table.setColumn(assetStr);
            table.setColumn(notClassifiedStr);
            table.setColumn(countryExpTypeStr);

            for (let i = 0; i < countryExposure.length; i++) {
                const asset = countryExposure[i],
                    colStr = 
                        `CountryExposure_${asset.Type}_${asset.SalePosition}_` +
                        id;
                    
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

        metadata.ids = ids;
        metadata.isins = isins;

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default CountryExposureConverter;
