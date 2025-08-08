import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function PerformanceConnectorLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.PerformanceConnector({
        api: {
            ...api,
            url: 'https://www.us-api.morningstar.com/'
        },
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

    const expectedCalendarYearReturnColumns = [
        'Id',
        'Value',
        'Value_Benchmark'
    ];

    const actualCalendarYearReturnColumns =
        connector.dataTables.CalendarYearReturn.getColumnNames();

    Assert.deepStrictEqual(
        actualCalendarYearReturnColumns.sort(),
        expectedCalendarYearReturnColumns.sort(),
        'CalendarYearReturn converter should return expected column names.'
    );

    Assert.ok(
        connector.dataTables.CalendarYearReturn.getRowCount() > 0,
        'CalendarYearReturn converter should not return empty rows.'
    );
}
