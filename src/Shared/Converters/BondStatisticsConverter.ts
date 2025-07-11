/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
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


export class BondStatisticsConverter extends MorningstarConverter {


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

        // Update table
        const id = security.Id,
            bondStatistics = security.Portfolios[0].BondStatistics;

        if (!bondStatistics) {
            return;
        }

        type BondStatisticsKey = keyof SecurityDetailsJSON.BondStatisticsType;
        for (const key of Object.keys(bondStatistics) as BondStatisticsKey[]) {
            const colName = key + (hasMultiple ? `_${id}` : '');
            table.setColumn(colName);
            table.setCell(colName, 0, bondStatistics[key]);
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default BondStatisticsConverter;

