import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function securityDetailsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        }
    });

    Assert.ok(
        connector instanceof MC.SecurityDetailsConnector,
        'Connector should be instance of SecurityDetailsConnector class.'
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
            'SecurityDetails_TrailingPerformance_TimePeriod',
            'SecurityDetails_TrailingPerformance_Value'
        ],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        10,
        'Connector table should have ten expected RNANews rows.'
    );

    Assert.deepStrictEqual(
        connector.metadata,
        {
            columns: {},
            id: 'F0GBR050DD',
            isin: 'GB0004460357'
        }
    );
}

export async function assetAllocationsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        type: 'AssetAllocations'
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'AssetAllocations_Type',
            'AssetAllocations_MorningstarEUR3_L',
            'AssetAllocations_MorningstarEUR3_S',
            'AssetAllocations_MorningstarEUR3_N'
        ],
        'Asset allocations table should exist of expected columns.'
    );
}

export async function regionalExposureLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        type: 'RegionalExposure'
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'RegionalExposure_Type',
            'RegionalExposure_L_0.64368',
            'RegionalExposure_S_100',
            'RegionalExposure_N_0.64368'
        ],
        'Regional exposure table should exist of expected columns.'
    );
}

export async function globalStockSectorBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        type: 'GlobalStockSectorBreakdown'
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'GlobalStockSectorBreakdown_Type',
            'GlobalStockSectorBreakdown_L_0.64369',
            'GlobalStockSectorBreakdown_S_100',
            'GlobalStockSectorBreakdown_N_0.64369'
        ],
        'Global stock sector breakdown table should exist of expected columns.'
    );
}

export async function countryExposureLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        type: 'CountryExposure'
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'CountryExposure_Type',
            'CountryExposure_Bond_L_99.98311',
            'CountryExposure_Bond_S_100',
            'CountryExposure_Bond_N_99.98311',
            'CountryExposure_Equity_L_0.64368',
            'CountryExposure_Equity_S_100',
            'CountryExposure_Equity_N_0.64368'
        ],
        'Country exposure table should exist of expected columns.'
    );
}
