import * as Assert from 'node:assert/strict';
import * as MC from '../../../code/connectors-morningstar.src';

export async function ohlcvLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        api,
        currencyId: 'EUR',
        securities: [{
            id: 'XIUSA000O2',
            idType: 'SECID'
        }],
        series: {
            type: 'OHLCV'
        },
        startDate: '2020-01-16',
        endDate: '2020-01-16'
    });

    Assert.ok(
        connector instanceof MC.TimeSeriesConnector,
        'Connector should be instance of TimeSeries class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.TimeSeriesConverters.OHLCVSeriesConverter,
        'Converter should be instance of TimeSeries OHLCVSeriesConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        ['Id', 'Date', 'Open', 'High', 'Low', 'Close', 'Value'],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        12,
        'Connector table should have 12 expected OHLCV rows.'
    );

}