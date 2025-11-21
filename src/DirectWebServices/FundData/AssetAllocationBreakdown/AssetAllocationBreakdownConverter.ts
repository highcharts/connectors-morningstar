/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


'use strict';


import { DataTable } from '@highcharts/dashboards';
/* *
 *
 *  Imports
 *
 * */

import MorningstarConverter from '../../../Shared/MorningstarConverter';
import {
    AssetAllocationBreakdownConverterOptions,
    AssetAllocationBreakdownMetadata 
} from './AssetAllocationBreakdownOptions';

/* *
 *
 *  Class
 *
 * */


export class AssetAllocationBreakdownConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: AssetAllocationBreakdownConverterOptions
    ) {
        super(options);

        this.metadata = {
            columns: {}
        };
    }

    /**
     *
     *  Properties
     *
     */

    public readonly metadata: AssetAllocationBreakdownMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: AssetAllocationBreakdownConverterOptions
    ): void {
        const table = this.table,
            userOptions = {
                ...this.options,
                ...options
            };

        const assetAlloc = userOptions.json.assetAllocationBreakdown;
        const assets = [
            'Bond',
            'Cash',
            'ConvBond',
            'Equity',
            'Other'
        ] as DataTable.Column;
        const canAssets = [
            'CanadianEquity',
            'InternationalEquity',
            'USEquity',
            'Cash',
            'FixedIncome',
            'Other'
        ] as DataTable.Column;
        const SUFFIXES = ['Long', 'LongRescaled', 'Net'];

        table.setColumn('General_Type', assets);
        table.setColumn('Can_Type', canAssets);
        for (const suffix of SUFFIXES) {
            for (let i = 0; i < assets.length; i++) {
                const asset = assets[i];

                let key = `assetAlloc${asset}Perc${suffix}`;
                table.setCell('Basic_' + suffix, i, key in assetAlloc ? assetAlloc[key] : null);

                key = `assetAllocUs${asset}Perc${suffix}`;
                table.setCell('Us_' + suffix, i, key in assetAlloc ? assetAlloc[key] : null);

                key = `assetAllocNonUs${asset}Perc${suffix}`;
                table.setCell('NonUs_' + suffix, i, key in assetAlloc ? assetAlloc[key] : null);
            }

            for (let i = 0; i < canAssets.length; i++) {
                const asset = canAssets[i];
                const key = `canAssetAlloc${asset}Perc${suffix}`;
                table.setCell('Can_' + suffix, i, key in assetAlloc ? assetAlloc[key] : null);
            }
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default AssetAllocationBreakdownConverter;
