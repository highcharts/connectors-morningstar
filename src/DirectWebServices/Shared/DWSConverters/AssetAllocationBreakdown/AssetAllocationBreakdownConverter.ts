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


/* *
*
*  Imports
*
* */

import { DataTable } from '../../../../Shared/External';
import MorningstarConverter from '../../../../Shared/MorningstarConverter';
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
        const tables = this.tables;

        tables[0] = new DataTable({ id:'AssetAlloc' });
        tables[1] = new DataTable({ id:'CanadianAssetAlloc' });
        tables[2] = new DataTable({ id:'UnderlyingAssetAlloc' });

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
        const tables = this.tables,
            userOptions = {
                ...this.options,
                ...options
            },
            metadata = this.metadata,
            json = userOptions.json,
            id = json.identifiers.performanceId;

        const assetAlloc = json.assetAllocationBreakdown;
        const assets = [
            'Bond',
            'Cash',
            'ConvBond',
            'Equity',
            'Other'
        ];
        const canAssets = [
            'CanadianEquity',
            'InternationalEquity',
            'USEquity',
            'Cash',
            'FixedIncome',
            'Other'
        ];

        const underlying = [
            'Bond',
            'CashAndMoneyMarket',
            'ClosedEndFund',
            'ExchangeTradedProduct',
            'InstitutionalInvestment',
            'MiscellaneousSecurities',
            'OpenEndFund',
            'Stock'
        ];

        const SUFFIXES = ['Long', 'LongRescaled', 'Net', 'Short'];

        tables[0].setColumn('Type', assets);
        tables[1].setColumn('Type', canAssets);
        tables[2].setColumn('Type', underlying);

        for (const suffix of SUFFIXES) {
            for (let i = 0; i < assets.length; i++) {
                const asset = assets[i];

                let key = `assetAlloc${asset}Perc${suffix}`;
                tables[0].setCell(suffix, i, key in assetAlloc ? assetAlloc[key] : 0);

                key = `assetAllocUs${asset}Perc${suffix}`;
                tables[0].setCell('Us_' + suffix, i, key in assetAlloc ? assetAlloc[key] : 0);

                key = `assetAllocNonUs${asset}Perc${suffix}`;
                tables[0].setCell('NonUs_' + suffix, i, key in assetAlloc ? assetAlloc[key] : 0);
            }

            for (let i = 0; i < canAssets.length; i++) {
                const asset = canAssets[i];
                const key = `canAssetAlloc${asset}Perc${suffix}`;
                tables[1].setCell(suffix, i, key in assetAlloc ? assetAlloc[key] : 0);
            }
        }

        for (let i = 0; i < underlying.length; i++) {
            const asset = underlying[i];
            const key = `underlyingInstrument${asset}Percent`;
            tables[2].setCell(
                'UnderlyingInstruments', i, key in assetAlloc ? assetAlloc[key] : 0
            );
        }

        // Converter metadata
        metadata.performanceId = id;

        if (json.metadata.messages?.length) {
            metadata.messages = json.metadata.messages;
        }
    }

}


/* *
 *
 *  Default Export
 *
 * */


export default AssetAllocationBreakdownConverter;
