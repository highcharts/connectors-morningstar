import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function equitySectorsBreakdown (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.InvestmentsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: '0P00000FIA'
        },
        converters: {
            EquitySectorsBreakdown: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();
    const dataTable = connector.getTable('EqSuperSectors');

    Assert.deepStrictEqual(
        dataTable.getColumnIds(),
        ['Type', 'PercLong', 'PercLongRescaled', 'PercNet'],
        'Equity Sectors Breakdown table should have expected columns.'
    );

    Assert.ok(
        dataTable.getRowCount() > 0,
        'Equity Sectors Breakdown table should not return empty rows.'
    );
}
