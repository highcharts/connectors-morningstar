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


export class BreakdownsConverter extends MorningstarConverter {


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
            json = options.json.breakdowns;

        if (json?.assetAllocation) {
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

        if (json?.regionalExposure) {
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

        if (json?.globalStockSector) {
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

        if (json?.styleBox) {
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
}


/* *
 *
 *  Default Export
 *
 * */


export default BreakdownsConverter;
