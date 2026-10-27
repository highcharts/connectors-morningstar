import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function timeSeriesConnectorLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        api,
        id: '',
        type: '',
        ids: [{
            id: '0P00000FIA',
            idType: 'performanceId'
        }, {
            id: 'US2562191062',
            idType: 'ISIN'
        }],
        category: 'performance',
        dataPoint: 'growth',
        startDate: '2020-01-01',
        endDate: '2020-12-31'
    });

    Assert.ok(
        connector instanceof MC.TimeSeriesConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();

    Assert.ok(
        connector.metadata !== undefined,
        'Connector should have metadata defined.'
    );

    const dataTable = connector.getTable();

    Assert.deepStrictEqual(
        dataTable.getColumnIds(),
        [
            'Date',
            'Value_0P00002PB8',
            'Value_0P00000FIA'
        ],
        'TimeSeries table should have expected columns.'
    );

    Assert.ok(
        dataTable.getRowCount() > 0,
        'TimeSeries table should not return empty rows.'
    );

}

export async function timeSeriesConnectorQueryParams (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        id: '',
        type: '',
        api: { ...api, access: { ...api.access } },
        ids: [{ id: '0P00000FIA', idType: 'performanceId' }],
        category: 'performance',
        dataPoint: 'growth',
        startDate: '2020-01-01',
        endDate: '2020-12-31',
        queryParams: { frequency: 'monthly' }
    });

    await connector.load();

    // Daily frequency (default) would return a row per day
    Assert.ok(
        connector.getTable().getRowCount() <= 13,
        'Query params should be applied to the request.'
    );
}
