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
import type XRayUSJSON from '../../XRayUS/XRayUSJSON';

/* *
 *
 *  Class
 *
 * */


export class AssetAllocationConverter extends MorningstarConverter {


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
            assetAllocation = options.json.Analysis.AssetAllocation[0],
            portfolio = assetAllocation.Portfolio,
            benchmark = assetAllocation.Benchmark,
            securityBreakdown = assetAllocation.SecurityBreakdown;

        if (portfolio) {
            setAssetAllocationCells(portfolio);
        }

        if (benchmark) {
            setAssetAllocationCells(benchmark, '_Benchmark');
        }

        if (securityBreakdown) {
            // Assign security breakdown securities to the matching Type, since
            // the security breakdown is in a different order than the portfolio
            // and benchmark.
            const typeColumn = table.getColumn('Type');

            securityBreakdown.forEach(security => {
                for (let i = 0; i < security.AssetClass.length; i++) {
                    if (Array.isArray(typeColumn)) {
                        const typeMap: Record<string, number> = {};
                        typeColumn.forEach(function (type, idx) {
                            if (typeof type === 'string') {
                                typeMap[type] = idx;
                            }
                        });

                        table.setCell(
                            'L_' + security.SecurityId + columnSuffix,
                            typeMap[security.AssetClass[i].Id],
                            security.AssetClass[i].Long
                        );
                        table.setCell(
                            'S_' + security.SecurityId + columnSuffix,
                            typeMap[security.AssetClass[i].Id],
                            security.AssetClass[i].Short
                        );
                        table.setCell(
                            'N_' + security.SecurityId + columnSuffix,
                            typeMap[security.AssetClass[i].Id],
                            security.AssetClass[i].Net
                        );
                    }
                }
            });
        }

        function setAssetAllocationCells (
            asset: Array<XRayUSJSON.AssetAllocationItem>,
            benchmarkSuffix = ''
        ) {
            for (let i = 0; i < asset.length; i++) {
                table.setCell('Type', i, asset[i].Id);
                table.setCell('L' + benchmarkSuffix + columnSuffix, i, asset[i].Long);
                table.setCell('S' + benchmarkSuffix + columnSuffix, i, asset[i].Short);
                table.setCell('N' + benchmarkSuffix + columnSuffix, i, asset[i].Net);
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default AssetAllocationConverter;
