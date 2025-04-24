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

    Assert.ok(
        connector.converter instanceof MC.XRayConverter,
        'Converter should be instance of XRayConverter class.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'XRay_TotalReturn_M1',
            'XRay_TotalReturn_M1_Value',
            'XRay_TotalReturn_M3',
            'XRay_TotalReturn_M3_Value',
            'XRay_TotalReturn_M12',
            'XRay_TotalReturn_M12_Value'
        ],
        'Connector table should exist of expected columns.'
    );

    const now = new Date();
    const then = new Date(2024, 8 /* September */, 1);
    const rowCount = connector.table.getRowCount();
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
    });

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'XRay_RegionalExposure_N_Categories',
            'XRay_RegionalExposure_N_Values',
            'XRay_GlobalStockSector_N_Categories',
            'XRay_GlobalStockSector_N_Values',
            'XRay_StyleBox_N_Categories',
            'XRay_StyleBox_N_Values'
        ],
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.table.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
