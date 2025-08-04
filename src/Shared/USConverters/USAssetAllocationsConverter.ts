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


export class USAssetAllocationConverter extends MorningstarConverter {


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
            benchmark = assetAllocation.Benchmark;

        if (portfolio) {
            setAssetAllocationCells(portfolio);
        }

        if (benchmark) {
            setAssetAllocationCells(benchmark, '_Benchmark');
        }

        function setAssetAllocationCells (
            asset: Array<XRayUSJSON.AssetAllocationItem>,
            benchmarkSuffix = ''
        ) {
            for (let i = 0; i < asset.length; i++) {
                table.setCell(assetAllocation.Id + '_Type' + columnSuffix, i, asset[i].Id);
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


export default USAssetAllocationConverter;
