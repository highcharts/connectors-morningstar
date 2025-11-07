import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';
import { isNumber } from 'highcharts';

const securityId = 'F0GBR04S23';

export async function returnLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.TimeSeriesConnector({
        id: '',
        type: '',
        api,
        currencyId: 'EUR',
        endDate: '2020-01-31',
        securities: [{
            id: securityId,
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
        connector.getTable().getColumnIds(),
        ['Date', securityId],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.getTable().getRowCount(),
        31,
        'Connector table should have 31 return rows.'
    );

     Assert.strictEqual(
        isNumber(connector.getTable().getCell(securityId, 0)),
        true,
        'Connector table cell value should be a valid number.'
    );

}
