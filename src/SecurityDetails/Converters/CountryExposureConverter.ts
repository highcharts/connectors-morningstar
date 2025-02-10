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
        table.setColumn('CountryExposure_Type');

        // Add country exposure to table

        if (json.length) {

            // Update table

            const securityDetails = json[0];
            const CountryExposure = securityDetails.Portfolios[0].CountryExposure;

            table.setColumn('CountryExposure_Type');

            for (let i = 0; i < CountryExposure.length; i++) {
                const asset = CountryExposure[i];

                table.setColumn(`CountryExposure_${asset.Type}_${asset.SalePosition}_${asset.NotClassified}`);

                for (let j = 0; j < asset.BreakdownValues.length; j++) {
                    table.setCell(
                        `CountryExposure_${asset.Type}_${asset.SalePosition}_${asset.NotClassified}`,
                        j,
                        asset.BreakdownValues[j].Value
                    );

                    table.setCell(
                        'CountryExposure_Type',
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


export default CountryExposureConverter;
