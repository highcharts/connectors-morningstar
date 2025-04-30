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
        connector.converter instanceof MC.TrailingPerformanceConverter,
        'Converter should be instance of TrailingPerformanceConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'TrailingPerformance_TimePeriod',
            'TrailingPerformance_Value'
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
        converter: {
            type: 'AssetAllocations'
        }
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
        converter: {
            type: 'RegionalExposure'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames()[0],
        'RegionalExposure_Type',
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
        converter: {
            type: 'GlobalStockSectorBreakdown'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames()[0],
        'GlobalStockSectorBreakdown_Type',
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
        converter: {
            type: 'CountryExposure'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'CountryExposure_Assets',
            'CountryExposure_NotClassified',
            'CountryExposure_Type',
            'CountryExposure_Bond_L',
            'CountryExposure_Bond_S',
            'CountryExposure_Bond_N',
            'CountryExposure_Equity_L',
            'CountryExposure_Equity_S',
            'CountryExposure_Equity_N'
        ],
        'Country exposure table should exist of expected columns.'
    );
}

export async function marketCapLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        api,
        converter: {
            type: 'MarketCap'
        },
        viewId: 'HSsnapshot',
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'MarketCap_Type',
            'MarketCap_Assets',
            'MarketCap_NotClassified',
            'MarketCap_N'
        ],
        'MarketCap table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
