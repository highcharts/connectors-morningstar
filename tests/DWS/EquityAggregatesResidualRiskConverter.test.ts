import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function equityAggregatesResidualRisk (
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
            EquityAggregatesResidualRisk: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();

    const connectorMetadata = connector.metadata['EquityAggregatesResidualRisk'];

    Assert.ok(
        connectorMetadata !== undefined,
        'InvestmentsConnector metadata should contain EquityAggregatesResidualRisk section.'
    );

    Assert.deepStrictEqual(
        Object.keys(connectorMetadata).sort(),
        [
            'columns',
            'performanceId'
        ],
        'EquityAggregatesResidualRisk metadata should contain expected properties.'
    );

    Assert.deepStrictEqual(
        connectorMetadata.performanceId,
        '0P00006W6Q',
        'EquityAggregatesResidualRisk metadata should contain performanceId.'
    );

    // TO DO: Uncomment alpha and beta columns when query params are supported
    const columns = [
        'Type',
        // 'Alpha',
        // 'AlphaCompanies',
        'NonDividendAlpha',
        'NonDividendAlphaCompanies',
        // 'Beta',
        // 'BetaCompanies',
        'NonDividendBeta',
        'NonDividendBetaCompanies'
    ];
    const dataTable = connector.getTable('EquityAggregatesResidualRisk');

    Assert.deepStrictEqual(
        dataTable.getColumnIds(),
        columns,
        'EquityAggregatesResidualRisk table should have expected columns.'
    );

    Assert.ok(
        dataTable.getRowCount() > 0,
        'EquityAggregatesResidualRisk table should not return empty rows.'
    );

    Assert.ok(
        dataTable.metadata !== undefined,
        'EquityAggregatesResidualRisk table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(dataTable.metadata).sort(),
        ['numberOfCompanies', 'performanceId', 'periodEndDate'],
        'EquityAggregatesResidualRisk table metadata should contain expected properties.'
    );
}
