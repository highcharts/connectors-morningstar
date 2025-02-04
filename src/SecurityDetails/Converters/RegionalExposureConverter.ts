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
        table.setColumn('RegionalExposure_Type');

        // Add regional exposure to table

        if (json.length) {

            // Update table

            const securityDetails = json[0];
            const regionalExposure = securityDetails.Portfolios[0].RegionalExposure;

            for (let i = 0; i < regionalExposure.length; i++) {
                const asset = regionalExposure[i];

                table.setColumn(`RegionalExposure_${asset.SalePosition}_${asset.NotClassified}`);

                for (let j = 0; j < asset.BreakdownValues.length; j++) {
                    table.setCell(
                        `RegionalExposure_${asset.SalePosition}_${asset.NotClassified}`,
                        j,
                        asset.BreakdownValues[j].Value
                    );

                    table.setCell(
                        'RegionalExposure_Type',
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


export default RegionalExposureConverter;
