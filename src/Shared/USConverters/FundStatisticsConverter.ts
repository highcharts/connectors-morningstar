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

import MorningstarConverter from '../MorningstarConverter';
import type { XRayUSConverterOptions } from '../../XRayUS/XRayUSOptions';

/* *
 *
 *  Class
 *
 * */


export class FundStatisticsConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: XRayUSConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: XRayUSConverterOptions,
        hasMultiple?: boolean
    ): void {
        const table = this.table,
            columnSuffix = hasMultiple ? `_${options.json.PortfolioName}` : '',
            fundStatistics = options.json.Statistics.FundStatistics,
            portfolio = fundStatistics.Portfolio,
            securityBreakdown = fundStatistics.SecurityBreakdown;

        // TODO:
        // Add dataTable metadata properties Analyzed and NotAnalyzed
        // for portfolio & securityBreakdown with upcoming major Dash release

        if (portfolio) {
            let rowIndex = 0;
            for (const key of Object.keys(portfolio) as Array<keyof typeof portfolio>) {

                table.setCell('Type', rowIndex, key);
                table.setCell('Value' + columnSuffix, rowIndex, portfolio[key]);

                ++rowIndex;
            }
        }

        if (securityBreakdown) {
            for (const security of securityBreakdown) {
                const securityItem = security.FundStatisticsItem;
                let rowIndex = 0;

                for (const key of Object.keys(securityItem) as Array<keyof typeof securityItem>) {
                    table.setCell('Type', rowIndex, key);
                    table.setCell('Value_' + security.SecurityId, rowIndex, securityItem[key]);

                    ++rowIndex;
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


export default FundStatisticsConverter;
