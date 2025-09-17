import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function multiXRayUSConnectorLoad (
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
            }, {
                name: 'TestPortfolio2',
                totalValue: 20000,
                currency: 'USD',
                holdings: [
                    {
                        securityId: 'F00000VCTT',
                        weight: 25
                    },
                    {
                        securityId: '0P00002NW8',
                        weight: 15
                    },
                    {
                        tradingSymbol: 'AAPL',
                        weight: 20
                    },
                    {
                        isin: 'US09251T1034',
                        weight: 25
                    },
                    {
                        cusip: '256219106',
                        weight: 15
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
            'Value_TestPortfolio1',
            'Value_TestPortfolio2'
        ],
        'CreditQuality table should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.CreditQuality.getRowCount() > 0,
        'CreditQuality table should not contain empty rows.'
    );

    const expectedEquityStyleColumns = [
        'Size',
        'Style',
        'Type',
        'Unclassified_0P0000BVN5',
        'Unclassified_F00000VCTT',
        'Unclassified_FOUSA00C3O',
        'Unclassified_FOUSA00DFS',
        'Unclassified_TestPortfolio1',
        'Unclassified_TestPortfolio2',
        'Value_0P0000BVN5',
        'Value_FOUSA00C3O',
        'Value_FOUSA00DFS',
        'Value_TestPortfolio1',
        'Value_TestPortfolio2'
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
        'Size',
        'Style',
        'Type',
        'Value_0P0000BVN5',
        'Value_F00000VCTT',
        'Value_FOUSA00C3O',
        'Value_FOUSA00DFS',
        'Value_TestPortfolio1',
        'Value_TestPortfolio2'
    ];


    const actualFixedIncomeStyleColumns = connector.dataTables.FixedIncomeStyle.getColumnNames();

    Assert.deepStrictEqual(
        actualFixedIncomeStyleColumns.sort(),
        expectedFixedIncomeStyleColumns.sort(),
        'FixedIncomeStyle connector should return expected column names.'
    );

    const expectedTrailingReturnsColumns = [
        'GrossValue_TestPortfolio1',
        'GrossValue_TestPortfolio2',
        'Id_TestPortfolio1',
        'Id_TestPortfolio2',
        'Value_Benchmark_TestPortfolio1',
        'Value_Benchmark_TestPortfolio2',
        'Value_TestPortfolio1',
        'Value_TestPortfolio2'
    ];

    const actualTrailingReturnsColumns = connector.dataTables.TrailingReturns.getColumnNames();

    Assert.deepStrictEqual(
        actualTrailingReturnsColumns.sort(),
        expectedTrailingReturnsColumns.sort(),
        'TrailingReturns connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.FixedIncomeStyle.getRowCount() > 0,
        'FixedIncomeStyle connector should not return empty rows.'
    );

    const expectedAssetAllocationsColumns = [
        'L_0P0000BVN5_TestPortfolio1',
        'L_0P0000BVN5_TestPortfolio2',
        'L_Benchmark_TestPortfolio1',
        'L_Benchmark_TestPortfolio2',
        'L_F00000VCTT_TestPortfolio1',
        'L_F00000VCTT_TestPortfolio2',
        'L_FOUSA00C3O_TestPortfolio1',
        'L_FOUSA00C3O_TestPortfolio2',
        'L_FOUSA00DFS_TestPortfolio1',
        'L_FOUSA00DFS_TestPortfolio2',
        'L_TestPortfolio1',
        'L_TestPortfolio2',
        'N_0P0000BVN5_TestPortfolio1',
        'N_0P0000BVN5_TestPortfolio2',
        'N_Benchmark_TestPortfolio1',
        'N_Benchmark_TestPortfolio2',
        'N_F00000VCTT_TestPortfolio1',
        'N_F00000VCTT_TestPortfolio2',
        'N_FOUSA00C3O_TestPortfolio1',
        'N_FOUSA00C3O_TestPortfolio2',
        'N_FOUSA00DFS_TestPortfolio1',
        'N_FOUSA00DFS_TestPortfolio2',
        'N_TestPortfolio1',
        'N_TestPortfolio2',
        'S_0P0000BVN5_TestPortfolio1',
        'S_0P0000BVN5_TestPortfolio2',
        'S_Benchmark_TestPortfolio1',
        'S_Benchmark_TestPortfolio2',
        'S_F00000VCTT_TestPortfolio1',
        'S_F00000VCTT_TestPortfolio2',
        'S_FOUSA00C3O_TestPortfolio1',
        'S_FOUSA00C3O_TestPortfolio2',
        'S_FOUSA00DFS_TestPortfolio1',
        'S_FOUSA00DFS_TestPortfolio2',
        'S_TestPortfolio1',
        'S_TestPortfolio2',
        'Type'
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
        'Period_12_Details_AnnualizedTotalReturn_TestPortfolio1',
        'Period_12_Details_AnnualizedTotalReturn_TestPortfolio2',
        'Period_12_Details_CumulativeTotalReturn_TestPortfolio1',
        'Period_12_Details_CumulativeTotalReturn_TestPortfolio2',
        'Period_12_Details_Id_TestPortfolio1',
        'Period_12_Details_Id_TestPortfolio2',
        'Period_12_Details_PeriodDates_TestPortfolio1',
        'Period_12_Details_PeriodDates_TestPortfolio2',
        'Period_12_Id_TestPortfolio1',
        'Period_12_Id_TestPortfolio2',
        'Period_12_Value_TestPortfolio1',
        'Period_12_Value_TestPortfolio2'
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
        'Benchmark_Mean_TestPortfolio1',
        'Benchmark_Mean_TestPortfolio2',
        'Benchmark_SharpeRatio_TestPortfolio1',
        'Benchmark_SharpeRatio_TestPortfolio2',
        'Benchmark_SortinoRatio_TestPortfolio1',
        'Benchmark_SortinoRatio_TestPortfolio2',
        'Benchmark_StandardDeviation_TestPortfolio1',
        'Benchmark_StandardDeviation_TestPortfolio2',
        'DataFrequency',
        'ExcessReturn_TestPortfolio1',
        'ExcessReturn_TestPortfolio2',
        'InformationRatio_TestPortfolio1',
        'InformationRatio_TestPortfolio2',
        'Mean_0P0000BVN5_TestPortfolio1',
        'Mean_0P0000BVN5_TestPortfolio2',
        'Mean_F00000VCTT_TestPortfolio1',
        'Mean_F00000VCTT_TestPortfolio2',
        'Mean_FOUSA00C3O_TestPortfolio1',
        'Mean_FOUSA00C3O_TestPortfolio2',
        'Mean_FOUSA00DFS_TestPortfolio1',
        'Mean_FOUSA00DFS_TestPortfolio2',
        'Mean_TestPortfolio1',
        'Mean_TestPortfolio2',
        'SharpeRatio_F00000VCTT_TestPortfolio1',
        'SharpeRatio_F00000VCTT_TestPortfolio2',
        'SharpeRatio_FOUSA00C3O_TestPortfolio1',
        'SharpeRatio_FOUSA00C3O_TestPortfolio2',
        'SharpeRatio_FOUSA00DFS_TestPortfolio1',
        'SharpeRatio_FOUSA00DFS_TestPortfolio2',
        'SharpeRatio_TestPortfolio1',
        'SharpeRatio_TestPortfolio2',
        'SortinoRatio_TestPortfolio1',
        'SortinoRatio_TestPortfolio2',
        'StandardDeviation_0P0000BVN5_TestPortfolio1',
        'StandardDeviation_0P0000BVN5_TestPortfolio2',
        'StandardDeviation_F00000VCTT_TestPortfolio1',
        'StandardDeviation_F00000VCTT_TestPortfolio2',
        'StandardDeviation_FOUSA00C3O_TestPortfolio1',
        'StandardDeviation_FOUSA00C3O_TestPortfolio2',
        'StandardDeviation_FOUSA00DFS_TestPortfolio1',
        'StandardDeviation_FOUSA00DFS_TestPortfolio2',
        'StandardDeviation_TestPortfolio1',
        'StandardDeviation_TestPortfolio2',
        'TrackingError_TestPortfolio1',
        'TrackingError_TestPortfolio2',
        'TrailingTimePeriod',
        'Weight_0P0000BVN5_TestPortfolio1',
        'Weight_0P0000BVN5_TestPortfolio2',
        'Weight_F00000VCTT_TestPortfolio1',
        'Weight_F00000VCTT_TestPortfolio2',
        'Weight_FOUSA00C3O_TestPortfolio1',
        'Weight_FOUSA00C3O_TestPortfolio2',
        'Weight_FOUSA00DFS_TestPortfolio1',
        'Weight_FOUSA00DFS_TestPortfolio2'
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
        [
            'Year',
            'Value_TestPortfolio1',
            'GrossValue_TestPortfolio1',
            'Value_Benchmark_TestPortfolio1',
            'Value_TestPortfolio2',
            'GrossValue_TestPortfolio2',
            'Value_Benchmark_TestPortfolio2'
        ],
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
            'Value_0P0000BVN5',
            'Value_F00000VCTT',
            'Value_FOUSA00C3O',
            'Value_FOUSA00DFS',
            'Value_TestPortfolio1',
            'Value_TestPortfolio2'
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
            'SecurityId_TestPortfolio1',
            'Name_TestPortfolio1',
            'FundPortfolioDate_TestPortfolio1',
            'Year1_TestPortfolio1',
            'Year3_TestPortfolio1',
            'Year5_TestPortfolio1',
            'Year10_TestPortfolio1',
            'PercentAssets_TestPortfolio1',
            'MarketValue_TestPortfolio1',
            'NotClassifiedHoldingId_TestPortfolio1',
            'SecurityId_TestPortfolio2',
            'Name_TestPortfolio2',
            'FundPortfolioDate_TestPortfolio2',
            'Year1_TestPortfolio2',
            'Year3_TestPortfolio2',
            'Year5_TestPortfolio2',
            'Year10_TestPortfolio2',
            'PercentAssets_TestPortfolio2',
            'MarketValue_TestPortfolio2',
            'NotClassifiedHoldingId_TestPortfolio2'
        ],
        'Holdings connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.Holdings.getRowCount() > 0,
        'Holdings connector should not return empty rows.'
    );

    const expectedMPTStatisticsColumns = [
        'Alpha_TestPortfolio1',
        'Alpha_TestPortfolio2',
        'Beta_TestPortfolio1',
        'Beta_TestPortfolio2',
        'DownCaptureRatio_TestPortfolio1',
        'DownCaptureRatio_TestPortfolio2',
        'OmegaRatio_TestPortfolio1',
        'OmegaRatio_TestPortfolio2',
        'RSquared_TestPortfolio1',
        'RSquared_TestPortfolio2',
        'TrailingTimePeriod',
        'TreynorRatio_TestPortfolio1',
        'TreynorRatio_TestPortfolio2',
        'UpCaptureRatio_TestPortfolio1',
        'UpCaptureRatio_TestPortfolio2'
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
        'Year10_0P0000BVN5_TestPortfolio1',
        'Year10_0P0000BVN5_TestPortfolio2',
        'Year10_F00000VCTT_TestPortfolio1',
        'Year10_F00000VCTT_TestPortfolio2',
        'Year10_FOUSA00C3O_TestPortfolio1',
        'Year10_FOUSA00C3O_TestPortfolio2',
        'Year10_FOUSA00DFS_TestPortfolio1',
        'Year10_FOUSA00DFS_TestPortfolio2',
        'Year10_TestPortfolio1',
        'Year10_TestPortfolio2',
        'Year3_0P0000BVN5_TestPortfolio1',
        'Year3_0P0000BVN5_TestPortfolio2',
        'Year3_F00000VCTT_TestPortfolio1',
        'Year3_F00000VCTT_TestPortfolio2',
        'Year3_FOUSA00C3O_TestPortfolio1',
        'Year3_FOUSA00C3O_TestPortfolio2',
        'Year3_FOUSA00DFS_TestPortfolio1',
        'Year3_FOUSA00DFS_TestPortfolio2',
        'Year3_TestPortfolio1',
        'Year3_TestPortfolio2',
        'Year5_0P0000BVN5_TestPortfolio1',
        'Year5_0P0000BVN5_TestPortfolio2',
        'Year5_F00000VCTT_TestPortfolio1',
        'Year5_F00000VCTT_TestPortfolio2',
        'Year5_FOUSA00C3O_TestPortfolio1',
        'Year5_FOUSA00C3O_TestPortfolio2',
        'Year5_FOUSA00DFS_TestPortfolio1',
        'Year5_FOUSA00DFS_TestPortfolio2',
        'Year5_TestPortfolio1',
        'Year5_TestPortfolio2',
        'x_TestPortfolio1',
        'x_TestPortfolio2',
        'y_TestPortfolio1',
        'y_TestPortfolio2'
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

    const year3ColumnNamesPortfolio1 = [
        'Year3_0P0000BVN5_TestPortfolio1',
        'Year3_F00000VCTT_TestPortfolio1',
        'Year3_FOUSA00C3O_TestPortfolio1',
        'Year3_FOUSA00DFS_TestPortfolio1'
    ];

    year3ColumnNamesPortfolio1.forEach((columnName, index) => {
        const secIndex = year3ColumnNamesPortfolio1.length - index - 1,
            value = connector.dataTables.CorrelationMatrix.getCell(columnName, secIndex);

        Assert.strictEqual(
            value,
            1,
            `${columnName} at index ${secIndex} should have a value of 1.`
        );
    });

    const expectedWorldRegionsColumns = [
        'Id_Benchmark_TestPortfolio1',
        'Id_Benchmark_TestPortfolio2',
        'Id_TestPortfolio1',
        'Id_TestPortfolio2',
        'ParentId_Benchmark_TestPortfolio1',
        'ParentId_Benchmark_TestPortfolio2',
        'ParentId_TestPortfolio1',
        'ParentId_TestPortfolio2',
        'ParentValue_Benchmark_TestPortfolio1',
        'ParentValue_Benchmark_TestPortfolio2',
        'ParentValue_TestPortfolio1',
        'ParentValue_TestPortfolio2',
        'Value_Benchmark_TestPortfolio1',
        'Value_Benchmark_TestPortfolio2',
        'Value_TestPortfolio1',
        'Value_TestPortfolio2'
    ];

    const actualWorldRegionsColumns = connector.dataTables.WorldRegions.getColumnNames();

    Assert.deepStrictEqual(
        actualWorldRegionsColumns.sort(),
        expectedWorldRegionsColumns.sort(),
        'WorldRegions connector should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.WorldRegions.getRowCount() > 0,
        'WorldRegions connector should not return empty rows.'
    );
}
