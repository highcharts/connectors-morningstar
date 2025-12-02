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
import * as External from '../../../Shared/External';
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

        this.tables = [];
    }

    /**
     *
     *  Properties
     *
     */

    public readonly metadata: AssetAllocationBreakdownMetadata;
    protected tables: External.DataTable[];


    /* *
     *
     *  Functions
     *
     * */

    public override parse (
        options: AssetAllocationBreakdownConverterOptions
    ): void {
        const tables = this.tables,
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

        const underlying = [
            'Bond',
            'CashAndMoneyMarket',
            'ClosedEndFund',
            'ExchangeTradedProduct',
            'InstitutionalInvestment',
            'MiscellaneousSecurities',
            'OpenEndFund',
            'Stock'
        ] as DataTable.Column;

        const SUFFIXES = ['Long', 'LongRescaled', 'Net', 'Short'];


        tables[0] = new External.DataTable({ id:'AssetAlloc' });
        tables[1] = new External.DataTable({ id:'CanadianAssetAlloc' });
        tables[2] = new External.DataTable({ id:'UnderlyingAssetAlloc' });

        tables[0].setColumn('General_Type', assets);
        tables[1].setColumn('Can_Type', canAssets);
        tables[2].setColumn('Underlying_Type', underlying);

        for (const suffix of SUFFIXES) {
            for (let i = 0; i < assets.length; i++) {
                const asset = assets[i];

                let key = `assetAlloc${asset}Perc${suffix}`;
                tables[0].setCell('Basic_' + suffix, i, key in assetAlloc ? assetAlloc[key] : 0);

                key = `assetAllocUs${asset}Perc${suffix}`;
                tables[0].setCell('Us_' + suffix, i, key in assetAlloc ? assetAlloc[key] : 0);

                key = `assetAllocNonUs${asset}Perc${suffix}`;
                tables[0].setCell('NonUs_' + suffix, i, key in assetAlloc ? assetAlloc[key] : 0);
            }

            for (let i = 0; i < canAssets.length; i++) {
                const asset = canAssets[i];
                const key = `canAssetAlloc${asset}Perc${suffix}`;
                tables[1].setCell('Can_' + suffix, i, key in assetAlloc ? assetAlloc[key] : 0);
            }
        }

        for (let i = 0; i < underlying.length; i++) {
            const asset = underlying[i];
            const key = `underlyingInstrument${asset}Percent`;
            tables[2].setCell(
                'UnderlyingInstruments', i, key in assetAlloc ? assetAlloc[key] : 0
            );
        }
    }

    public getTables (): External.DataTable[] {
        return this.tables;
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default AssetAllocationBreakdownConverter;
