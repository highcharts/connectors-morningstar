import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';

export async function securityDetailsOfflineJSONLoad (): Promise<void> {
    const originalFetch = window.fetch;

    window.fetch = async (): Promise<Response> => {
        throw new Error('Network call should not happen in offline mode.');
    };

    try {
        const connector = new MC.SecurityDetailsConnector({
            api: {
                json: [{
                    Currency: { Id: 'USD' },
                    Id: 'OFFLINE_SECURITY',
                    Isin: 'OFFLINE_ISIN',
                    TrailingPerformance: [{
                        Return: [{
                            Date: '2026-01-01',
                            TimePeriod: '1M',
                            Value: 1.25
                        }],
                        ReturnType: 'Nav',
                        Type: 'DayEnd'
                    }]
                }]
            },
            converters: ['TrailingPerformance'],
            id: '',
            security: {
                id: 'F0GBR050DD',
                idType: 'MSID'
            },
            type: ''
        });

        await connector.load();

        Assert.strictEqual(connector.metadata.id, 'OFFLINE_SECURITY');

        Assert.ok(
            connector instanceof MC.SecurityDetailsConnector,
            'Connector should be instance of SecurityDetailsConnector class.'
        );

        Assert.deepStrictEqual(
            connector.dataTables.TrailingPerformance.getColumnIds(),
            ['Nav_DayEnd_TimePeriod', 'Nav_DayEnd_Date', 'Nav_DayEnd_Value'],
            'TrailingPerformance table should have expected columns.'
        );

        Assert.ok(
            connector.dataTables.TrailingPerformance.getRowCount() > 0,
            'TrailingPerformance table should not be empty.'
        );

        Assert.strictEqual(
            connector.dataTables.TrailingPerformance.getCell('Nav_DayEnd_Value', 0),
            1.25,
            'TrailingPerformance first value should match offline payload.'
        );
    } finally {
        window.fetch = originalFetch;
    }
}
