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
        connector.dataTables.Benchmark.getColumnNames(),
        [
            'TotalReturn_M1',
            'TotalReturn_M1_Value',
            'TotalReturn_M3',
            'TotalReturn_M3_Value',
            'TotalReturn_M12',
            'TotalReturn_M12_Value'
        ],
        'Connector table should exist of expected columns.'
    );

    const now = new Date();
    const then = new Date(2024, 8 /* September */, 1);
    const rowCount = connector.dataTables.Benchmark.getRowCount();
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

export async function portfolioBreakdown (
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
        'RegionalExposure_N_Categories',
        'RegionalExposure_N_Values',
        'GlobalStockSector_N_Categories',
        'GlobalStockSector_N_Values',
        'StyleBox_N_Categories',
        'StyleBox_N_Values'
    ];
    await connector.load();

    Assert.deepStrictEqual(
        connector.dataTables.Breakdowns.getColumnNames(),
        columnNames,
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.Breakdowns.getRowCount() > 0,
        'Connector should not return empty rows.'
    );

    Assert.deepStrictEqual(
        connector.dataTables.Breakdowns.modified.getColumn('columnNames'),
        columnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.dataTables.Breakdowns.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );
}
