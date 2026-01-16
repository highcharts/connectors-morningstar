/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Mateusz Bernacik
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */

import MorningstarConverter from '../../Shared/MorningstarConverter';
import type { PerformanceConverterOptions } from '../PerformanceOptions';

/* *
 *
 *  Class
 *
 * */


export class MPTStatisticsConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: PerformanceConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: PerformanceConverterOptions,
        hasMultiple?: boolean
    ): void {
        const table = this.table,
            columnSuffix = hasMultiple ? `_${options.json.PortfolioName}` : '',
            mptStatistics = options.json.Risks?.MPTStatistics;

        if (mptStatistics) {
            let rowIndex = 0;

            for (const breakdownItem of mptStatistics) {
                const portfolio = breakdownItem.Portfolio;

                table.setCell('TrailingTimePeriod', rowIndex, breakdownItem.TrailingTimePeriod);

                for (const key of Object.keys(portfolio) as Array<keyof typeof portfolio>) {
                    const columnName = key + columnSuffix;

                    table.setCell(columnName, rowIndex, portfolio[key]);
                }
                ++rowIndex;
            }
        }

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default MPTStatisticsConverter;
