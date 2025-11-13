import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';

export async function securityDetailsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
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
        'Nav_DayEnd_TimePeriod',
        'Nav_DayEnd_Date',
        'Nav_DayEnd_Value',
        'GbPostTax_DayEnd_TimePeriod',
        'GbPostTax_DayEnd_Date',
        'GbPostTax_DayEnd_Value',
        'ItPostTax_DayEnd_TimePeriod',
        'ItPostTax_DayEnd_Date',
        'ItPostTax_DayEnd_Value'
    ];

    Assert.ok(
        connector instanceof MC.SecurityDetailsConnector,
        'Connector should be instance of SecurityDetailsConnector class.'
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
        'Connector table should have ten expected RNANews rows.'
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

    Assert.strictEqual(
        connector.metadata.id,
        'F0GBR050DD',
        'Connector metadata should have the correct id.'
    );

    Assert.strictEqual(
        connector.metadata.isin,
        'GB0004460357',
        'Connector metadata should have the correct isin.'
    );
}

export async function securityDetailsBackwardsCompatibility (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
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
        connector.dataTables.AssetAllocations.getColumnIds(),
        [
            'MorningstarEUR3_Type',
            'MorningstarEUR3_L',
            'MorningstarEUR3_S',
            'MorningstarEUR3_N'
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
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['AssetAllocations']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.AssetAllocations.getColumnIds(),
        [
            'MorningstarEUR3_Type',
            'MorningstarEUR3_L',
            'MorningstarEUR3_S',
            'MorningstarEUR3_N'
        ],
        'Asset allocations table should exist of expected columns.'
    );
}

export async function regionalExposureLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['RegionalExposure']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.RegionalExposure.getColumnIds()[0],
        'Type',
        'Regional exposure table should exist of expected columns.'
    );
}

export async function globalStockSectorBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['GlobalStockSectorBreakdown']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.GlobalStockSectorBreakdown.getColumnIds()[0],
        'Type',
        'Global stock sector breakdown table should exist of expected columns.'
    );
}

export async function countryExposureLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['CountryExposure']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.CountryExposure.getColumnIds(),
        [
            'Type',
            'NotClassified',
            'Bond_L',
            'Bond_S',
            'Bond_N',
            'Equity_L',
            'Equity_S',
            'Equity_N'
        ],
        'Country exposure table should exist of expected columns.'
    );
}

export async function portfolioHoldingsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['PortfolioHoldings']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.PortfolioHoldings.getColumnIds().sort(),
        [
            'Id',
            'ExternalId',
            'DetailHoldingTypeId',
            'ExternalName',
            'PerformanceId',
            'ISIN',
            'CurrencyId',
            'CountryId',
            'SecurityName',
            'Weighting',
            'IndustryId',
            'MarketValue',
            'GlobalSectorId',
            'NumberOfShare',
            'LocalCurrencyCode',
            'GICSIndustryId'
        ].sort(),
        'Portfolio holdings table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.PortfolioHoldings.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function marketCapLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        viewId: 'HSsnapshot',
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['MarketCap']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.MarketCap.getColumnIds(),
        [
            'Type',
            'NotClassified',
            'N'
        ],
        'MarketCap table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.MarketCap.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function industryBDCLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        viewId: 'HSsnapshot',
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['IndustryBreakdown']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.IndustryBreakdown.getColumnIds(),
        [
            'Type',
            'NotClassified',
            'N'
        ],
        'IndustryBD table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.IndustryBreakdown.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function industryGroupBDCLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        viewId: 'HSsnapshot',
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['IndustryGroupBreakdown']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.IndustryGroupBreakdown.getColumnIds(),
        [
            'Type',
            'NotClassified',
            'N'
        ],
        'IndustryGroupBD table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.IndustryGroupBreakdown.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}

export async function bondStatisticsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        viewId: 'HSsnapshot',
        security: {
            id: 'F000015O71',
            idType: 'MSID'
        },
        converters: ['BondStatistics']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.BondStatistics.getColumnIds(),
        [
            'StyleBox',
            'EffectiveDuration',
            'AverageCoupon',
            'AverageCreditQuality',
            'AverageCreditQualityCode',
            'AveragePrice',
            'YieldToMaturity',
            'ModifiedDuration',
            'EffectiveMaturity',
            'CurrentYield'
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
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['Meta']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.Meta.getColumnIds(),
        ['Meta', 'Value'],
        'Meta table should have Meta and Value columns.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.Meta.getColumnIds().length,
        2,
        'Meta table should have two columns.'
    );

    Assert.ok(
        connector.dataTables.Meta.getRowCount() > 1,
        'Meta table should have multi row structure.'
    );
}

export async function bondStyleBoxBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: 'F00001GPCX',
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
            'Type',
            'N',
            'Term',
            'Quality'
        ],
        'Bond Style Box Breakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.BondStyleBoxBreakdown.columns['N'].length >= 9,
        'Bond Style Box Breakdown should return at least 9 values.'
    );
}

export async function styleBoxBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converter: {
            type: 'StyleBoxBreakdown'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.StyleBoxBreakdown.getColumnIds(),
        [
            'Type',
            'NotClassified',
            'L',
            'S',
            'N',
            'Style',
            'Size'
        ],
        'Style Box Breakdown table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.StyleBoxBreakdown.columns['N'].length >= 9,
        'Style Box Breakdown should return at least 9 values.'
    );
}


export async function creditQualityLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        converter: {
            type: 'CreditQualityBreakdown'
        },
        security: {
            id: 'F00001GPCX',
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.CreditQualityBreakdown.getColumnIds(),
        [
            'Type',
            'NotClassified',
            'L',
            'S',
            'N'
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
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        converter: {
            type: 'HistoricalPerformanceSeries'
        },
        security: {
            id: 'F00001GPCX',
            idType: 'MSID'
        }
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.HistoricalPerformanceSeries.getColumnIds(),
        [
            'Nav_M12_Q_Date',
            'Nav_M12_Q_Value',
            'Nav_M12_Y_Date',
            'Nav_M12_Y_Value',
            'GbPostTax_M12_Q_Date',
            'GbPostTax_M12_Q_Value',
            'GbPostTax_M12_Y_Date',
            'GbPostTax_M12_Y_Value',
            'ItPostTax_M12_Q_Date',
            'ItPostTax_M12_Q_Value',
            'ItPostTax_M12_Y_Date',
            'ItPostTax_M12_Y_Value'
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
    const connector = new MC.SecurityDetailsConnector({
        id: '',
        type: '',
        api,
        viewId: 'HSsnapshot',
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['RiskStatistics']
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.RiskStatistics.getColumnIds().sort(),
        [
            'GbPostTax_MonthEnd_InformationRatios',
            'GbPostTax_MonthEnd_StandardDeviations',
            'GbPostTax_MonthEnd_TrackingErrors',
            'ItPostTax_MonthEnd_InformationRatios',
            'ItPostTax_MonthEnd_StandardDeviations',
            'ItPostTax_MonthEnd_TrackingErrors',
            'Nav_MonthEnd_InformationRatios',
            'Nav_MonthEnd_StandardDeviations',
            'Nav_MonthEnd_TrackingErrors',
            'TimePeriod'
        ],
        'RiskStatistics table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.RiskStatistics.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
