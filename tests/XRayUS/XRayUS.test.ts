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
            returnDataSections: ['CorrelationMatrix', 'RollingReturns'],
            assetClassGroupConfigs: {
                assetClassGroupConfig: [
                    {
                        id: 'ACG-USBROAD'
                    }
                ]
            },
            includeGrossNetReturns: true
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

    const expectedTrailingReturnsColumns = [
        'Id',
        'Value',
        'GrossValue',
        'Value_Benchmark'
    ];

    const actualyTrailingReturnsColumns = connector.dataTables.TrailingReturns.getColumnNames();

    Assert.deepStrictEqual(
        actualyTrailingReturnsColumns.sort(),
        expectedTrailingReturnsColumns.sort(),
        'TrailingReturns connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.FixedIncomeStyle.getRowCount() > 0,
        'FixedIncomeStyle connector should not return empty rows.'
    );

    const expectedAssetAllocationsColumns = [
        'Type',
        'L',
        'S',
        'N',
        'L_Benchmark',
        'S_Benchmark',
        'N_Benchmark',
        'L_0P0000BVN5',
        'S_0P0000BVN5',
        'N_0P0000BVN5',
        'L_F00000VCTT',
        'S_F00000VCTT',
        'N_F00000VCTT',
        'L_FOUSA00C3O',
        'S_FOUSA00C3O',
        'N_FOUSA00C3O',
        'L_FOUSA00DFS',
        'S_FOUSA00DFS',
        'N_FOUSA00DFS'
    ];

    const actualAssetAllocationsColumns = connector.dataTables.AssetAllocations.getColumnNames();

    Assert.deepStrictEqual(
        actualAssetAllocationsColumns.sort(),
        expectedAssetAllocationsColumns.sort(),
        'AssetAllocation connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.AssetAllocations.getRowCount() > 0,
        'AssetAllocation connector should not return empty rows.'
    );

    const expectedRollingReturnsColumns = [
        'Period_12_Id',
        'Period_12_Value',
        'Period_12_Details_Id',
        'Period_12_Details_AnnualizedTotalReturn',
        'Period_12_Details_CumulativeTotalReturn',
        'Period_12_Details_PeriodDates'
    ];

    const actualRollingReturnsColumns = connector.dataTables.RollingReturns.getColumnNames();

    Assert.deepStrictEqual(
        actualRollingReturnsColumns.sort(),
        expectedRollingReturnsColumns.sort(),
        'RollingReturns connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.RollingReturns.getRowCount() > 0,
        'RollingReturns connector should not return empty rows.'
    );
    const expectedRiskStatisticsColumns = [
        'TrailingTimePeriod',
        'DataFrequency',
        'Benchmark_Mean',
        'Benchmark_SharpeRatio',
        'Benchmark_StandardDeviation',
        'Benchmark_SortinoRatio',
        'Mean',
        'SharpeRatio',
        'StandardDeviation',
        'InformationRatio',
        'TrackingError',
        'SortinoRatio',
        'ExcessReturn',
        'Mean_F00000VCTT',
        'Weight_F00000VCTT',
        'SharpeRatio_F00000VCTT',
        'StandardDeviation_F00000VCTT',
        'Mean_FOUSA00DFS',
        'Weight_FOUSA00DFS',
        'SharpeRatio_FOUSA00DFS',
        'StandardDeviation_FOUSA00DFS',
        'Mean_FOUSA00C3O',
        'Weight_FOUSA00C3O',
        'SharpeRatio_FOUSA00C3O',
        'StandardDeviation_FOUSA00C3O',
        'Mean_0P0000BVN5',
        'Weight_0P0000BVN5',
        'StandardDeviation_0P0000BVN5'
    ];

    const actualRiskStatisticsColumns = connector.dataTables.RiskStatistics.getColumnNames();

    Assert.deepStrictEqual(
        actualRiskStatisticsColumns.sort(),
        expectedRiskStatisticsColumns.sort(),
        'RiskStatistics connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.RiskStatistics.getRowCount() > 0,
        'RiskStatistics connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.CalendarYearReturn.getColumnNames(),
        ['Year', 'Value', 'GrossValue', 'Value_Benchmark'],
        'CalendarYearReturns connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.CalendarYearReturn.getRowCount() > 0,
        'CalendarYearReturns connector should not return empty rows.'
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

    const expectedCorrelationMatrixColumns = [
        'Year10',
        'Year10_0P0000BVN5',
        'Year10_F00000VCTT',
        'Year10_FOUSA00C3O',
        'Year10_FOUSA00DFS',
        'Year3',
        'Year3_0P0000BVN5',
        'Year3_F00000VCTT',
        'Year3_FOUSA00C3O',
        'Year3_FOUSA00DFS',
        'Year5',
        'Year5_0P0000BVN5',
        'Year5_F00000VCTT',
        'Year5_FOUSA00C3O',
        'Year5_FOUSA00DFS',
        'x',
        'y'
    ];

    const actualCorrelationMatrixColumns = connector.dataTables.CorrelationMatrix.getColumnNames();

    Assert.deepStrictEqual(
        actualCorrelationMatrixColumns.sort(),
        expectedCorrelationMatrixColumns.sort(),
        'CorrelationMatrix table should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.CorrelationMatrix.getRowCount() > 0,
        'CorrelationMatrix connector should not return empty rows.'
    );

    const year3ColumnNames = [
        'Year3_0P0000BVN5',
        'Year3_F00000VCTT',
        'Year3_FOUSA00C3O',
        'Year3_FOUSA00DFS'
    ];

    year3ColumnNames.forEach((columnName, index) => {
        const secIndex = year3ColumnNames.length - index - 1,
            value = connector.dataTables.CorrelationMatrix.getCell(columnName, secIndex);

        Assert.strictEqual(
            value,
            1,
            `${columnName} at index ${secIndex} should have a value of 1.`
        );
    });
}
