import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function equityResidualRisk (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.InvestmentsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: '0P00006W6Q'
        },
        converters: {
            EquityResidualRisk: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();

    const connectorMetadata = connector.metadata['EquityResidualRisk'];

    Assert.ok(
        connectorMetadata !== undefined,
        'InvestmentsConnector metadata should contain EquityResidualRisk section.'
    );

    Assert.deepStrictEqual(
        Object.keys(connectorMetadata).sort(),
        [
            'columns',
            'performanceId'
        ],
        'EquityResidualRisk metadata should contain expected properties.'
    );

    Assert.deepStrictEqual(
        connectorMetadata.performanceId,
        '0P00006W6Q',
        'EquityResidualRisk metadata should contain performanceId.'
    );

    const columns = [
        'Type',
        'Alpha',
        'NonDividendAlpha',
        'Beta',
        'NonDividendBeta',
        'RSquare',
        'NonDividendRSquare'
    ];
    const riskDailyTable = connector.getTable('RiskDaily');

    Assert.deepStrictEqual(
        riskDailyTable.getColumnIds(),
        columns,
        'RiskDaily table should have expected columns.'
    );

    Assert.ok(
        riskDailyTable.getRowCount() > 0,
        'RiskDaily table should not return empty rows.'
    );

    Assert.ok(
        riskDailyTable.metadata !== undefined,
        'RiskDaily table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(riskDailyTable.metadata).sort(),
        ['asOfDate', 'compareIndexId', 'performanceId'],
        'RiskDaily table metadata should contain expected properties.'
    );

    const riskMonthlyTable = connector.getTable('RiskMonthly');

    Assert.deepStrictEqual(
        riskMonthlyTable.getColumnIds(),
        columns,
        'RiskMonthly table should have expected columns.'
    );

    Assert.ok(
        riskMonthlyTable.getRowCount() > 0,
        'RiskMonthly table should not return empty rows.'
    );

    Assert.ok(
        riskMonthlyTable.metadata !== undefined,
        'RiskMonthly table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(riskMonthlyTable.metadata).sort(),
        ['asOfDate', 'compareIndexId', 'performanceId'],
        'RiskMonthly table metadata should contain expected properties.'
    );
}
