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
 *  - Jedrzej Ruta
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


export class TrailingPerformanceConverter extends MorningstarConverter {


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
            columnStrPostfix = hasMultiple ? `_${id}` : '';

        const trailingPerformance = security.TrailingPerformance;

        for (let i = 0, iEnd = trailingPerformance.length; i < iEnd; i++) {
            const trailingPerformanceReturn = trailingPerformance[i].Return;
            const columnStrPrefix =
                `${trailingPerformance[i].ReturnType}_${trailingPerformance[i].Type}_`,
                timePeriodColumnStr = columnStrPrefix + 'TimePeriod' + columnStrPostfix,
                dateColumnStr = columnStrPrefix + 'Date' + columnStrPostfix,
                valueColumnStr = columnStrPrefix + 'Value' + columnStrPostfix;

            table.setColumn(timePeriodColumnStr);
            table.setColumn(dateColumnStr);
            table.setColumn(valueColumnStr);

            for (let j = 0, iEnd = trailingPerformanceReturn.length; j < iEnd; ++j) {
                table.setCell(
                    timePeriodColumnStr,
                    j,
                    trailingPerformanceReturn[j].TimePeriod
                );
                table.setCell(
                    dateColumnStr,
                    j,
                    trailingPerformanceReturn[j].Date
                );
                table.setCell(
                    valueColumnStr,
                    j,
                    trailingPerformanceReturn[j].Value
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


export default TrailingPerformanceConverter;
