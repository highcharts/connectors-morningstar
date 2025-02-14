import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function cumulativeReturnLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        api,
        currencyId: 'EUR',
        endDate: '2020-12-31',
        securities: [{
            id: 'F0GBR04S23',
            idType: 'MSID'
        }],
        series: {
            type: 'CumulativeReturn'
        },
        startDate: '2020-01-01'
    });

    Assert.ok(
        connector instanceof MC.TimeSeriesConnector,
        'Connector should be instance of TimeSeries class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.TimeSeriesConverters.CumulativeReturnSeriesConverter,
        'Converter should be instance of TimeSeries CumulativeReturnSeriesConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        ['Date', 'F0GBR04S23'],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        366,
        'Connector table should have 366 cumulative return rows.'
    );

}

export async function cumulativeReturnLoadWithFrequency (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        api,
        currencyId: 'EUR',
        endDate: '2020-12-31',
        frequency: 'weekly',
        securities: [{
            id: 'F0GBR04S23',
            idType: 'MSID'
        }],
        series: {
            type: 'CumulativeReturn'
        },
        startDate: '2020-01-01'
    });

    await connector.load();

    Assert.strictEqual(
        connector.table.getRowCount(),
        52,
        'Connector table should have 52 cumulative return rows when frequency is weekly.'
    );
}
