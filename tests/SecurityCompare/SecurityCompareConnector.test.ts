import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function securityCompareLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    Assert.ok(
        connector instanceof MC.SecurityCompareConnector,
        'Connector should be instance of SecurityCompareConnector class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.SecurityDetailsConverter,
        'Converter should be instance of SecurityDetailsConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'TrailingPerformance_TimePeriod_F0GBR050DD',
            'TrailingPerformance_Value_F0GBR050DD',
            'TrailingPerformance_TimePeriod_F00000Q5PZ',
            'TrailingPerformance_Value_F00000Q5PZ'
        ],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        10,
        'Connector table should have row count of 10.'
    );

    Assert.deepStrictEqual(
        connector.metadata,
        {
            columns: {},
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            isins: ['GB0004460357', 'LU0593848723']
        }
    );
}

export async function assetAllocationsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converter: {
            type: 'AssetAllocations'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'AssetAllocations_Type_F0GBR050DD',
            'AssetAllocations_MorningstarEUR3_L_F0GBR050DD',
            'AssetAllocations_MorningstarEUR3_S_F0GBR050DD',
            'AssetAllocations_MorningstarEUR3_N_F0GBR050DD',
            'AssetAllocations_Type_F00000Q5PZ',
            'AssetAllocations_MorningstarEUR3_L_F00000Q5PZ',
            'AssetAllocations_MorningstarEUR3_S_F00000Q5PZ',
            'AssetAllocations_MorningstarEUR3_N_F00000Q5PZ'
        ],
        'Asset allocations table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function regionalExposureLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converter: {
            type: 'RegionalExposure'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'RegionalExposure_Type_F0GBR050DD',
            'RegionalExposure_Assets_F0GBR050DD',
            'RegionalExposure_NotClassified_F0GBR050DD',
            'RegionalExposure_L_F0GBR050DD',
            'RegionalExposure_S_F0GBR050DD',
            'RegionalExposure_N_F0GBR050DD',
            'RegionalExposure_Type_F00000Q5PZ',
            'RegionalExposure_Assets_F00000Q5PZ',
            'RegionalExposure_NotClassified_F00000Q5PZ',
            'RegionalExposure_L_F00000Q5PZ',
            'RegionalExposure_S_F00000Q5PZ',
            'RegionalExposure_N_F00000Q5PZ'
        ],
        'RegionalExposure table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function globalStockSectorBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converter: {
            type: 'GlobalStockSectorBreakdown'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'GlobalStockSectorBreakdown_Type_F0GBR050DD',
            'GlobalStockSectorBreakdown_Assets_F0GBR050DD',
            'GlobalStockSectorBreakdown_NotClassified_F0GBR050DD',
            'GlobalStockSectorBreakdown_L_F0GBR050DD',
            'GlobalStockSectorBreakdown_S_F0GBR050DD',
            'GlobalStockSectorBreakdown_N_F0GBR050DD',
            'GlobalStockSectorBreakdown_Type_F00000Q5PZ',
            'GlobalStockSectorBreakdown_Assets_F00000Q5PZ',
            'GlobalStockSectorBreakdown_NotClassified_F00000Q5PZ',
            'GlobalStockSectorBreakdown_L_F00000Q5PZ',
            'GlobalStockSectorBreakdown_S_F00000Q5PZ',
            'GlobalStockSectorBreakdown_N_F00000Q5PZ'
        ],
        'GlobalStockSectorBreakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function countryExposureLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converter: {
            type: 'CountryExposure'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'CountryExposure_Assets_F0GBR050DD',
            'CountryExposure_NotClassified_F0GBR050DD',
            'CountryExposure_Type_F0GBR050DD',
            'CountryExposure_Equity_L_F0GBR050DD',
            'CountryExposure_Equity_S_F0GBR050DD',
            'CountryExposure_Equity_N_F0GBR050DD',
            'CountryExposure_Assets_F00000Q5PZ',
            'CountryExposure_NotClassified_F00000Q5PZ',
            'CountryExposure_Type_F00000Q5PZ',
            'CountryExposure_Equity_L_F00000Q5PZ',
            'CountryExposure_Equity_S_F00000Q5PZ',
            'CountryExposure_Equity_N_F00000Q5PZ'
        ],
        'CountryExposure table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
