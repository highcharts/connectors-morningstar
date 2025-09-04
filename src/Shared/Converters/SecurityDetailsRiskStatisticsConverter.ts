/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
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
import SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';

/* *
 *
 *  Class
 *
 * */


export class SecurityDetailsRiskStatisticsConverter extends MorningstarConverter {


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
     *  Properties
     *
     * */


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
            riskStatistics = security.RiskStatistics;

        type riskStatisticsResponseItem =
            SecurityDetailsJSON.OccurrenceRiskStatisticsResponse |
            SecurityDetailsJSON.GenericRiskStatisticsResponse;

        if (riskStatistics) {
            for (const RiskStatisticsItem of riskStatistics) {
                const { ReturnType, Type } = RiskStatisticsItem,
                    columnPrefix = `${ReturnType}_${Type}`;

                for (const key of Object.keys(RiskStatisticsItem) as Array<keyof typeof RiskStatisticsItem>) {
                    let rowIndex = 0;

                    if (Array.isArray(RiskStatisticsItem[key])) {
                        for (const item of RiskStatisticsItem[key] as Array<riskStatisticsResponseItem>) {
                            const columnName = `${columnPrefix}_${key}${columnStrPostfix}`;

                            table.setCell(
                                'TimePeriod' + columnStrPostfix,
                                rowIndex,
                                item.TimePeriod
                            );

                            table.setCell(
                                columnName,
                                rowIndex,
                                ('Count' in item) ? item.Count : item.Value
                            );

                            ++rowIndex;
                        }
                    }
                }
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default SecurityDetailsRiskStatisticsConverter;
