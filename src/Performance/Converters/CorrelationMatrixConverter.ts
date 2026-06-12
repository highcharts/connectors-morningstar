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
                let securityIndex = 0;

                for (const key of Correlations) {
                    const { CorrelatedItemKey, SecurityId, Type } = key;
                    const isPortfolio = Type === 'Portfolio';
                    const name = isPortfolio ?
                        TrailingTimePeriod + '_Portfolio' + columnSuffix :
                        TrailingTimePeriod + `_${SecurityId}` + columnSuffix;

                    let correlationIndex = 0;

                    for (let i = 0; i < CorrelatedItemKey.length; i++) {
                        if (CorrelatedItemKey[i].Type === 'Portfolio') {
                            continue;
                        }
                        const value = CorrelatedItemKey[i].Value;
                        table.setCell(name, correlationIndex, value);

                        // Fill x,y coords and the heatmap value for the lower
                        // triangle cells only, excluding Portfolio
                        if (!isPortfolio && correlationIndex <= securityIndex) {
                            table.setCell('x' + columnSuffix, rowIndex, correlationIndex);
                            table.setCell('y' + columnSuffix, rowIndex, securityIndex);
                            table.setCell(TrailingTimePeriod + columnSuffix, rowIndex, value);

                            rowIndex++;
                        }

                        correlationIndex++;
                    }

                    // Increment index only for securities, not Portfolio
                    if (!isPortfolio) {
                        securityIndex++;
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
