import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function fixedIncomeSectorsBreakdown (
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
            FixedIncomeSectorsBreakdown: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();
    const dataTable = connector.getTable('IncSuperSectors');

    Assert.deepStrictEqual(
        dataTable.getColumnIds(),
        ['Fixed_Inc_Type', 'Fixed_Inc_PercLongRescaled', 'Fixed_Inc_PercNet', 'Fixed_Inc_PercLong'],
        'Fixed Income Sectors Breakdown table should have expected columns.'
    );

    Assert.ok(
        dataTable.getRowCount() > 0,
        'Fixed Income Sectors Breakdown table should not return empty rows.'
    );
}
