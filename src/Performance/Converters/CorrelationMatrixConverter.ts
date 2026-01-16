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


export class CorrelationMatrixConverter extends MorningstarConverter {


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
            correlationMatrix = options.json.Risks?.CorrelationMatrix;

        if (correlationMatrix) {
            for (const correlationMatrixItem of correlationMatrix) {
                const { TrailingTimePeriod, Correlations } = correlationMatrixItem;

                let rowIndex = 0;

                for (const key of Correlations) {
                    const { CorrelatedItemKey, SecurityId, Id } = key;
                    const name = TrailingTimePeriod + `_${SecurityId}` + columnSuffix;

                    for (let i = 0; i < CorrelatedItemKey.length; i++) {
                        const value = CorrelatedItemKey[i].Value;
                        table.setCell(name, i, value);

                        if (i <= Id - 1) {
                            table.setCell('x' + columnSuffix, rowIndex, i);
                            table.setCell('y' + columnSuffix, rowIndex, Id - 1);
                            table.setCell(TrailingTimePeriod + columnSuffix, rowIndex, value);

                            rowIndex++;
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


export default CorrelationMatrixConverter;
