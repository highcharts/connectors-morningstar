import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';

export async function goalAnalysisConnector (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.GoalAnalysisConnector({
        id: '',
        type: '',
        api,
        annualInvestment: 4800,
        assetClassWeights: [
            0.1, 0, 0, 0, 0, 0, 0, 0, 0.08, 0.03, 0, 0, 0.17,
            0.05, 0, 0, 0, 0.13, 0.28, 0, 0, 0, 0.11, 0, 0
        ],
        currentSavings: 20000,
        includeDetailedInvestmentGrowthGraph: true,
        requestProbability: 90,
        target: 9000,
        timeHorizon: 5,
        dataModifier: {
            type: 'Invert'
        }
    }),
    columnNames = [
        'Goal_Probability', 'Goal_Amount', 'Goal_AssetClass_0',
        'Goal_AssetClass_1', 'Goal_AssetClass_2', 'Goal_AssetClass_3',
        'Goal_AssetClass_4', 'Goal_AssetClass_5'
    ];

    Assert.ok(
        connector instanceof MC.GoalAnalysisConnector,
        'Connector should be instance of GoalAnalysisConnector class.'
    );

    Assert.ok(
        connector.converter instanceof MC.GoalAnalysisConverter,
        'Converter should be instance of GoalAnalysisConverter class.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.getTable().getColumnIds(),
        columnNames,
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.getTable().getRowCount(),
        7,
        'Connector table should have the expected amount of rows.'
    );

     Assert.deepStrictEqual(
        connector.getTable().getModified().getColumn('columnIds'),
        columnNames,
        'Row names of inverted table should be the same as original column names.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.getTable().getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

}
