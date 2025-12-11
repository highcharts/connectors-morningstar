import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';
import * as MCDWS from '../../code/connectors-morningstar-dws.src';

export async function bothAPIs (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        dataModifier: {
            type: 'Invert'
        }
    });

    Assert.ok(
        connector instanceof MC.SecurityDetailsConnector,
        'Connector should be instance of SecurityDetailsConnector class.'
    );

    await connector.load();
    const dataTable = connector.dataTables.TrailingPerformance;

    Assert.deepStrictEqual(
        dataTable.getColumnIds(),
        [
            'Nav_DayEnd_TimePeriod',
            'Nav_DayEnd_Date',
            'Nav_DayEnd_Value',
            'GbPostTax_DayEnd_TimePeriod',
            'GbPostTax_DayEnd_Date',
            'GbPostTax_DayEnd_Value',
            'ItPostTax_DayEnd_TimePeriod',
            'ItPostTax_DayEnd_Date',
            'ItPostTax_DayEnd_Value'
        ],
        'Trailing Performance table should have expected columns.'
    );

    Assert.ok(
        dataTable.getRowCount() > 0,
        'Trailing Performance table should not return empty rows.'
    );

    const dwsConnector = new MCDWS.InvestmentsConnector({
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
        dwsConnector instanceof MCDWS.InvestmentsConnector,
        'DWS connector should be instance of InvestmentsConnector class.'
    );

    await dwsConnector.load();
    const dwsDataTable = dwsConnector.getTable('EqSuperSectors');

    Assert.deepStrictEqual(
        dwsDataTable.getColumnIds(),
        ['Type', 'PercLong', 'PercLongRescaled', 'PercNet'],
        'DWS Equity Sectors Breakdown table should have expected columns.'
    );

    Assert.ok(
        dwsDataTable.getRowCount() > 0,
        'DWS Equity Sectors Breakdown table should not return empty rows.'
    );
}
