/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
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


export class RollingReturnsConverter extends MorningstarConverter {


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
            rollingReturn = options.json.Returns.RollingReturns.RollingReturn;

        if (rollingReturn.length) {
            rollingReturn.forEach(rollingReturn => {
                const { Portfolio } = rollingReturn;

                Portfolio.Data.forEach((data, i) => {
                    const { Id, Value } = data;

                    table.setCell('Id' + columnSuffix, i, Id);
                    table.setCell('Value' + columnSuffix, i, Value);
                });

                Portfolio.Details.forEach((detail, i) => {
                    const { AnnualizedTotalReturn, CumulativeTotalReturn, Id } = detail;

                    table.setCell(
                        'Details_Id' + columnSuffix,
                        i,
                        Id
                    );
                    table.setCell(
                        'Details_AnnualizedTotalReturn' + columnSuffix,
                        i,
                        AnnualizedTotalReturn
                    );
                    table.setCell(
                        'Details_CumulativeTotalReturn' + columnSuffix,
                        i,
                        CumulativeTotalReturn
                    );
                });
            });
        }

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default RollingReturnsConverter;
