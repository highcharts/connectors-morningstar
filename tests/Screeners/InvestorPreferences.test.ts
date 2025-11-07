import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';
import InvestorPreferencesJSON from
'../../code/es-modules/Screeners/InvestorPreferences/InvestorPreferencesJSON';

export async function InvestorPreferencesLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const secIds = [
        'SecId',
        'LegalName',
        'DomicileId',
        'StarRatingM255'
    ];
    const connector = new MC.InvestorPreferencesConnector({
        id: '',
        type: '',
        api,
        page: 1,
        pageSize: 10,
        sortOrder: 'name asc',
        currencyId: 'GBP',
        securityDataPoints: secIds,
        universeIds: ['FOGBR$$ALL'],
        dataModifier: {
            type: 'Invert'
        }
    });

    Assert.ok(
        connector instanceof MC.InvestorPreferencesConnector,
        'Connector should be instance of InvestorPreferencesConnector class.'
    );

    Assert.ok(
        connector.converter instanceof MC.InvestorPreferencesConverter,
        'Converter should be instance of InvestorPreferencesConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.getTable().getColumnIds(),
        secIds.map(id => `InvestorPreferences_${id}`),
        'Connector table should have expected column names.'
    );

    Assert.strictEqual(
        connector.getTable().getRowCount(),
        10,
        'Connector table should have 10 rows.'
    );

    Assert.deepStrictEqual(
        connector.getTable().getModified().getColumn('columnIds'),
        connector.getTable().getColumnIds(),
        'Connector inverted table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.getTable().getColumnIds().length,
        connector.getTable().getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );
}

export function InvestorPreferencesResponseValidation () {
    const exampleResponse = {
        total: 18238,
        page: 1,
        pageSize: 20,
        rows: [
            {
                SecId: 'F000015O6T',
                LegalName: '1OAK Multi Asset 80 UCITS Fund A GBP Acc',
                StarRatingM255: 3
            }
        ]
    };

    Assert.ok(
        InvestorPreferencesJSON.isInvestorPreferencesResponse(exampleResponse),
        'InvestorPreferencesJSON should validate correct response.'
    );
}
