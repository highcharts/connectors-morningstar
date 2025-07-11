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


export class CountryExposureConverter extends MorningstarConverter {


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
            countryExposure = security.Portfolios[0].CountryExposure,
            notClassifiedStr = 'NotClassified' + (hasMultiple ? `_${id}` : ''),
            countryExpTypeStr = 'Type' + (hasMultiple ? `_${id}` : '');

        table.setColumn(countryExpTypeStr);
        table.setColumn(notClassifiedStr);

        for (let i = 0; i < countryExposure.length; i++) {
            const asset = countryExposure[i],
                colStr =
                    `${asset.Type}_${asset.SalePosition}` +
                    (hasMultiple ? `_${id}` : '');

            table.setColumn(colStr);

            // Populate NotClassified for all assets.
            table.setCell(notClassifiedStr, i, asset.NotClassified);

            for (let j = 0; j < asset.BreakdownValues.length; j++) {
                table.setCell(
                    countryExpTypeStr,
                    j,
                    asset.BreakdownValues[j].Type
                );
                table.setCell(
                    colStr,
                    j,
                    asset.BreakdownValues[j].Value
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


export default CountryExposureConverter;
