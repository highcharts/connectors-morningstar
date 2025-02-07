import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';
import { isNumber } from 'highcharts';

export async function returnLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        api,
        currencyId: 'EUR',
        endDate: '2020-01-31',
        securities: [{
            id: 'F0GBR04S23',
            idType: 'MSID'
        }],
        series: {
            type: 'Return'
        },
        startDate: '2020-01-01'
    });

    Assert.ok(
        connector instanceof MC.TimeSeriesConnector,
        'Connector should be instance of TimeSeries class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.TimeSeriesConverters.ReturnSeriesConverter,
        'Converter should be instance of TimeSeries ReturnSeriesConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        ['Date', connector.options.securities?.[0].id],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        31,
        'Connector table should have 31 return rows.'
    );

     Assert.strictEqual(
        isNumber(connector.table.getCell('F0GBR04S23', 0)),
        true,
        'Connector table cell value should be a valid number.'
    );

}
