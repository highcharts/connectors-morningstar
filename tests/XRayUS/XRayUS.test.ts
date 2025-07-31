import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function xRayUSConnectorLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayUSConnector({
        api: {
            ...api,
            url: 'https://www.us-api.morningstar.com/'
        },
        viewId: 'Snapshot',
        configId: 'Default',
        requestSettings: {
            outputCurrency: 'USD',
            outputReturnsFrequency: 'MonthEnd',
            assetClassGroupConfigs: {
                assetClassGroupConfig: [
                    {
                        id: 'ACG-USBROAD'
                    }
                ]
            }
        },
        portfolios: [
            {
                name: 'TestPortfolio1',
                totalValue: 10000,
                currency: 'USD',
                holdings: [
                    {
                        securityId: 'F00000VCTT',
                        weight: 20
                    },
                    {
                        securityId: '0P00002NW8',
                        weight: 10
                    },
                    {
                        tradingSymbol: 'AAPL',
                        weight: 15
                    },
                    {
                        isin: 'US09251T1034',
                        weight: 35
                    },
                    {
                        cusip: '256219106',
                        weight: 20
                    }
                ],
                benchmark: {
                    type: 'Standard',
                    holdings: [
                        {
                            securityId: 'XIUSA04G92',
                            type: 'XI',
                            weight: 100
                        }
                    ]
                }
            }
        ]
    });

    await connector.load();

    Assert.ok(
        connector instanceof MC.XRayUSConnector,
        'Connector should be instance of XRayUSConnector class.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.CreditQuality.getColumnNames(),
        [
            'Type',
            'Value'
        ],
        'CreditQuality table should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.CreditQuality.getRowCount() > 0,
        'CreditQuality table should not contain empty rows.'
    );

}
