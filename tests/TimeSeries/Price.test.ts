import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';
import MorningstarURL from '../../src/Shared/MorningstarURL';

export async function priceLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        api,
        currencyId: 'EUR',
        securities: [{
            id: 'F0GBR04S23',
            idType: 'MSID'
        }],
        series: {
            type: 'Price',
            priceType: 'PRICE'
        },
        startDate: '2020-01-16',
        endDate: '2020-01-31'
    });

    Assert.ok(
        connector instanceof MC.TimeSeriesConnector,
        'Connector should be instance of TimeSeries class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.TimeSeriesConverters.PriceSeriesConverter,
        'Converter should be instance of TimeSeries PriceSeriesConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        ['Date', connector.options.securities?.[0].id],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        12,
        'Connector table should have 12 expected price rows.'
    );

}


export function decorateURL () {
    const priceConverter = new MC.TimeSeriesConverters.PriceSeriesConverter({
        type: 'Price',
        priceType: 'PRICE'
    });


    const url = new MorningstarURL('/ecint/v1/' + priceConverter.path, 'http://mock-api.com');
    priceConverter.decorateURL(url);

    Assert.equal(
        url.href,
        'http://mock-api.com/ecint/v1/timeseries/price?priceType=PRICE',
        'URL should be decorated with priceType'
    );
}
