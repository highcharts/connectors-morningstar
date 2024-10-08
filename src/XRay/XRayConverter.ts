/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import MorningstarConverter from '../Shared/MorningstarConverter';
import { XRayConverterOptions } from './XRayOptions';
import XRayJSON from './XRayJSON';


/* *
 *
 *  Classes
 *
 * */


export class XRayConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: XRayConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: XRayConverterOptions
    ): void {
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;
        const xrays: Array<XRayJSON.XRayResponse> = [];

        // Validate JSON

        if (XRayJSON.isResponse(json)) {
            xrays.push(...json.XRay);
        } else if (XRayJSON.isXRayResponse(json)) {
            xrays.push(json);
        } else {
            throw new Error('Invalid data');
        }

        // Reset table

        table.deleteColumns();

        for (const xray of xrays) {
            const benchmarkId = xray.benchmarkId || 'XRay';

            if (xray.benchmark) {
                this.parseBenchmark(benchmarkId, xray.benchmark);
            }
            if (xray.historicalPerformanceSeries) {
                this.parseHistoricalPerformance(benchmarkId, xray.historicalPerformanceSeries);
            }
            if (xray.trailingPerformance) {
                this.parseTrailingPerformance(benchmarkId, xray.trailingPerformance);
            }
            if (xray.breakdowns) {
                this.parseBreakdowns(benchmarkId, xray.breakdowns);
            }
        }

    }

    protected parseBenchmark (
        benchmarkId: string,
        json: Array<XRayJSON.Benchmark>
    ): void {
        for (const benchmark of json) {
            if (benchmark.breakdowns) {
                this.parseBreakdowns(benchmarkId, benchmark.breakdowns);
            }
            if (benchmark.historicalPerformanceSeries) {
                this.parseHistoricalPerformance(benchmarkId, benchmark.historicalPerformanceSeries);
            }
            if (benchmark.trailingPerformance) {
                this.parseTrailingPerformance(benchmarkId, benchmark.trailingPerformance);
            }
        }
    }

    protected parseBreakdowns (
        benchmarkId: string,
        json: XRayJSON.Breakdowns
    ): void {
        const table = this.table;

        for (const asset of json.assetAllocation) {
            const rowId = `${benchmarkId}_${asset.type}_${asset.salePosition}`;
            const values = asset.values;

            for (let i = 1; i < 100; ++i) {
                table.setCell(rowId, i - 1, values[i]);
            }
        }

        if (json.regionalExposure) {
            for (const exposure of json.regionalExposure) {
                const rowId = `${benchmarkId}_RegionalExposure_${exposure.salePosition}`;
                const values = exposure.values;

                for (let i = 1; i < 100; ++i) {
                    table.setCell(rowId, i - 1, values[i] || 0);
                }
            }
        }

    }

    protected parseHistoricalPerformance (
        benchmarkId: string,
        json: Array<XRayJSON.HistoricalPerformance>
    ): void {
        const table = this.table;

        for (const historicalPerformance of json) {
            const periodRowId = `${benchmarkId}_${historicalPerformance.returnType}_TimePeriod`;
            const valueRowId = `${benchmarkId}_${historicalPerformance.returnType}_Value`;

            let rowIndex = 0;

            for (const historicalReturn of historicalPerformance.returns) {
                table.setCell(periodRowId, rowIndex, historicalReturn[0]);
                table.setCell(valueRowId, rowIndex, historicalReturn[1]);
                ++rowIndex;
            }
        }
    }

    protected parseTrailingPerformance (
        benchmarkId: string,
        json: Array<XRayJSON.TrailingPerformance>
    ): void {
        const table = this.table;

        for (const trailingPerformance of json) {
            const periodRowId = `${benchmarkId}_${trailingPerformance.type}_TimePeriod`;
            const valueRowId = `${benchmarkId}_${trailingPerformance.type}_Value`;

            let rowIndex = 0;

            for (const trailingReturn of trailingPerformance.returns) {
                table.setCell(periodRowId, rowIndex, trailingReturn.timePeriod);
                table.setCell(valueRowId, rowIndex, trailingReturn.value);
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


export default XRayConverter;
