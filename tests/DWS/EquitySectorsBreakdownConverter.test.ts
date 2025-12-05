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
            EquitySectorsBreakdown: {},
            FixedIncomeSectorsBreakdown: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();

    const dataTable = connector.getTable('EquitySectorsBreakdown'),
        columnIds = [
            'SuperSector_Type_0P00000FIA',
            'SuperSector_PercLong_0P00000FIA',
            'SuperSector_PercLongRescaled_0P00000FIA',
            'SuperSector_PercNet_0P00000FIA',
            'Sector_Type_0P00000FIA',
            'Sector_PercLong_0P00000FIA',
            'Sector_PercLongRescaled_0P00000FIA',
            'Sector_PercNet_0P00000FIA',
            'Industry_Type_0P00000FIA',
            'Industry_PercLong_0P00000FIA',
            'Industry_PercLongRescaled_0P00000FIA',
            'Industry_PercNet_0P00000FIA'
        ];

    Assert.deepStrictEqual(
        dataTable.getColumnIds(),
        columnIds,
        'Sectors breakdown converter should have expected columns.'
    );

    Assert.ok(
        dataTable.getRowCount() > 0,
        'Sectors breakdown table should not return empty rows.'
    );
}
