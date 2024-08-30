import * as Assert from 'node:assert/strict';
import * as MC from '../../../code/connectors-morningstar.src';

export async function ohlcvLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    // End date does not work in OHLCV. In order to limit the amount of data,
    // the start date is instead calculated as 30 days prior to today.
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 30));
    const securityId = 'XIUSA000O2';

    const connector = new MC.TimeSeriesConnector({
        api,
        currencyId: 'EUR',
        securities: [{
            id: securityId,
            idType: 'SECID'
        }],
        series: {
            type: 'OHLCV'
        },
        startDate: startDate.toISOString().substring(0, 10),
        endDate: endDate.toISOString().substring(0, 10)
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
        [
            'Date', 
            `${securityId}_Open`, 
            `${securityId}_High`, 
            `${securityId}_Low`, 
            `${securityId}_Close`, 
            `${securityId}_Volume`
        ],
        'Connector table should exist of expected columns.'
    );

}
