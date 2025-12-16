import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';


export async function assetAllocBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.InvestmentsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: '0P00000FIA'
        },
        converters: {
            AssetAllocationBreakdown: {}
        }
    });

    await connector.load();

    const expectedAssetAllocCols = [
        'Type',
        'Long',
        'Us_Long',
        'NonUs_Long',
        'LongRescaled',
        'Us_LongRescaled',
        'NonUs_LongRescaled',
        'Net',
        'Us_Net',
        'NonUs_Net',
        'Short',
        'Us_Short',
        'NonUs_Short'
    ],
        expectedCanadianAssetAllocCols = [
            'Type',
            'Long',
            'LongRescaled',
            'Net',
            'Short'
        ],
        expectedUnderlyingAssetAllocCols = [
            'Type',
            'UnderlyingInstruments'
        ];


    Assert.deepStrictEqual(
        connector.dataTables.AssetAlloc.getColumnIds(),
        expectedAssetAllocCols,
        'AssectAlloc table should exist of expected columns.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.CanadianAssetAlloc.getColumnIds(),
        expectedCanadianAssetAllocCols,
        'CanadianAssetAlloc table should exist of expected columns.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.UnderlyingAssetAlloc.getColumnIds(),
        expectedUnderlyingAssetAllocCols,
        'UnderlyingAssetAlloc table should exist of expected columns.'
    );
    
    Assert.ok(
        connector.dataTables.AssetAlloc.getRowCount() > 0,
        'AssetAlloc should not return empty rows.'
    );

    Assert.ok(
        connector.dataTables.CanadianAssetAlloc.getRowCount() > 0,
        'CanadianAssetAlloc should not return empty rows.'
    );

    Assert.ok(
        connector.dataTables.UnderlyingAssetAlloc.getRowCount() > 0,
        'UnderlyingAssetAlloc should not return empty rows.'
    );
}
