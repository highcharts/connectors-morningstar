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
            'N_Categories',
            'N_Values'
        ],
        'GlobalStockSector table should contain only Portfolio columns.'
    );


    // Both, Portfolio and Benchmark
    ['RegionalExposure', 'StyleBox'].forEach(tableName => {
        Assert.deepStrictEqual(
            connector.dataTables[tableName].getColumnNames(),
            [
                'N_Categories',
                'N_Values',
                'N_Categories_Benchmark',
                'N_Values_Benchmark'
            ],
            `${tableName} table should contain both,
            Portfolio and Benchmark, columns.`
        );
    });

    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.getColumnNames(),
        [
            'MonthEnd_TimePeriod',
            'MonthEnd_Value',
            'MonthEnd_TimePeriod_Benchmark',
            'MonthEnd_Value_Benchmark'
        ],
        `TrailingPerformance table should contain both,
        Portfolio and Benchmark, columns.`
    );

    Assert.deepStrictEqual(
        connector.dataTables.AssetAllocation.getColumnNames(),
        [
            'MorningstarEUR3_N_Categories',
            'MorningstarEUR3_N_Values',
            'MorningstarEUR3_L_Categories',
            'MorningstarEUR3_L_Values',
            'MorningstarEUR3_S_Categories',
            'MorningstarEUR3_S_Values',
            'MorningstarEUR3_N_Categories_Benchmark',
            'MorningstarEUR3_N_Values_Benchmark',
            'MorningstarEUR3_L_Categories_Benchmark',
            'MorningstarEUR3_L_Values_Benchmark',
            'MorningstarEUR3_S_Categories_Benchmark',
            'MorningstarEUR3_S_Values_Benchmark',
            'Default1_N_Categories_Benchmark',
            'Default1_N_Values_Benchmark',
            'Default1_L_Categories_Benchmark',
            'Default1_L_Values_Benchmark',
            'Default1_S_Categories_Benchmark',
            'Default1_S_Values_Benchmark'
        ],
        `TrailingPerformance table should contain both,
        Portfolio and Benchmark, columns.`
    );

    // Only Benchmark data:
    Assert.deepStrictEqual(
        connector.dataTables.TrailingPerformance.getColumnNames(),
        [
            'MonthEnd_TimePeriod',
            'MonthEnd_Value',
            'MonthEnd_TimePeriod_Benchmark',
            'MonthEnd_Value_Benchmark'
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
            'TotalReturn_M1_Benchmark',
            'TotalReturn_M1_Value_Benchmark',
            'TotalReturn_M3_Benchmark',
            'TotalReturn_M3_Value_Benchmark',
            'TotalReturn_M12_Benchmark',
            'TotalReturn_M12_Value_Benchmark'
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
                'StyleBox'
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
        'N_Categories',
        'N_Values'
    ],
    assetAllocationColumnNames = [
        'MorningstarEUR3_N_Categories',
        'MorningstarEUR3_N_Values',
        'MorningstarEUR3_L_Categories',
        'MorningstarEUR3_L_Values',
        'MorningstarEUR3_S_Categories',
        'MorningstarEUR3_S_Values'
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
        columnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.StyleBox.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.StyleBox.modified.getColumn('columnNames'),
        columnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.dataTables.StyleBox.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );
}
