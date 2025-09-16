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


export class WorldRegionsConverter extends MorningstarConverter {


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
            worldRegions = options.json.Analysis.EquityAnalysis.WorldRegions,
            portfolio = worldRegions.Portfolio,
            benchmark = worldRegions.Benchmark;

        if (portfolio) {
            setWorldRegionsCells(portfolio);
        }

        if (benchmark) {
            setWorldRegionsCells(benchmark, '_Benchmark');
        }

        function setWorldRegionsCells (
            asset: Array<XRayUSJSON.WorldRegionsItem>,
            benchmarkSuffix = ''
        ) {
            let rowIndex = 0;

            for (let i = 0; i < asset.length; i++) {
                const exposureItem = asset[i].ExposureItem || [];

                for (let j = 0; j < exposureItem.length; j++) {
                    // Parent columns (Regions)
                    table.setCell(
                        'ParentId' + benchmarkSuffix + columnSuffix,
                        rowIndex,
                        asset[i].Id
                    );
                    table.setCell(
                        'ParentValue' + benchmarkSuffix + columnSuffix,
                        rowIndex,
                        asset[i].Value
                    );

                    // Exposure item (Individual countries)
                    table.setCell(
                        'Id' + benchmarkSuffix + columnSuffix,
                        rowIndex,
                        exposureItem[j].Id
                    );
                    table.setCell(
                        'Value' + benchmarkSuffix + columnSuffix,
                        rowIndex,
                        exposureItem[j].Value
                    );
                    rowIndex++;
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


export default WorldRegionsConverter;
