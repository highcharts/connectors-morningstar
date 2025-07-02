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
            'XRay_UnderlyingHoldings_holdingId',
            'XRay_UnderlyingHoldings_name',
            'XRay_UnderlyingHoldings_securityId',
            'XRay_UnderlyingHoldings_securityType',
            'XRay_UnderlyingHoldings_performanceId',
            'XRay_UnderlyingHoldings_weight',
            'XRay_UnderlyingHoldings_marketValue',
            'XRay_UnderlyingHoldings_sector',
            'XRay_UnderlyingHoldings_sectorId',
            'XRay_UnderlyingHoldings_globalSectorId',
            'XRay_UnderlyingHoldings_country',
            'XRay_UnderlyingHoldings_countryId',
            'XRay_UnderlyingHoldings_globalIndustryId',
            'XRay_UnderlyingHoldings_iSIN',
            'XRay_UnderlyingHoldings_currencyId',
            'XRay_UnderlyingHoldings_currencyName'
        ],
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.UnderlyHoldings.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
