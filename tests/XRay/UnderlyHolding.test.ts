import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function underlyHoldings (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayConnector({
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
        connector.dataTables.UnderlyHoldings.getColumnNames(),
        [
            'UnderlyingHoldings_holdingId',
            'UnderlyingHoldings_name',
            'UnderlyingHoldings_securityId',
            'UnderlyingHoldings_securityType',
            'UnderlyingHoldings_performanceId',
            'UnderlyingHoldings_weight',
            'UnderlyingHoldings_marketValue',
            'UnderlyingHoldings_sector',
            'UnderlyingHoldings_sectorId',
            'UnderlyingHoldings_globalSectorId',
            'UnderlyingHoldings_country',
            'UnderlyingHoldings_countryId',
            'UnderlyingHoldings_globalIndustryId',
            'UnderlyingHoldings_iSIN',
            'UnderlyingHoldings_currencyId',
            'UnderlyingHoldings_currencyName'
        ],
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.UnderlyHoldings.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
