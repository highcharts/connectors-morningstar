import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

const securityId = 'F0GBR04S23';

export async function ratingLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        api,
        currencyId: 'EUR',
        endDate: '2020-12-31',
        securities: [{
            id: securityId,
            idType: 'MSID'
        }],
        series: {
            type: 'Rating'
        },
        startDate: '2020-01-01'
    });

    Assert.ok(
        connector instanceof MC.TimeSeriesConnector,
        'Connector should be instance of TimeSeries class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.TimeSeriesConverters.RatingSeriesConverter,
        'Converter should be instance of TimeSeries RatingSeriesConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        ['Date', securityId],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        12,
        'Connector table should have 12 expected rating rows.'
    );

}
