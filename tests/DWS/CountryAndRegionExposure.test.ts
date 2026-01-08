import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src'

export async function countryAndRegionExposureConnector (
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
            CountryAndRegionExposure: {}
        }
    });

    await connector.load();

    // Region tests

    const regionEquityTable = connector.getTable('RegionEquity'),
        regionFixedIncomeTable = connector.getTable('RegionFixedIncome'),
        regionFixedIncomeGeoTable = connector.getTable('RegionFixedIncomeGeo');

    Assert.deepStrictEqual(
        regionEquityTable.getColumnIds(),
        [
            'Region',
            'PercLongRescaled',
            'PercNet',
            'PercLong'
        ],
        'Equity table should have expected columns.'
    );

    Assert.ok(
        regionEquityTable.getRowCount() > 0,
        'Equity table should not return empty rows.'
    );

    Assert.ok(
        regionEquityTable.metadata !== undefined,
        'Equity data table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        regionFixedIncomeTable.getColumnIds(),
        [
            'Region',
            'PercLongRescaled',
            'PercNet',
            'PercLong'
        ],
        'Fixed Income table should have expected columns.'
    );

    Assert.ok(
        regionFixedIncomeTable.getRowCount() > 0,
        'Fixed Income table should not return empty rows.'
    );

    Assert.ok(
        regionFixedIncomeTable.metadata !== undefined,
        'Fixed Income data table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        regionFixedIncomeGeoTable.getColumnIds(),
        [
            'Region',
            'CalcNetFiperc',
            'CalcLongFiperc'
        ],
        'Fixed Income Geo table should have expected columns.'
    );

    Assert.ok(
        regionFixedIncomeGeoTable.getRowCount() > 0,
        'Fixed Income Geo table should not return empty rows.'
    );

    Assert.ok(
        regionFixedIncomeGeoTable.metadata !== undefined,
        'Fixed Income Geo data table should have metadata defined.'
    );

    // Country tests

    const countryEquityTable = connector.getTable('CountryEquity'),
        countryBreakdownTable = connector.getTable('CountryBreakdown');

    Assert.deepStrictEqual(
        countryEquityTable.getColumnIds(),
        [
            'Country',
            'PercLongRescaled',
            'PercNet',
            'PercLong'
        ],
        'Country Equity table should have expected columns.'
    );

    Assert.ok(
        countryEquityTable.getRowCount() > 0,
        'Country Equity table should not return empty rows.'
    );

    Assert.ok(
        countryEquityTable.metadata !== undefined,
        'Country Equity data table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        countryBreakdownTable.getColumnIds(),
        [
            'Country',
            'CalcLongFiperc',
            'CalcNetFiperc'
        ],
        'Country Breakdown table should have expected columns.'
    );

    Assert.ok(
        countryBreakdownTable.getRowCount() > 0,
        'Country Breakdown table should not return empty rows.'
    );

    Assert.ok(
        countryBreakdownTable.metadata !== undefined,
        'Country Breakdown data table should have metadata defined.'
    );
}
