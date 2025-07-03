/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
            if (xray.riskStatistics) {
                this.parseRiskStatistics(benchmarkId, xray.riskStatistics);
            }
            if (xray.underlyHoldings) {
                this.parseUnderlyHoldings(benchmarkId, xray.underlyHoldings);
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

        if (json.assetAllocation) {
            for (const asset of json.assetAllocation) {
                const columnName = `${benchmarkId}_${asset.type}_${asset.salePosition}`;
                table.setColumn(`${columnName}_Categories`);
                table.setColumn(`${columnName}_Values`);
                const values = asset.values;

                const valueIndex = Object.keys(values);

                for (let i = 0; i < valueIndex.length; i++) {
                    table.setCell(`${columnName}_Categories`, i, valueIndex[i]);
                    table.setCell(`${columnName}_Values`, i, values[parseInt(valueIndex[i])]);
                }
            }
        }

        if (json.regionalExposure) {
            for (const exposure of json.regionalExposure) {
                const columnName = `${benchmarkId}_RegionalExposure_${exposure.salePosition}`;
                table.setColumn(`${columnName}_Categories`);
                table.setColumn(`${columnName}_Values`);
                const values = exposure.values;
                const valueIndex = Object.keys(values);

                for (let i = 0; i < valueIndex.length; i++) {
                    table.setCell(`${columnName}_Categories`, i, valueIndex[i]);
                    table.setCell(`${columnName}_Values`, i, values[parseInt(valueIndex[i])]);
                }
            }
        }

        if (json.globalStockSector) {
            for (const sector of json.globalStockSector) {
                const columnName = `${benchmarkId}_GlobalStockSector_${sector.salePosition}`;
                table.setColumn(`${columnName}_Categories`);
                table.setColumn(`${columnName}_Values`);
                const values = sector.values;
                const valueIndex = Object.keys(values);

                for (let i = 0; i < valueIndex.length; i++) {
                    table.setCell(`${columnName}_Categories`, i, valueIndex[i]);
                    table.setCell(`${columnName}_Values`, i, values[parseInt(valueIndex[i])]);
                }
            }
        }

        if (json.styleBox) {
            for (const styleBox of json.styleBox) {
                const columnName = `${benchmarkId}_StyleBox_${styleBox.salePosition}`;
                table.setColumn(`${columnName}_Categories`);
                table.setColumn(`${columnName}_Values`);
                const values = styleBox.values;
                const valueIndex = Object.keys(values);

                for (let i = 0; i < valueIndex.length; i++) {
                    table.setCell(`${columnName}_Categories`, i, valueIndex[i]);
                    table.setCell(`${columnName}_Values`, i, values[parseInt(valueIndex[i])]);
                }
            }
        }

    }

    protected parseRiskStatistics (
        benchmarkId: string,
        json: XRayJSON.RiskStatistics
    ): void {
        const table = this.table;

        if (json.sharpeRatio) {
            for (const sharpeRatio of json.sharpeRatio) {
                const columnName = `${benchmarkId}_SharpeRatio_${sharpeRatio.frequency}_${sharpeRatio.timePeriod}`;
                table.setCell(columnName, 0, sharpeRatio.value);
            }
        }

        if (json.standardDeviation) {
            const timePeriodColumn = `${benchmarkId}_StandardDeviation_TimePeriod`,
                valueColumn = `${benchmarkId}_StandardDeviation_Values`;
            let i = 0;
            for (const standardDeviation of json.standardDeviation) {

                table.setCell(timePeriodColumn, i, `${standardDeviation.timePeriod}`);
                table.setCell(valueColumn, i, standardDeviation.value);
                i++;
            }
        }
    }

    protected parseHistoricalPerformance (
        benchmarkId: string,
        json: Array<XRayJSON.HistoricalPerformance>
    ): void {
        const table = this.table;

        for (const historicalPerformance of json) {
            const periodRowId = `${benchmarkId}_${historicalPerformance.returnType}_${historicalPerformance.timePeriod}`;
            const valueRowId = `${benchmarkId}_${historicalPerformance.returnType}_${historicalPerformance.timePeriod}_Value`;

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

    protected parseUnderlyHoldings (
        benchmarkId: string,
        json: Array<XRayJSON.UnderlyHolding>
    ): void {
        const table = this.table;
        let rowIndex = 0;

        for (const holding of json) {
            for (const key in holding) {
                const columnName = `${benchmarkId}_UnderlyingHoldings_${key}`;
                table.setCell(columnName, rowIndex, holding[key]);
            }
            ++rowIndex;
        }
    }



}


/* *
 *
 *  Default Export
 *
 * */


export default XRayConverter;
