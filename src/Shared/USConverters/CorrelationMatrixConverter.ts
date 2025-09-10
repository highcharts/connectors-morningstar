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


export class CorrelationMatrixConverter extends MorningstarConverter {


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

                        // Map data into heatmap format for correlation matrix
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
