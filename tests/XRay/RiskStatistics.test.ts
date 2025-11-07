import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';

export async function portfolioBreakdown (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.XRayConnector({
        id: '',
        type: '',
        api,
        currencyId: 'GBP',
        dataPoints: {
            type: 'portfolio',
            dataPoints: [
                ['StandardDeviation', 'M', 'M36'],
                ['SharpeRatio', 'M', 'M36']
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
        connector.dataTables.RiskStatistics.getColumnIds(),
        [
            'SharpeRatio_TimePeriod',
            'SharpeRatio',
            'StandardDeviation_TimePeriod',
            'StandardDeviation'
        ],
        'Connector columns should return expected names.'
    );

    Assert.ok(
        connector.dataTables.RiskStatistics.getRowCount() > 0,
        'Connector should not return empty rows.'
    );
}
