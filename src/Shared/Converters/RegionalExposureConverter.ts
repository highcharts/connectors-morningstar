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
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';

/* *
 *
 *  Class
 *
 * */


export class RegionalExposureConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: SecurityDetailsConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: SecurityDetailsConverterOptions
    ): void {
        const table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            security = userOptions.json as SecurityDetailsJSON.SecurityDetailsResponse,
            hasMultiple = options.hasMultiple;


        // Create table
        const id = security.Id,
            regionalExposure = security.Portfolios[0].RegionalExposure,
            colStrType = 'RegionalExposure_Type' + (hasMultiple ? `_${id}` : ''),
            notClassifiedStr = 'RegionalExposure_NotClassified' + (hasMultiple ? `_${id}` : ''),
            assetStr = 'RegionalExposure_Assets' + (hasMultiple ? `_${id}` : '');

        table.setColumn(colStrType);
        table.setColumn(assetStr);
        table.setColumn(notClassifiedStr);

        for (let i = 0; i < regionalExposure.length; i++) {
            const asset = regionalExposure[i];
            const colStrAsset =
                `RegionalExposure_${asset.SalePosition}` + (hasMultiple ? `_${id}` : '');
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
}


/* *
 *
 *  Default Export
 *
 * */


export default RegionalExposureConverter;
