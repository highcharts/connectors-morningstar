/* *
 *
 *  (c) 2009-2026 Highsoft AS
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
import { DataTableValue } from '@highcharts/dashboards/es-modules/Data/DataTableOptions';

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

        this.metadata = {};
    }

    public readonly metadata: Record<string, DataTableValue>;


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
            metadata = this.metadata,
            columnSuffix = hasMultiple ? `_${options.json.PortfolioName}` : '',
            fundStatistics = options.json.Statistics.FundStatistics,
            portfolio = fundStatistics.Portfolio,
            securityBreakdown = fundStatistics.SecurityBreakdown;

        if (portfolio) {
            let rowIndex = 0;
            for (const key of Object.keys(portfolio) as Array<keyof typeof portfolio>) {

                table.setCell('Type', rowIndex, key);
                table.setCell('Value' + columnSuffix, rowIndex, portfolio[key]);

                ++rowIndex;
            }
            metadata.PortfolioAnalyzed = fundStatistics.PortfolioAnalyzed;
        }

        if (securityBreakdown) {
            for (const security of securityBreakdown) {
                const { Analyzed, FundStatisticsItem, NotAnalyzed, SecurityId } = security;
                let rowIndex = 0;

                // Set empty columns for all securities
                table.setColumn('Value_' + SecurityId);

                // Set metadata props for each security
                metadata[`Analyzed_${SecurityId}`] = Analyzed;
                metadata[`NotAnalyzed_${SecurityId}`] = NotAnalyzed;

                for (const key of Object.keys(FundStatisticsItem) as Array<keyof typeof FundStatisticsItem>) {
                    table.setCell('Type', rowIndex, key);
                    table.setCell('Value_' + SecurityId, rowIndex, FundStatisticsItem[key]);

                    ++rowIndex;
                }
            }
        }

        table.metadata = this.metadata;

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default FundStatisticsConverter;
