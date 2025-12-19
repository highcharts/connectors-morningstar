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

    const connectorMeradata = connector.metadata['EquityStyleBox'];

    Assert.ok(
        connectorMeradata !== undefined,
        'InvestmentsConnector metadata should contain EquityStyleBox section.'
    );

    Assert.deepStrictEqual(
        Object.keys(connectorMeradata).sort(),
        [
            'columns',
            'performanceId'
        ],
        'EquityStyleBox metadata should contain expected properties.'
    );

    Assert.deepStrictEqual(
        connectorMeradata.performanceId,
        '0P00006W6Q',
        'EquityStyleBox metadata should contain performanceId.'
    );

    const stockStyleDataTable = connector.getTable('StockStyle');

    Assert.deepStrictEqual(
        stockStyleDataTable.getColumnIds(),
        ['Style', 'Size', 'Value'],
        'StockStyle table should have expected columns.'
    );

    Assert.ok(
        stockStyleDataTable.getRowCount() > 0,
        'StockStyle table should not return empty rows.'
    );

    Assert.ok(
        stockStyleDataTable.metadata !== undefined,
        'StockStyle table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(stockStyleDataTable.metadata).sort(),
        [
            'effectiveDate',
            'growthScore',
            'performanceId',
            'regionIdCode',
            'regionIdValue',
            'sizeScore',
            'styleBoxCode',
            'styleBoxValue',
            'styleScore',
            'valueScore'
        ],
        'StockStyle table metadata should contain expected properties.'
    );

    const timeSeriesDataTable = connector.getTable('TimeSeries')

    Assert.deepStrictEqual(
        timeSeriesDataTable.getColumnIds(),
        [
            'Date',
            'StyleBox',
            'StyleBoxCode',
            'StyleScore',
            'SizeScore',
            'GrowthScore',
            'ValueScore',
            'Region'
        ],
        'TimeSeries table should have expected columns.'
    );

    Assert.ok(
        timeSeriesDataTable.getRowCount() > 0,
        'TimeSeries table should not return empty rows.'
    );

    Assert.ok(
        timeSeriesDataTable.metadata !== undefined,
        'TimeSeries table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(timeSeriesDataTable.metadata).sort(),
        ['performanceId'],
        'TimeSeries table metadata should contain expected properties.'
    );
}
