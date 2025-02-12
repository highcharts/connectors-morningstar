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


export class GlobalStockSectorBreakdownConverter extends SecurityCompareConverter {


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

        // Add global stock sector breakdown to table
        for (const security of json) {
            const GlobalStockSectorBreakdown =
                security.Portfolios[0].GlobalStockSectorBreakdown,
                id = security.Id,
                isin = security.Isin,
                colStrType = `GlobalStockSectorBreakdown_Type_${id}`;

            ids.push(id);
            isins.push(isin);

            table.setColumn(colStrType);

            for (let i = 0; i < GlobalStockSectorBreakdown.length; i++) {
                const asset = GlobalStockSectorBreakdown[i],
                    colStrAsset = `GlobalStockSectorBreakdown_${asset.SalePosition}_${id}`;

                table.setColumn(colStrAsset);

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
        metadata.ids = ids;
        metadata.isins = isins;

    }

}


/* *
 *
 *  Default Export
 *
 * */


export default GlobalStockSectorBreakdownConverter;
