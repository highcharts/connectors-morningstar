import * as Assert from 'node:assert/strict';
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
        api,
        page: 1,
        pageSize: 10,
        sortOrder: 'name asc',
        currencyId: 'GBP',
        securityDataPoints: secIds,
        universeIds: ['FOGBR$$ALL']
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
        connector.table.getColumnNames(),
        secIds.map(id => `InvestorPreferences_${id}`),
        'Connector table should have expected column names.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        10,
        'Connector table should have 15 rows.'
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
