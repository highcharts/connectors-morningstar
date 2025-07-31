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


export class CreditQualityConverter extends MorningstarConverter {


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
            portfolio =
                options.json.Analysis.FixedIncomeAnalysis.CreditQuality.Portfolio,
            benchmark = options.json.Analysis.FixedIncomeAnalysis.CreditQuality.Benchmark;

        if (portfolio) {
            let rowIndex = 0;

            for (const [key, value] of Object.entries(portfolio)) {
                table.setCell('Type', rowIndex, key);
                table.setCell('Value_Portfolio' + columnSuffix, rowIndex, value);

                ++rowIndex;
            }
        }

        if (benchmark) {
            let rowIndex = 0;

            for (const [key, value] of Object.entries(benchmark)) {
                table.setCell('Type', rowIndex, key);
                table.setCell('Value_Benchmark' + columnSuffix, rowIndex, value);

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


export default CreditQualityConverter;
