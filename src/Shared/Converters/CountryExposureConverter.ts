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


import type {
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import type SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
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
            hasMultiple = options.hasMultiple,
            id = security.Id,
            columnStrPostfix = hasMultiple ? `_${id}` : '',
            countryExposure = security.Portfolios[0].CountryExposure || [],
            notClassifiedStr = 'NotClassified' + columnStrPostfix,
            countryExpTypeStr = 'Type' + columnStrPostfix;

        table.setColumn(countryExpTypeStr);
        table.setColumn(notClassifiedStr);

        for (let i = 0; i < countryExposure.length; i++) {
            const { SalePosition, BreakdownValues, NotClassified, Type } = countryExposure[i],
                colStr = `${Type}_${SalePosition}` + columnStrPostfix;

            table.setColumn(colStr);

            // Populate NotClassified for all assets.
            table.setCell(notClassifiedStr, i, NotClassified);

            for (let j = 0; j < BreakdownValues.length; j++) {
                const { Type, Value } = BreakdownValues[j];

                table.setCell(countryExpTypeStr, j, Type);
                table.setCell(colStr, j, Value);
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
