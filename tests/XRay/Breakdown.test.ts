import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function breakdownLoad (
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
