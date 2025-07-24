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
            hasMultiple = options.hasMultiple,
            id = security.Id,
            columnStrPostfix = hasMultiple ? `_${id}` : '',
            trailingPerformance = security.TrailingPerformance || [];

        for (let i = 0, iEnd = trailingPerformance.length; i < iEnd; i++) {
            const { Return, ReturnType, Type } = trailingPerformance[i],
                columnStrPrefix = `${ReturnType}_${Type}_`,
                timePeriodColumnStr = columnStrPrefix + 'TimePeriod' + columnStrPostfix,
                dateColumnStr = columnStrPrefix + 'Date' + columnStrPostfix,
                valueColumnStr = columnStrPrefix + 'Value' + columnStrPostfix;

            for (let j = 0, iEnd = Return.length; j < iEnd; ++j) {
                const { TimePeriod, Date, Value } = Return[j];

                table.setCell(timePeriodColumnStr, j, TimePeriod);
                table.setCell(dateColumnStr, j, Date);
                table.setCell(valueColumnStr, j, Value);
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
