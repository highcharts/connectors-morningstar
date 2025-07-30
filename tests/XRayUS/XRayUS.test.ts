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

    const expectedColumns = [
        'Type',
        'Value',
        'Unclassified',
        'Value_FOUSA00DFS',
        'Unclassified_FOUSA00DFS',
        'Unclassified_F00000VCTT',
        'Value_FOUSA00C3O',
        'Unclassified_FOUSA00C3O',
        'Value_0P0000BVN5',
        'Unclassified_0P0000BVN5',
        'Style',
        'Size'
    ];

    const actualColumns = connector.dataTables.EquityStyle.getColumnNames();

    Assert.deepStrictEqual(
        actualColumns.sort(),
        expectedColumns.sort(),
        'EquityStyle connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.EquityStyle.getRowCount() > 0,
        'EquityStyle connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.FixedIncomeStyle.getColumnNames(),
        [
            'Type',
            'Value',
            'Unclassified',
            'Style',
            'Size'
        ],
        'FixedIncomeStyle connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.FixedIncomeStyle.getRowCount() > 0,
        'FixedIncomeStyle connector should not return empty rows.'
    );
}
