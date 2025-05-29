/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */

import MorningstarConverter from '../MorningstarConverter';
import { XRayConverterOptions, XRayMetadata } from '../../XRay';

/* *
 *
 *  Class
 *
 * */


export class RiskStatisticsConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: XRayConverterOptions
    ) {
        super(options);

        this.metadata = {
            columns: {}
        };
    }


    /* *
     *
     *  Properties
     *
     * */

    public readonly metadata: XRayMetadata;

    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: XRayConverterOptions,
        benchmarkId: string = 'XRay'
    ): void {
        const table = this.table,
            json = options.json.riskStatistics;

        if (json?.sharpeRatio) {
            for (const sharpeRatio of json.sharpeRatio) {
                const columnName = `${benchmarkId}_SharpeRatio_${sharpeRatio.frequency}_${sharpeRatio.timePeriod}`;
                table.setCell(columnName, 0, sharpeRatio.value);
            }
        }

        if (json?.standardDeviation) {
            for (const standardDeviation of json.standardDeviation) {
                const columnName = `${benchmarkId}_StandardDeviation_${standardDeviation.frequency}_${standardDeviation.timePeriod}`;
                table.setCell(columnName, 0, standardDeviation.value);
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default RiskStatisticsConverter;
