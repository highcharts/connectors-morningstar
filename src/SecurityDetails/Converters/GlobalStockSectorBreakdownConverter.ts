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
        table.setColumn('GlobalStockSectorBreakdown_Type');

        // Add global stock sector breakdown to table

        if (json.length) {

            // Update table

            const securityDetails = json[0];
            const GlobalStockSectorBreakdown =
                securityDetails.Portfolios[0].GlobalStockSectorBreakdown;

            for (let i = 0; i < GlobalStockSectorBreakdown.length; i++) {
                const asset = GlobalStockSectorBreakdown[i];

                table.setColumn(`GlobalStockSectorBreakdown_${asset.SalePosition}_${asset.NotClassified}`);

                for (let j = 0; j < asset.BreakdownValues.length; j++) {
                    table.setCell(
                        `GlobalStockSectorBreakdown_${asset.SalePosition}_${asset.NotClassified}`,
                        j,
                        asset.BreakdownValues[j].Value
                    );

                    table.setCell(
                        'GlobalStockSectorBreakdown_Type',
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


export default GlobalStockSectorBreakdownConverter;
