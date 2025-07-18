import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';


export async function benchmarkBreakdownLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayConnector({
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
        connector.dataTables.GlobalStockSector.getColumnNames(),
        [
            'Type',
            'N'
        ],
        'GlobalStockSector table should contain only Portfolio columns.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.RegionalExposure.getColumnNames(),
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
        connector.dataTables.StyleBox.getColumnNames(),
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
        connector.dataTables.TrailingPerformance.getColumnNames(),
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
        connector.dataTables.AssetAllocation.getColumnNames(),
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
        connector.dataTables.TrailingPerformance.getColumnNames(),
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
        connector.dataTables.HistoricalPerformanceSeries.getColumnNames(),
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
        connector.dataTables.AssetAllocation.getColumnNames(),
        assetAllocationColumnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.AssetAllocation.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.AssetAllocation.modified.getColumn('columnNames'),
        assetAllocationColumnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        assetAllocationColumnNames.length,
        connector.dataTables.AssetAllocation.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );


    Assert.deepStrictEqual(
        connector.dataTables.GlobalStockSector.getColumnNames(),
        columnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.GlobalStockSector.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.GlobalStockSector.modified.getColumn('columnNames'),
        columnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.dataTables.GlobalStockSector.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.RegionalExposure.getColumnNames(),
        columnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.RegionalExposure.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.RegionalExposure.modified.getColumn('columnNames'),
        columnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.dataTables.RegionalExposure.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.StyleBox.getColumnNames(),
        styleBoxColumnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.StyleBox.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.StyleBox.modified.getColumn('columnNames'),
        styleBoxColumnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        styleBoxColumnNames.length,
        connector.dataTables.StyleBox.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

        Assert.strictEqual(
        columnNames.length,
        connector.dataTables.RegionalExposure.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.getColumnNames(),
        trailingPerformanceColumnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.TrailingPerformance.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.modified.getColumn('columnNames'),
        trailingPerformanceColumnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        trailingPerformanceColumnNames.length,
        connector.dataTables.TrailingPerformance.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );
}

export async function creditQualityLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayConnector({
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
        connector.dataTables.CreditQuality.getColumnNames(),
        columnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.CreditQuality.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.CreditQuality.modified.getColumn('columnNames'),
        columnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.dataTables.CreditQuality.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );
}
