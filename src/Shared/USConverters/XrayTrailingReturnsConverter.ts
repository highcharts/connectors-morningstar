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

import MorningstarConverter from '../MorningstarConverter';
import type { XRayUSConverterOptions } from '../../XRayUS/XRayUSOptions';

/* *
 *
 *  Class
 *
 * */


export class XrayTrailingReturnsConverter extends MorningstarConverter {


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
            userOptions = {
                ...this.options,
                ...options
            },
            portfolioPerformance = userOptions.json,
            TrailingReturns = portfolioPerformance.Returns.TrailingReturns,
            portfolioName = portfolioPerformance.PortfolioName,
            columnSuffix = hasMultiple ? `_${portfolioName}` : '';

        const trailingReturnsData = TrailingReturns.Portfolio.TimePeriod;
        const benchmarkData = TrailingReturns.Benchmark?.TimePeriod;

        for (let i = 0; i < trailingReturnsData.length; i++) {
            const { Id, Value: portfolioValue } = trailingReturnsData[i];
            const idColumn = 'Id';
            const portfolioValueColumn = 'Value';

            table.setCell(`${idColumn}${columnSuffix}`, i, Id);
            table.setCell(`${portfolioValueColumn}${columnSuffix}`, i, portfolioValue ?? null);

            if (options.requestSettings?.includeGrossNetReturns) {
                const { GrossValue: porfolioGrossValue } = trailingReturnsData[i];
                const portfolioGrossValueColumn = 'GrossValue';

                table.setCell(`${portfolioGrossValueColumn}${columnSuffix}`, i, porfolioGrossValue ?? null);
            }


            if (benchmarkData?.length > i) {
                const { Value: benchmarkValue } = benchmarkData[i];
                const benchmarkValueColumn = 'Value_Benchmark';

                table.setCell(`${benchmarkValueColumn}${columnSuffix}`, i, benchmarkValue ?? null);
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default XrayTrailingReturnsConverter;
