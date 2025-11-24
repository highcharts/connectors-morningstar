import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../../code/connectors-morningstar.src';

export async function regionExposureConnector (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.RegionExposureConnector({
        id: '',
        type: '',
        api,
        security: {
            id: '0P0000XTUQ',
            idType: 'performanceId'
        }
    });

    Assert.ok(
        connector instanceof MC.RegionExposureConnector,
        'Connector should be instance of FakeConnector class.'
    );

    await connector.load();

    const dataTable = connector.getTable(),
        expectedColumnIds = [
            'Region',
            'FixedIncomeGeographic_CalcNetFiperc',
            'FixedIncomeGeographic_CalcLongFiperc',
            'FixedIncome_PercLongRescaled',
            'FixedIncome_PercNet',
            'FixedIncome_PercLong',
            'Equity_PercLongRescaled',
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

    Assert.strictEqual(
        connector.metadata.performanceId,
        '0P0000XTUQ',
        'Connector metadata should contain correct performanceId information.'
    );
}
