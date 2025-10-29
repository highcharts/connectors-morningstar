import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';

export async function PerformanceCorrelationMatrixLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.PerformanceConnector({
        id: '',
        type: '',
        api,
        viewId: 'All',
        configId: 'Hypothetical',
        requestSettings: {
            includePortfolioCorrelationMatrix: true,
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

    const expectedCorrelationMatrixColumns = [
        'Year10',
        'Year10_FOUSA04BCR',
        'Year10_FOUSA05H5F',
        'Year3',
        'Year3_FOUSA04BCR',
        'Year3_FOUSA05H5F',
        'Year5',
        'Year5_FOUSA04BCR',
        'Year5_FOUSA05H5F',
        'x',
        'y'
    ];

    const actualCorrelationMatrixColumns = connector.dataTables.CorrelationMatrix.getColumnIds();

    Assert.deepStrictEqual(
        actualCorrelationMatrixColumns.sort(),
        expectedCorrelationMatrixColumns.sort(),
        'CorrelationMatrix converter should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.CorrelationMatrix.getRowCount() > 0,
        'CorrelationMatrix converter should not return empty rows.'
    );

    const year3ColumnNames = [
        'Year3_FOUSA04BCR',
        'Year3_FOUSA05H5F'
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
