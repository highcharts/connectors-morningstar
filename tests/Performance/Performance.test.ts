import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function PerformanceConnectorLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.PerformanceConnector({
        api,
        viewId: 'All',
        configId: 'QuickPortfolio',
        requestSettings: {
            outputCurrency: 'USD',
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
                        securityId: 'FOUSA05H5F',
                        type: 'FO',
                        weight: 50
                    },
                    {
                        securityId: 'FOUSA04BCR',
                        type: 'FO',
                        weight: 50
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
        connector instanceof MC.PerformanceConnector,
        'Connector should be instance of PerformanceConnector class.'
    );

    const expectedReturnColumns = [
        'Id',
        'Value',
        'Value_Benchmark'
    ];

    const actualCalendarYearReturnColumns =
        connector.dataTables.CalendarYearReturn.getColumnNames();

    Assert.deepStrictEqual(
        actualCalendarYearReturnColumns.sort(),
        expectedReturnColumns.sort(),
        'CalendarYearReturn converter should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.CalendarYearReturn.getRowCount() > 0,
        'CalendarYearReturn converter should not return empty rows.'
    );

    const expectedRiskStatisticsColumns = [
        'TrailingTimePeriod',
        'DataFrequency',
        'Mean_Benchmark',
        'SharpeRatio_Benchmark',
        'StandardDeviation_Benchmark',
        'SortinoRatio_Benchmark',
        'Mean',
        'SharpeRatio',
        'StandardDeviation',
        'InformationRatio',
        'TrackingError',
        'SortinoRatio',
        'ExcessReturn',
        'Mean_FOUSA05H5F',
        'Weight_FOUSA05H5F',
        'SharpeRatio_FOUSA05H5F',
        'StandardDeviation_FOUSA05H5F',
        'Mean_FOUSA04BCR',
        'Weight_FOUSA04BCR',
        'SharpeRatio_FOUSA04BCR',
        'StandardDeviation_FOUSA04BCR'
    ];

    const actualRiskStatisticsColumns = connector.dataTables.RiskStatistics.getColumnNames();

    Assert.deepStrictEqual(
        actualRiskStatisticsColumns.sort(),
        expectedRiskStatisticsColumns.sort(),
        'RiskStatistics converter should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.RiskStatistics.getRowCount() > 0,
        'RiskStatistics converter should not return empty rows.'
    );

    const actualTrailingReturnColumns =
        connector.dataTables.TrailingReturns.getColumnNames();

    Assert.deepStrictEqual(
        actualTrailingReturnColumns.sort(),
        expectedReturnColumns.sort(),
        'TrailingReturns converter should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.TrailingReturns.getRowCount() > 0,
        'TrailingReturns converter should not return empty rows.'
    );
}
