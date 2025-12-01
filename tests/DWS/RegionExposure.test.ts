import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src'

export async function regionExposureConnector (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.InvestmentsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: '0P0000XTUQ'
        },
        converters: {
            RegionExposure: {},
            MockBasicDetails: {}
        }
    });

    await connector.load();

    const dataTable = connector.getTable('RegionExposure'),
        expectedColumnIds = [
            'Region',
            'FixedIncomeGeographic_CalcNetFiperc',
            'FixedIncomeGeographic_CalcLongFiperc',
            'FixedIncome_PercLongRescaled',
            'FixedIncome_Perc',
            'FixedIncome_PercNet',
            'FixedIncome_PercLong',
            'Equity_PercLongRescaled',
            'Equity_Perc',
            'Equity_PercNet',
            'Equity_PercLong'
        ];

    Assert.deepStrictEqual(
        dataTable.getColumnIds(),
        expectedColumnIds,
        'Region Exposure converter should have expected columns.'
    );

    Assert.ok(
        dataTable.getRowCount() > 0,
        'Region Exposure table should not return empty rows.'
    );

    Assert.ok(
        dataTable.metadata !== undefined,
        'Region Exposure data table should have metadata defined.'
    )

    Assert.strictEqual(
        dataTable.metadata.performanceId,
        '0P0000XTUQ',
        'Region Exposure metadata should contain correct performanceId information.'
    );
}
