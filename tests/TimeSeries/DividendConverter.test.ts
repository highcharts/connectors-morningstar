import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function ratingLoad (
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
            type: 'Dividend'
        },
        startDate: '2020-01-01'
    });

    Assert.ok(
        connector instanceof MC.TimeSeriesConnector,
        'Connector should be instance of TimeSeries class.'
    );

    Assert.ok(
        connector.converter instanceof MC.TimeSeriesConverters.DividendSeriesConverter,
        'Converter should be instance of TimeSeries DividendSeriesConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        ['Date', connector.options.securities?.[0].id],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        1,
        'Connector table should have one expected dividend row.'
    );

}
