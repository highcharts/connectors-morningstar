/* *
 *
 *  (c) 2009-2026 Highsoft AS
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
            rollingReturn = options.json.Returns?.RollingReturns?.RollingReturn;

        if (rollingReturn?.length) {
            rollingReturn.forEach(rollingReturn => {
                const { Portfolio, RollingPeriod } = rollingReturn;

                const period = `Period_${RollingPeriod}_`;

                Portfolio.Data.forEach((data, i) => {
                    const { Id, Value } = data;

                    table.setCell(period + 'Id' + columnSuffix, i, Id);
                    table.setCell(period + 'Value' + columnSuffix, i, Value);
                });

                Portfolio.Details.forEach((detail, i) => {
                    const { AnnualizedTotalReturn, CumulativeTotalReturn, Id, Period } = detail;

                    table.setCell(
                        period + 'Details_Id' + columnSuffix,
                        i,
                        Id
                    );
                    table.setCell(
                        period + 'Details_AnnualizedTotalReturn' + columnSuffix,
                        i,
                        AnnualizedTotalReturn
                    );
                    table.setCell(
                        period + 'Details_CumulativeTotalReturn' + columnSuffix,
                        i,
                        CumulativeTotalReturn
                    );
                    table.setCell(
                        period + 'Details_PeriodDates' + columnSuffix,
                        i,
                        Period
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
