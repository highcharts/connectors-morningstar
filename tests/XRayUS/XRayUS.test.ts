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
        viewId: 'All',
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

    const expectedEquityStyleColumns = [
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

    const actualEquityStyleColumns = connector.dataTables.EquityStyle.getColumnNames();

    Assert.deepStrictEqual(
        actualEquityStyleColumns.sort(),
        expectedEquityStyleColumns.sort(),
        'EquityStyle connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.EquityStyle.getRowCount() > 0,
        'EquityStyle connector should not return empty rows.'
    );

    const expectedFixedIncomeStyleColumns = [
        'Type',
        'Value',
        'Value_FOUSA00DFS',
        'Value_F00000VCTT',
        'Value_0P0000BVN5',
        'Value_FOUSA00C3O',
        'Style',
        'Size'
    ];

    const actualFixedIncomeStyleColumns = connector.dataTables.FixedIncomeStyle.getColumnNames();

    Assert.deepStrictEqual(
        actualFixedIncomeStyleColumns.sort(),
        expectedFixedIncomeStyleColumns.sort(),
        'FixedIncomeStyle connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.FixedIncomeStyle.getRowCount() > 0,
        'FixedIncomeStyle connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.FundStatistics.getColumnNames().sort(),
        [
            'Type',
            'Value',
            'Value_0P0000BVN5',
            'Value_F00000VCTT',
            'Value_FOUSA00C3O',
            'Value_FOUSA00DFS'
        ],
        'FundStatistics table should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.FundStatistics.getRowCount() > 0,
        'FundStatistics table should not contain empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.Holdings.getColumnNames(),
        [
            'SecurityId',
            'Name',
            'FundPortfolioDate',
            'Year1',
            'Year3',
            'Year5',
            'Year10',
            'PercentAssets',
            'MarketValue',
            'NotClassifiedHoldingId'
        ],
        'Holdings connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.Holdings.getRowCount() > 0,
        'Holdings connector should not return empty rows.'
    );

    const expectedMPTStatisticsColumns = [
        'TrailingTimePeriod',
        'Alpha',
        'Beta',
        'RSquared',
        'UpCaptureRatio',
        'DownCaptureRatio',
        'TreynorRatio',
        'OmegaRatio'
    ];

    Assert.deepStrictEqual(
        connector.dataTables.MPTStatistics.getColumnNames().sort(),
        expectedMPTStatisticsColumns.sort(),
        'MPTStatistics table should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.MPTStatistics.getRowCount() > 0,
        'MPTStatistics table should not contain empty rows.'
    );
}
