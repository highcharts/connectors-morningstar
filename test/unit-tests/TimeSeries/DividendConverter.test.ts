import * as Assert from 'node:assert/strict';
import * as MorningstarConnectors from '../../../code/morningstar-connectors.src';

export async function rating_load(
    api: MorningstarConnectors.Shared.MorningstarAPIOptions
) {
    const connector = new MorningstarConnectors.TimeSeriesConnector({
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
        connector instanceof MorningstarConnectors.TimeSeriesConnector,
        'Connector should be instance of TimeSeries class.'
    );

    Assert.ok(
        connector.converter instanceof
        MorningstarConnectors.TimeSeriesConverters.DividendSeriesConverter,
        'Converter should be instance of TimeSeries DividendSeriesConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        ['Date', connector.options.securities?.[0].id],
        'Connector table should exist of expected columns.'
    );

}
