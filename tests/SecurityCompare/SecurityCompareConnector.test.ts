import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function securityCompareLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    Assert.ok(
        connector instanceof MC.SecurityCompareConnector,
        'Connector should be instance of SecurityCompareConnector class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.SecurityCompareConverter,
        'Converter should be instance of SecurityCompareConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'TrailingPerformance_TimePeriod_F0GBR050DD',
            'TrailingPerformance_Value_F0GBR050DD',
            'TrailingPerformance_TimePeriod_F00000Q5PZ',
            'TrailingPerformance_Value_F00000Q5PZ'
        ],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        10,
        'Connector table should have row count of 10.'
    );

    Assert.deepStrictEqual(
        connector.metadata,
        {
            columns: {},
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            isins: ['GB0004460357', 'LU0593848723']
        }
    );
}

export async function assetAllocationsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converter: {
            type: 'AssetAllocations'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'AssetAllocations_Type_F0GBR050DD',
            'AssetAllocations_MorningstarEUR3_L_F0GBR050DD',
            'AssetAllocations_MorningstarEUR3_S_F0GBR050DD',
            'AssetAllocations_MorningstarEUR3_N_F0GBR050DD',
            'AssetAllocations_Type_F00000Q5PZ',
            'AssetAllocations_MorningstarEUR3_L_F00000Q5PZ',
            'AssetAllocations_MorningstarEUR3_S_F00000Q5PZ',
            'AssetAllocations_MorningstarEUR3_N_F00000Q5PZ'
        ],
        'Asset allocations table should exist of expected columns.'
    );
}
