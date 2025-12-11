import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';

export async function securityCompareLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
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
        'Nav_DayEnd_TimePeriod_F0GBR050DD',
        'Nav_DayEnd_Date_F0GBR050DD',
        'Nav_DayEnd_Value_F0GBR050DD',
        'GbPostTax_DayEnd_TimePeriod_F0GBR050DD',
        'GbPostTax_DayEnd_Date_F0GBR050DD',
        'GbPostTax_DayEnd_Value_F0GBR050DD',
        'ItPostTax_DayEnd_TimePeriod_F0GBR050DD',
        'ItPostTax_DayEnd_Date_F0GBR050DD',
        'ItPostTax_DayEnd_Value_F0GBR050DD',
        'Nav_DayEnd_TimePeriod_F00000Q5PZ',
        'Nav_DayEnd_Date_F00000Q5PZ',
        'Nav_DayEnd_Value_F00000Q5PZ',
        'GbPostTax_DayEnd_TimePeriod_F00000Q5PZ',
        'GbPostTax_DayEnd_Date_F00000Q5PZ',
        'GbPostTax_DayEnd_Value_F00000Q5PZ',
        'ItPostTax_DayEnd_TimePeriod_F00000Q5PZ',
        'ItPostTax_DayEnd_Date_F00000Q5PZ',
        'ItPostTax_DayEnd_Value_F00000Q5PZ'
    ];

    Assert.ok(
        connector instanceof MC.SecurityCompareConnector,
        'Connector should be instance of SecurityCompareConnector class.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.getColumnIds(),
        columnNames,
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.dataTables.TrailingPerformance.getRowCount(),
        10,
        'Connector table should have row count of 10.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.getModified().getColumn('columnIds'),
        columnNames,
        'Connector inverted table should exist of expected columns.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.dataTables.TrailingPerformance.getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

    Assert.deepStrictEqual(
        connector.metadata.ids,
        ['F0GBR050DD', 'F00000Q5PZ'],
        'Connector metadata should have the correct ids.'
    );

    Assert.deepStrictEqual(
        connector.metadata.isins,
        ['GB0004460357', 'LU0593848723'],
        'Connector metadata should have the correct isins.'
    )
}

export async function securityCompareBackwardsCompatibility (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
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
        connector.dataTables.AssetAllocations.getColumnIds(),
        [
            'MorningstarEUR3_Type_F0GBR050DD',
            'MorningstarEUR3_L_F0GBR050DD',
            'MorningstarEUR3_S_F0GBR050DD',
            'MorningstarEUR3_N_F0GBR050DD',
            'MorningstarEUR3_Type_F00000Q5PZ',
            'MorningstarEUR3_L_F00000Q5PZ',
            'MorningstarEUR3_S_F00000Q5PZ',
            'MorningstarEUR3_N_F00000Q5PZ'
        ],
        `Converter type backwards compatibility: Asset allocations table should
        exist of expected columns.`
    );

    Assert.ok(
        connector.dataTables.AssetAllocations.getRowCount() > 0,
        'Converter type backwards compatibility: Connector should not return empty rows.'
    );
}

export async function assetAllocationsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converters: ['AssetAllocations']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.AssetAllocations.getColumnIds(),
        [
            'MorningstarEUR3_Type_F0GBR050DD',
            'MorningstarEUR3_L_F0GBR050DD',
            'MorningstarEUR3_S_F0GBR050DD',
            'MorningstarEUR3_N_F0GBR050DD',
            'MorningstarEUR3_Type_F00000Q5PZ',
            'MorningstarEUR3_L_F00000Q5PZ',
            'MorningstarEUR3_S_F00000Q5PZ',
            'MorningstarEUR3_N_F00000Q5PZ'
        ],
        'Asset allocations table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.AssetAllocations.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function regionalExposureLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converters: ['RegionalExposure']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.RegionalExposure.getColumnIds(),
        [
            'Type_F0GBR050DD',
            'NotClassified_F0GBR050DD',
            'L_F0GBR050DD',
            'S_F0GBR050DD',
            'N_F0GBR050DD',
            'Type_F00000Q5PZ',
            'NotClassified_F00000Q5PZ',
            'L_F00000Q5PZ',
            'S_F00000Q5PZ',
            'N_F00000Q5PZ'
        ],
        'RegionalExposure table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.RegionalExposure.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function globalStockSectorBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converters: ['GlobalStockSectorBreakdown']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.GlobalStockSectorBreakdown.getColumnIds(),
        [
            'Type_F0GBR050DD',
            'NotClassified_F0GBR050DD',
            'L_F0GBR050DD',
            'S_F0GBR050DD',
            'N_F0GBR050DD',
            'Type_F00000Q5PZ',
            'NotClassified_F00000Q5PZ',
            'L_F00000Q5PZ',
            'S_F00000Q5PZ',
            'N_F00000Q5PZ'
        ],
        'GlobalStockSectorBreakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.GlobalStockSectorBreakdown.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function countryExposureLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converters: ['CountryExposure']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.CountryExposure.getColumnIds(),
        [
            'Type_F0GBR050DD',
            'NotClassified_F0GBR050DD',
            'Bond_L_F0GBR050DD',
            'Bond_S_F0GBR050DD',
            'Bond_N_F0GBR050DD',
            'Equity_L_F0GBR050DD',
            'Equity_S_F0GBR050DD',
            'Equity_N_F0GBR050DD',
            'Type_F00000Q5PZ',
            'NotClassified_F00000Q5PZ',
            'Equity_L_F00000Q5PZ',
            'Equity_S_F00000Q5PZ',
            'Equity_N_F00000Q5PZ'
        ],
        'CountryExposure table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.CountryExposure.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function portfolioHoldings (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converters: ['PortfolioHoldings']
    });

    await connector.load();


    Assert.deepStrictEqual(
        connector.dataTables.PortfolioHoldings.getColumnIds().sort(),
        [
            'Id_F0GBR050DD',
            'ExternalId_F0GBR050DD',
            'DetailHoldingTypeId_F0GBR050DD',
            'ExternalName_F0GBR050DD',
            'PerformanceId_F0GBR050DD',
            'ISIN_F0GBR050DD',
            'CurrencyId_F0GBR050DD',
            'CountryId_F0GBR050DD',
            'SecurityName_F0GBR050DD',
            'Weighting_F0GBR050DD',
            'IndustryId_F0GBR050DD',
            'MarketValue_F0GBR050DD',
            'GlobalSectorId_F0GBR050DD',
            'NumberOfShare_F0GBR050DD',
            'LocalCurrencyCode_F0GBR050DD',
            'GICSIndustryId_F0GBR050DD',
            'ShareChange_F0GBR050DD',
            'Id_F00000Q5PZ',
            'ExternalId_F00000Q5PZ',
            'DetailHoldingTypeId_F00000Q5PZ',
            'ExternalName_F00000Q5PZ',
            'PerformanceId_F00000Q5PZ',
            'ISIN_F00000Q5PZ',
            'CurrencyId_F00000Q5PZ',
            'CountryId_F00000Q5PZ',
            'SecurityName_F00000Q5PZ',
            'Weighting_F00000Q5PZ',
            'IndustryId_F00000Q5PZ',
            'MarketValue_F00000Q5PZ',
            'GlobalSectorId_F00000Q5PZ',
            'NumberOfShare_F00000Q5PZ',
            'GICSIndustryId_F00000Q5PZ',
            'ShareChange_F00000Q5PZ'
        ].sort(),
        'PortfolioHoldings table should exist of expected columns'
    );

    Assert.ok(
        connector.dataTables.PortfolioHoldings.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function marketCapLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        converters: ['MarketCap'],
        viewIds: 'HSsnapshot',
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.MarketCap.getColumnIds(),
        [
            'Type_F0GBR050DD',
            'NotClassified_F0GBR050DD',
            'N_F0GBR050DD',
            'Type_F00000Q5PZ',
            'NotClassified_F00000Q5PZ',
            'N_F00000Q5PZ'
        ],
        'MarketCap table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.MarketCap.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function industryBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        converters: ['IndustryBreakdown'],
        viewIds: 'HSsnapshot',
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.IndustryBreakdown.getColumnIds(),
        [
            'Type_F0GBR050DD',
            'NotClassified_F0GBR050DD',
            'N_F0GBR050DD',
            'Type_F00000Q5PZ',
            'NotClassified_F00000Q5PZ',
            'N_F00000Q5PZ'
        ],
        'IndustryBreakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.IndustryBreakdown.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function industryGroupBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        converters: ['IndustryGroupBreakdown'],
        viewIds: 'HSsnapshot',
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.IndustryGroupBreakdown.getColumnIds(),
        [
            'Type_F0GBR050DD',
            'NotClassified_F0GBR050DD',
            'N_F0GBR050DD',
            'Type_F00000Q5PZ',
            'NotClassified_F00000Q5PZ',
            'N_F00000Q5PZ'
        ],
        'IndustryGroupBreakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.IndustryGroupBreakdown.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function bondStatisticsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        converters: ['BondStatistics'],
        viewIds: 'HSsnapshot',
        security: {
            ids: ['F000015O71', 'F000015O6Z'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.BondStatistics.getColumnIds(),
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
        connector.dataTables.BondStatistics.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function metaLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        converters: ['Meta'],
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.Meta.getColumnIds(),
        [
            'Meta_F0GBR050DD',
            'Value_F0GBR050DD',
            'Meta_F00000Q5PZ',
            'Value_F00000Q5PZ'
        ],
        'Meta table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.Meta.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function bondStyleBoxBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
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
        connector.dataTables.BondStyleBoxBreakdown.getColumnIds(),
        [
            'Type_F00001GPCX',
            'N_F00001GPCX',
            'Term_F00001GPCX',
            'Quality_F00001GPCX',
            'Type_FOUSA04AL4',
            'N_FOUSA04AL4',
            'Term_FOUSA04AL4',
            'Quality_FOUSA04AL4'
        ],
        'Bond Style Box Breakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.BondStyleBoxBreakdown.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function styleBoxBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        converter: {
            type: 'StyleBoxBreakdown'
        },
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.StyleBoxBreakdown.getColumnIds(),
        [
            'Type_F0GBR050DD',
            'NotClassified_F0GBR050DD',
            'L_F0GBR050DD',
            'S_F0GBR050DD',
            'N_F0GBR050DD',
            'Style_F0GBR050DD',
            'Size_F0GBR050DD',
            'Type_F00000Q5PZ',
            'NotClassified_F00000Q5PZ',
            'L_F00000Q5PZ',
            'S_F00000Q5PZ',
            'N_F00000Q5PZ',
            'Style_F00000Q5PZ',
            'Size_F00000Q5PZ'
        ],
        'Style Box table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.StyleBoxBreakdown.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}


export async function creditQualityLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        converter: {
            type: 'CreditQualityBreakdown'
        },
        security: {
            ids: ['F00001GPCX', 'F00000YG2F'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.CreditQualityBreakdown.getColumnIds(),
        [
            'Type_F00001GPCX',
            'NotClassified_F00001GPCX',
            'L_F00001GPCX',
            'S_F00001GPCX',
            'N_F00001GPCX',
            'Type_F00000YG2F',
            'NotClassified_F00000YG2F',
            'L_F00000YG2F',
            'S_F00000YG2F',
            'N_F00000YG2F'
        ],
        'CreditQualityBreakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.CreditQualityBreakdown.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function historicalPerformanceSeriesLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        converter: {
            type: 'HistoricalPerformanceSeries'
        },
        security: {
            ids: ['F00001GPCX', 'F00000YG2F'],
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.HistoricalPerformanceSeries.getColumnIds(),
        [
            'Nav_M12_Q_Date_F00001GPCX',
            'Nav_M12_Q_Value_F00001GPCX',
            'Nav_M12_Y_Date_F00001GPCX',
            'Nav_M12_Y_Value_F00001GPCX',
            'GbPostTax_M12_Q_Date_F00001GPCX',
            'GbPostTax_M12_Q_Value_F00001GPCX',
            'GbPostTax_M12_Y_Date_F00001GPCX',
            'GbPostTax_M12_Y_Value_F00001GPCX',
            'ItPostTax_M12_Q_Date_F00001GPCX',
            'ItPostTax_M12_Q_Value_F00001GPCX',
            'ItPostTax_M12_Y_Date_F00001GPCX',
            'ItPostTax_M12_Y_Value_F00001GPCX',
            'Nav_M12_Q_Date_F00000YG2F',
            'Nav_M12_Q_Value_F00000YG2F',
            'Nav_M12_Y_Date_F00000YG2F',
            'Nav_M12_Y_Value_F00000YG2F',
            'GbPostTax_M12_Q_Date_F00000YG2F',
            'GbPostTax_M12_Q_Value_F00000YG2F',
            'GbPostTax_M12_Y_Date_F00000YG2F',
            'GbPostTax_M12_Y_Value_F00000YG2F',
            'ItPostTax_M12_Q_Date_F00000YG2F',
            'ItPostTax_M12_Q_Value_F00000YG2F',
            'ItPostTax_M12_Y_Date_F00000YG2F',
            'ItPostTax_M12_Y_Value_F00000YG2F'
],
        'HistoricalPerformanceSeries table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.HistoricalPerformanceSeries.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function riskStatisticsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityCompareConnector({
        id: '',
        type: '',
        api,
        security: {
            ids: ['F0GBR050DD', 'F00000Q5PZ'],
            idType: 'MSID'
        },
        converters: ['RiskStatistics']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.RiskStatistics.getColumnIds().sort(),
        [
            'GbPostTax_MonthEnd_Alphas_F00000Q5PZ',
            'GbPostTax_MonthEnd_Alphas_F0GBR050DD',
            'GbPostTax_MonthEnd_Betas_F00000Q5PZ',
            'GbPostTax_MonthEnd_Betas_F0GBR050DD',
            'GbPostTax_MonthEnd_InformationRatios_F00000Q5PZ',
            'GbPostTax_MonthEnd_InformationRatios_F0GBR050DD',
            'GbPostTax_MonthEnd_RSquareds_F00000Q5PZ',
            'GbPostTax_MonthEnd_RSquareds_F0GBR050DD',
            'GbPostTax_MonthEnd_SharpeRatios_F00000Q5PZ',
            'GbPostTax_MonthEnd_SharpeRatios_F0GBR050DD',
            'GbPostTax_MonthEnd_StandardDeviations_F00000Q5PZ',
            'GbPostTax_MonthEnd_StandardDeviations_F0GBR050DD',
            'GbPostTax_MonthEnd_TrackingErrors_F00000Q5PZ',
            'GbPostTax_MonthEnd_TrackingErrors_F0GBR050DD',
            'ItPostTax_MonthEnd_Alphas_F00000Q5PZ',
            'ItPostTax_MonthEnd_Alphas_F0GBR050DD',
            'ItPostTax_MonthEnd_Betas_F00000Q5PZ',
            'ItPostTax_MonthEnd_Betas_F0GBR050DD',
            'ItPostTax_MonthEnd_InformationRatios_F00000Q5PZ',
            'ItPostTax_MonthEnd_InformationRatios_F0GBR050DD',
            'ItPostTax_MonthEnd_RSquareds_F00000Q5PZ',
            'ItPostTax_MonthEnd_RSquareds_F0GBR050DD',
            'ItPostTax_MonthEnd_SharpeRatios_F00000Q5PZ',
            'ItPostTax_MonthEnd_SharpeRatios_F0GBR050DD',
            'ItPostTax_MonthEnd_StandardDeviations_F00000Q5PZ',
            'ItPostTax_MonthEnd_StandardDeviations_F0GBR050DD',
            'ItPostTax_MonthEnd_TrackingErrors_F00000Q5PZ',
            'ItPostTax_MonthEnd_TrackingErrors_F0GBR050DD',
            'Nav_MonthEnd_Alphas_F00000Q5PZ',
            'Nav_MonthEnd_Alphas_F0GBR050DD',
            'Nav_MonthEnd_Betas_F00000Q5PZ',
            'Nav_MonthEnd_Betas_F0GBR050DD',
            'Nav_MonthEnd_InformationRatios_F00000Q5PZ',
            'Nav_MonthEnd_InformationRatios_F0GBR050DD',
            'Nav_MonthEnd_RSquareds_F00000Q5PZ',
            'Nav_MonthEnd_RSquareds_F0GBR050DD',
            'Nav_MonthEnd_SharpeRatios_F00000Q5PZ',
            'Nav_MonthEnd_SharpeRatios_F0GBR050DD',
            'Nav_MonthEnd_StandardDeviations_F00000Q5PZ',
            'Nav_MonthEnd_StandardDeviations_F0GBR050DD',
            'Nav_MonthEnd_TrackingErrors_F00000Q5PZ',
            'Nav_MonthEnd_TrackingErrors_F0GBR050DD',
            'TimePeriod_F00000Q5PZ',
            'TimePeriod_F0GBR050DD'
        ],
        'RiskStatistics table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.RiskStatistics.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
