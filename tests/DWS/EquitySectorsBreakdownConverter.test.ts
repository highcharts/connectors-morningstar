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
            MockAssetAlloc: {},
            MockBasicDetails: {},
            EquitySectorsBreakdown: {},
            FixedIncomeSectorsBreakdown: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();

    const dataTable = connector.getTable(),
        columnIds = [
            'SuperSector_Type_0P00000FIA',
            'SuperSector_Long_0P00000FIA',
            'SuperSector_LongRescaled_0P00000FIA',
            'SuperSector_Short_0P00000FIA',
            'SuperSector_Net_0P00000FIA',
            'Sector_Type_0P00000FIA',
            'Sector_Long_0P00000FIA',
            'Sector_LongRescaled_0P00000FIA',
            'Sector_Short_0P00000FIA',
            'Sector_Net_0P00000FIA'
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
