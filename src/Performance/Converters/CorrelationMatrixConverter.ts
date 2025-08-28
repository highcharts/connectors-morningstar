/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
            correlationMatrix = options.json.Risks.CorrelationMatrix;

        if (correlationMatrix.length) {
            for (const correlationMatrixItem of correlationMatrix) {
                const { TrailingTimePeriod, Correlations } = correlationMatrixItem;

                for (const key of Correlations) {
                    const { CorrelatedItemKey, SecurityId } = key;
                    const name = SecurityId + `_${TrailingTimePeriod}` + columnSuffix;

                    for (let i = 0; i < CorrelatedItemKey.length; i++) {
                        table.setCell(name, i, CorrelatedItemKey[i].Value);
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
