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
        },
        dataModifier: {
            type: 'Invert'
        }
    }),
    columnNames = [
        'TrailingPerformance_TimePeriod_F0GBR050DD',
        'TrailingPerformance_Value_F0GBR050DD',
        'TrailingPerformance_TimePeriod_F00000Q5PZ',
        'TrailingPerformance_Value_F00000Q5PZ'
    ];

    Assert.ok(
        connector instanceof MC.SecurityCompareConnector,
        'Connector should be instance of SecurityCompareConnector class.'
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
        'Connector table should have row count of 10.'
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

export async function portfolioHoldings (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
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
            'PortfolioHoldings_Id_F0GBR050DD',
            'PortfolioHoldings_ExternalId_F0GBR050DD',
            'PortfolioHoldings_DetailHoldingTypeId_F0GBR050DD',
            'PortfolioHoldings_ExternalName_F0GBR050DD',
            'PortfolioHoldings_PerformanceId_F0GBR050DD',
            'PortfolioHoldings_ISIN_F0GBR050DD',
            'PortfolioHoldings_CurrencyId_F0GBR050DD',
            'PortfolioHoldings_CountryId_F0GBR050DD',
            'PortfolioHoldings_SecurityName_F0GBR050DD',
            'PortfolioHoldings_Weighting_F0GBR050DD',
            'PortfolioHoldings_IndustryId_F0GBR050DD',
            'PortfolioHoldings_MarketValue_F0GBR050DD',
            'PortfolioHoldings_GlobalSectorId_F0GBR050DD',
            'PortfolioHoldings_NumberOfShare_F0GBR050DD',
            'PortfolioHoldings_LocalCurrencyCode_F0GBR050DD',
            'PortfolioHoldings_GICSIndustryId_F0GBR050DD',
            'PortfolioHoldings_ShareChange_F0GBR050DD',
            'PortfolioHoldings_Id_F00000Q5PZ',
            'PortfolioHoldings_ExternalId_F00000Q5PZ',
            'PortfolioHoldings_DetailHoldingTypeId_F00000Q5PZ',
            'PortfolioHoldings_ExternalName_F00000Q5PZ',
            'PortfolioHoldings_PerformanceId_F00000Q5PZ',
            'PortfolioHoldings_ISIN_F00000Q5PZ',
            'PortfolioHoldings_CurrencyId_F00000Q5PZ',
            'PortfolioHoldings_CountryId_F00000Q5PZ',
            'PortfolioHoldings_SecurityName_F00000Q5PZ',
            'PortfolioHoldings_Weighting_F00000Q5PZ',
            'PortfolioHoldings_IndustryId_F00000Q5PZ',
            'PortfolioHoldings_MarketValue_F00000Q5PZ',
            'PortfolioHoldings_GlobalSectorId_F00000Q5PZ',
            'PortfolioHoldings_NumberOfShare_F00000Q5PZ',
            'PortfolioHoldings_GICSIndustryId_F00000Q5PZ',
            'PortfolioHoldings_ShareChange_F00000Q5PZ',
            'PortfolioHoldings_CUSIP_F00000Q5PZ'
        ],
        'PortfolioHoldings table should exist of expected columns'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function marketCapLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        converter: {
            type: 'MarketCap'
        },
        viewIds: 'HSsnapshot',
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'MarketCap_Type_F0GBR050DD',
            'MarketCap_Assets_F0GBR050DD',
            'MarketCap_NotClassified_F0GBR050DD',
            'MarketCap_N_F0GBR050DD',
            'MarketCap_Type_F00000Q5PZ',
            'MarketCap_Assets_F00000Q5PZ',
            'MarketCap_NotClassified_F00000Q5PZ',
            'MarketCap_N_F00000Q5PZ'
        ],
        'MarketCap table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function industryBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        converter: {
            type: 'IndustryBreakdown'
        },
        viewIds: 'HSsnapshot',
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'IndustryBreakdown_Type_F0GBR050DD',
            'IndustryBreakdown_Assets_F0GBR050DD',
            'IndustryBreakdown_NotClassified_F0GBR050DD',
            'IndustryBreakdown_N_F0GBR050DD',
            'IndustryBreakdown_Type_F00000Q5PZ',
            'IndustryBreakdown_Assets_F00000Q5PZ',
            'IndustryBreakdown_NotClassified_F00000Q5PZ',
            'IndustryBreakdown_N_F00000Q5PZ'
        ],
        'IndustryBreakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function industryGroupBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        converter: {
            type: 'IndustryGroupBreakdown'
        },
        viewIds: 'HSsnapshot',
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'IndustryGroupBreakdown_Type_F0GBR050DD',
            'IndustryGroupBreakdown_Assets_F0GBR050DD',
            'IndustryGroupBreakdown_NotClassified_F0GBR050DD',
            'IndustryGroupBreakdown_N_F0GBR050DD',
            'IndustryGroupBreakdown_Type_F00000Q5PZ',
            'IndustryGroupBreakdown_Assets_F00000Q5PZ',
            'IndustryGroupBreakdown_NotClassified_F00000Q5PZ',
            'IndustryGroupBreakdown_N_F00000Q5PZ'
        ],
        'IndustryGroupBreakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function bondStatisticsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        converter: {
            type: 'BondStatistics'
        },
        viewIds: 'HSsnapshot',
        security: {
            ids: ['F000015O71', 'F000015O6Z'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'StyleBox_F000015O71',
            'EffectiveDuration_F000015O71',
            'AverageCoupon_F000015O71',
            'AverageCreditQuality_F000015O71',
            'AverageCreditQualityCode_F000015O71',
            'AveragePrice_F000015O71',
            'YieldToMaturity_F000015O71',
            'ModifiedDuration_F000015O71',
            'EffectiveMaturity_F000015O71',
            'CurrentYield_F000015O71',
            'StyleBox_F000015O6Z',
            'EffectiveDuration_F000015O6Z',
            'AverageCoupon_F000015O6Z',
            'AverageCreditQuality_F000015O6Z',
            'AverageCreditQualityCode_F000015O6Z',
            'AveragePrice_F000015O6Z',
            'YieldToMaturity_F000015O6Z',
            'ModifiedDuration_F000015O6Z',
            'EffectiveMaturity_F000015O6Z',
            'CurrentYield_F000015O6Z'
        ],
        'BondStatistics table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function MetaLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        converter: {
            type: 'Meta'
        },
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'Meta_F0GBR050DD',
            'Value_F0GBR050DD',
            'Meta_F00000Q5PZ',
            'Value_F00000Q5PZ'
        ],
        'Meta table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function bondStyleBoxBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        api,
        security: {
            ids: ['F00001GPCX', 'FOUSA04AL4'],
            idType: 'MSID'
        },
        converter: {
            type: 'BondStyleBoxBreakdown'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'BondStyleBoxBreakdown_Type_F00001GPCX',
            'BondStyleBoxBreakdown_N_F00001GPCX',
            'BondStyleBoxBreakdown_Type_FOUSA04AL4',
            'BondStyleBoxBreakdown_N_FOUSA04AL4'
        ],
        'Bond Style Box Breakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
