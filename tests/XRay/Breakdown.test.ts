import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';

export async function benchmarkBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayConnector({
        id: '',
        type: '',
        api,
        benchmarkId: 'EUCA000812',
        currencyId: 'GBP',
        dataPoints: [{
            type: 'portfolio',
            dataPoints: [
                'AssetAllocationMorningstarEUR3',
                'GlobalStockSector',
                'RegionalExposure',
                'HistoricalPerformanceSeries',
                ['PerformanceReturn', 'M0', 'M1', 'M2', 'M3', 'M6', 'M12'],
                'StyleBox',
                ['StandardDeviation', 'M', 'M36'],
                ['SharpeRatio', 'M', 'M36']
            ]
        }, {
            type: 'benchmark',
            dataPoints: [
                'HistoricalPerformanceSeries',
                ['PerformanceReturn', 'M0', 'M1', 'M2', 'M3', 'M6', 'M12'],
                'ShowBreakdown'
            ]
        }],
        holdings: [
            {
                id: 'F0GBR052QA',
                idType: 'MSID',
                type: MC.Shared.MorningstarSecurityType.OpenEndFund,
                weight: 50,
                holdingType: 'weight'
            }, {
                id: 'GB00BWDBJF10',
                idType: 'ISIN',
                type: MC.Shared.MorningstarSecurityType.OpenEndFund,
                weight: 50
            }
        ]
    });

    Assert.ok(
        connector instanceof MC.XRayConnector,
        'Connector should be instance of XRayConnector class.'
    );

    await connector.load();

    // Only Portfolio data:
    Assert.deepStrictEqual(
        connector.dataTables.GlobalStockSector.getColumnIds(),
        [
            'Type',
            'N'
        ],
        'GlobalStockSector table should contain only Portfolio columns.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.RegionalExposure.getColumnIds(),
        [
            'Type',
            'N',
            'Type_Benchmark',
            'N_Benchmark'
        ],
        `RegionalExposure table should contain both,
        Portfolio and Benchmark, columns.`
    );

    Assert.deepStrictEqual(
        connector.dataTables.StyleBox.getColumnIds(),
        [
            'Type',
            'N',
            'Style',
            'Size',
            'Type_Benchmark',
            'N_Benchmark',
            'Style_Benchmark',
            'Size_Benchmark'
        ],
        `StyleBox table should contain both,
        Portfolio and Benchmark, columns.`
    );

    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.getColumnIds(),
        [
            'TotalReturn_MonthEnd_TimePeriod',
            'TotalReturn_MonthEnd_Value',
            'TotalReturn_MonthEnd_TimePeriod_Benchmark',
            'TotalReturn_MonthEnd_Value_Benchmark'
        ],
        `TrailingPerformance table should contain both,
        Portfolio and Benchmark, columns.`
    );

    Assert.deepStrictEqual(
        connector.dataTables.AssetAllocation.getColumnIds(),
        [
            'MorningstarEUR3_Type',
            'MorningstarEUR3_N',
            'MorningstarEUR3_L',
            'MorningstarEUR3_S',
            'MorningstarEUR3_Type_Benchmark',
            'MorningstarEUR3_N_Benchmark',
            'MorningstarEUR3_L_Benchmark',
            'MorningstarEUR3_S_Benchmark',
            'Default1_Type_Benchmark',
            'Default1_N_Benchmark',
            'Default1_L_Benchmark',
            'Default1_S_Benchmark'
        ],
        `TrailingPerformance table should contain both,
        Portfolio and Benchmark, columns.`
    );

    // Only Benchmark data:
    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.getColumnIds(),
        [
            'TotalReturn_MonthEnd_TimePeriod',
            'TotalReturn_MonthEnd_Value',
            'TotalReturn_MonthEnd_TimePeriod_Benchmark',
            'TotalReturn_MonthEnd_Value_Benchmark'
        ],
        'TrailingPerformance table should contain only Benchmark columns.'
    );
}


export async function totalReturnLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayConnector({
        id: '',
        type: '',
        api,
        currencyId: 'GBP',
        dataPoints: {
            type: 'benchmark',
            dataPoints: [
                'HistoricalPerformanceSeries',
                ['PerformanceReturn', 'M0', 'M1', 'M2', 'M3', 'M6', 'M12'],
                'ShowBreakdown'
            ]
        },
        holdings: [
            {
                id: 'GB00BWDBJF10',
                idType: 'ISIN',
                type: MC.Shared.MorningstarSecurityType.OpenEndFund,
                weight: 100
            }
        ]
    });

    Assert.ok(
        connector instanceof MC.XRayConnector,
        'Connector should be instance of XRayConnector class.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.HistoricalPerformanceSeries.getColumnIds(),
        [
             'TotalReturn_M1_Monthly_Date_Benchmark',
             'TotalReturn_M1_Monthly_Value_Benchmark',
             'TotalReturn_M3_Quarterly_Date_Benchmark',
             'TotalReturn_M3_Quarterly_Value_Benchmark',
             'TotalReturn_M12_Annual_Date_Benchmark',
             'TotalReturn_M12_Annual_Value_Benchmark'
        ],
        'Connector table should exist of expected columns.'
    );

    const now = new Date();
    const then = new Date(2024, 8 /* September */, 1);
    const rowCount = connector.dataTables.HistoricalPerformanceSeries.getRowCount();
    const shouldCount = (
        384 + // January 2024
        ((now.getFullYear() - then.getFullYear()) * 12) +
        now.getMonth()
    );

    Assert.strictEqual(
        rowCount,
        shouldCount,
        'Connector table should have the expected amount of rows.'
    );

}

export async function portfolioDataPoints (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayConnector({
        id: '',
        type: '',
        api,
        currencyId: 'GBP',
        dataModifier: {
            type: 'Invert'
        },
        dataPoints: {
            type: 'portfolio',
            dataPoints: [
                'AssetAllocationMorningstarEUR3',
                'GlobalStockSector',
                'RegionalExposure',
                'StyleBox',
                ['PerformanceReturn', 'M0', 'M1', 'M2', 'M3', 'M6', 'M12']
            ]
        },
        holdings: [
            {
                id: 'F0GBR052QA',
                idType: 'MSID',
                type: 'FO',
                weight: '100',
                name: 'BlackRock Income and Growth Ord',
                holdingType: 'weight'
            }
        ]
    }),
    columnNames = [
        'Type',
        'N'
    ],
    assetAllocationColumnNames = [
        'MorningstarEUR3_Type',
        'MorningstarEUR3_N',
        'MorningstarEUR3_L',
        'MorningstarEUR3_S'
    ],
    trailingPerformanceColumnNames = [
        'TotalReturn_MonthEnd_TimePeriod',
        'TotalReturn_MonthEnd_Value'
    ],
    styleBoxColumnNames = [
        'Type',
        'N',
        'Style',
        'Size'
    ];
    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.AssetAllocation.getColumnIds(),
        assetAllocationColumnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.AssetAllocation.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.AssetAllocation.getModified().getColumn('columnIds'),
        assetAllocationColumnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        assetAllocationColumnNames.length,
        connector.dataTables.AssetAllocation.getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );


    Assert.deepStrictEqual(
        connector.dataTables.GlobalStockSector.getColumnIds(),
        columnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.GlobalStockSector.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.GlobalStockSector.getModified().getColumn('columnIds'),
        columnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.dataTables.GlobalStockSector.getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.RegionalExposure.getColumnIds(),
        columnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.RegionalExposure.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.RegionalExposure.getModified().getColumn('columnIds'),
        columnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.dataTables.RegionalExposure.getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.StyleBox.getColumnIds(),
        styleBoxColumnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.StyleBox.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.StyleBox.getModified().getColumn('columnIds'),
        styleBoxColumnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        styleBoxColumnNames.length,
        connector.dataTables.StyleBox.getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

        Assert.strictEqual(
        columnNames.length,
        connector.dataTables.RegionalExposure.getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.getColumnIds(),
        trailingPerformanceColumnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.TrailingPerformance.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.getModified().getColumn('columnIds'),
        trailingPerformanceColumnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        trailingPerformanceColumnNames.length,
        connector.dataTables.TrailingPerformance.getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );
}

export async function creditQualityLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayConnector({
        id: '',
        type: '',
        api,
        currencyId: 'GBP',
        dataModifier: {
            type: 'Invert'
        },
        dataPoints: {
            type: 'portfolio',
            dataPoints: [
                'CreditQuality'
            ]
        },
        holdings: [
            {
                id: 'F00001GPCX',
                idType: 'MSID',
                type: 'FO',
                weight: '100',
                holdingType: 'weight'
            }
        ]
    }),
    columnNames = [
        'Type',
        'N'
    ];
    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.CreditQuality.getColumnIds(),
        columnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.CreditQuality.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.CreditQuality.getModified().getColumn('columnIds'),
        columnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.dataTables.CreditQuality.getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );
}
