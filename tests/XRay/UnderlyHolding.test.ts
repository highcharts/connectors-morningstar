import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';

export async function underlyHoldings (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayConnector({
        id: '',
        type: '',
        api,
        currencyId: 'GBP',
        dataPoints: {
            type: 'portfolio',
            dataPoints: [
                'UnderlyingHolding'
            ]
        },
        holdings: [
            {
                id: 'F0GBR052QA',
                idType: 'MSID',
                type: 'FO',
                weight: '100',
                name: 'BlackRock Income and Growth Ord',
                holdingType: 'weight'
            }
        ]
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.UnderlyHoldings.getColumnIds(),
        [
            'holdingId',
            'name',
            'securityId',
            'securityType',
            'performanceId',
            'weight',
            'marketValue',
            'sector',
            'sectorId',
            'globalSectorId',
            'country',
            'countryId',
            'globalIndustryId',
            'iSIN',
            'currencyId',
            'currencyName'
        ],
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.UnderlyHoldings.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
