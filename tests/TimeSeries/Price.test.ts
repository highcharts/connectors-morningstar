import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';
import MorningstarURL from '../../code/es-modules/Shared/MorningstarURL';

const securityId = 'F0GBR04S23';

export async function priceLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        id: '',
        type: '',
        api,
        currencyId: 'EUR',
        securities: [{
            id: securityId,
            idType: 'MSID'
        }],
        series: {
            type: 'Price',
            priceType: 'PRICE'
        },
        startDate: '2020-01-16',
        endDate: '2020-01-31',
        dataModifier: {
            type: 'Invert'
        }
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
        connector.getTable().getColumnIds(),
        ['Date', securityId],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.getTable().getRowCount(),
        12,
        'Connector table should have 12 expected price rows.'
    );

    Assert.deepStrictEqual(
        connector.getTable().getModified().getColumn('columnIds'),
        ['Date', securityId],
        'Connector inverted table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.getTable().getColumnIds().length,
        connector.getTable().getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
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
