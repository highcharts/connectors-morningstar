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
            AssetAllocationBreakdown: {},
            EquitySectorsBreakdown: {},
            FixedIncomeSectorsBreakdown: {}
        }
    });

    Assert.ok(
        connector.dataTables.CanadianAssetAlloc.getRowCount() > 0,
        'CanadianAssetAlloc should not return empty rows.'
    );

    Assert.ok(
        connector.dataTables.UnderlyingAssetAlloc.getRowCount() > 0,
        'UnderlyingAssetAlloc should not return empty rows.'
    );
}
