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
        },
        dataModifier: {
            type: 'Invert'
        }
    }),
    columnNames = [
        'TrailingPerformance_TimePeriod',
        'TrailingPerformance_Value'
    ];

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
        columnNames,
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        10,
        'Connector table should have ten expected RNANews rows.'
    );

    Assert.deepStrictEqual(
        connector.table.modified.getColumn('columnNames'),
        columnNames,
        'Connector inverted table should exist of expected columns.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.table.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
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

export async function portfolioHoldingsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converter: {
            type: 'PortfolioHoldings'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'PortfolioHoldings_Id',
            'PortfolioHoldings_ExternalId',
            'PortfolioHoldings_DetailHoldingTypeId',
            'PortfolioHoldings_ExternalName',
            'PortfolioHoldings_PerformanceId',
            'PortfolioHoldings_ISIN',
            'PortfolioHoldings_CurrencyId',
            'PortfolioHoldings_CountryId',
            'PortfolioHoldings_SecurityName',
            'PortfolioHoldings_Weighting',
            'PortfolioHoldings_IndustryId',
            'PortfolioHoldings_MarketValue',
            'PortfolioHoldings_GlobalSectorId',
            'PortfolioHoldings_NumberOfShare',
            'PortfolioHoldings_LocalCurrencyCode',
            'PortfolioHoldings_GICSIndustryId',
            'PortfolioHoldings_ShareChange'
        ],
        'Portfolio holdings table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
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

export async function MetaLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converter: {
            type: 'Meta'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        ['Meta', 'Value'],
        'Meta table should have Meta and Value columns.'
    );

    Assert.deepStrictEqual(
        connector.table.getColumnNames().length,
        2,
        'Meta table should have two columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 1,
        'Meta table should have multi row structure.'
    );
}
