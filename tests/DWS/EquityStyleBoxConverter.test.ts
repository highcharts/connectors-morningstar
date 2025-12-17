import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function equityStyleBox (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.InvestmentsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: '0P00006W6Q'
        },
        converters: {
            EquityStyleBox: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();
    const stockDataTable = connector.getTable('StockStyle'),
        timeDataTable = connector.getTable('TimeSeries');

    Assert.deepStrictEqual(
        stockDataTable.getColumnIds(),
        ['Style', 'Size', 'Value'],
        'Equity Style Box StockStyle table should have expected columns.'
    );

    Assert.ok(
        stockDataTable.getRowCount() > 0,
        'Equity Style Box StockStyle table should not return empty rows.'
    );

    Assert.deepStrictEqual(
        timeDataTable.getColumnIds(),
        ['Date', 'SizeScore', 'StyleScore', 'GrowthScore', 'ValueScore'],
        'Equity Style Box TimeSeries table should have expected columns.'
    );

    Assert.ok(
        timeDataTable.getRowCount() > 0,
        'Equity Style Box TimeSeries table should not return empty rows.'
    );
}
