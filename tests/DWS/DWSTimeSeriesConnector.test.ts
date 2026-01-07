import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function dwsTimeSeriesLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.DWSTimeSeriesConnector({
        api,
        id: '',
        type: '',
        ids: [{
            id: '0P00000FIA',
            idType: 'performanceId'
        }],
        category: 'performance',
        dataPoint: 'growth',
        startDate: '2020-01-01',
        endDate: '2020-12-31'
    });

    Assert.ok(
        connector instanceof MC.DWSTimeSeriesConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();

    const dataTable = connector.getTable();

    Assert.deepStrictEqual(
        dataTable.getColumnIds(),
        ['Date','Value'],
        'TimeSeries table should have expected columns.'
    );

    Assert.ok(
        dataTable.getRowCount() > 0,
        'TimeSeries table should not return empty rows.'
    );

    Assert.ok(
        dataTable.metadata !== undefined,
        'TimeSeries table should have metadata defined.'
    );

}
