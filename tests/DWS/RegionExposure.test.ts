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
            RegionExposure: {}
        }
    });

    await connector.load();

    const equityTable = connector.getTable('Equity'),
        fixedIncomeTable = connector.getTable('FixedIncome'),
        fixedIncomeGeoTable = connector.getTable('FixedIncomeGeo');

    Assert.deepStrictEqual(
        equityTable.getColumnIds(),
        [
            'Region',
            'PercLongRescaled',
            'PercNet',
            'PercLong'
        ],
        'Equity table should have expected columns.'
    );

    Assert.ok(
        equityTable.getRowCount() > 0,
        'Equity table should not return empty rows.'
    );

    Assert.ok(
        equityTable.metadata !== undefined,
        'Equity data table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        fixedIncomeTable.getColumnIds(),
        [
            'Region',
            'PercLongRescaled',
            'PercNet',
            'PercLong'
        ],
        'Equity table should have expected columns.'
    );

    Assert.ok(
        fixedIncomeTable.getRowCount() > 0,
        'Fixed Income table should not return empty rows.'
    );

    Assert.ok(
        fixedIncomeTable.metadata !== undefined,
        'Fixed Income data table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        fixedIncomeGeoTable.getColumnIds(),
        [
            'Region',
            'CalcNetFiperc',
            'CalcLongFiperc'
        ],
        'Equity table should have expected columns.'
    );

    Assert.ok(
        fixedIncomeGeoTable.getRowCount() > 0,
        'Fixed Income Geo table should not return empty rows.'
    );

    Assert.ok(
        fixedIncomeGeoTable.metadata !== undefined,
        'Fixed Income Geo data table should have metadata defined.'
    );
}
