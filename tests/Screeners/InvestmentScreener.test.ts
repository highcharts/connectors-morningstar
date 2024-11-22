import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';
import InvestmentScreenerJSON from 
'../../code/es-modules/Screeners/InvestmentScreener/InvestmentScreenerJSON';

export async function investmentScreenerLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const secIds = [
        'secId',
        'tenforeId',
        'name',
        'closePrice',
        'ongoingCharge',
        'initialPurchase',
        'maxFrontEndLoad',
        'analystRatingScale',
        'average12MonthCarbonInvestmentScreener',
        'investmentType',
        'holdingTypeId',
        'universe'
    ];
    const connector = new MC.InvestmentScreenerConnector({
        api,
        page: 1,
        pageSize: 20,
        currencyId: 'USD',
        securityDataPoints: secIds,
        universeIds: ['FOALL$$ALL']
    });

    Assert.ok(
        connector instanceof MC.InvestmentScreenerConnector,
        'Connector should be instance of InvestmentScreenerConnector class.'
    );

    Assert.ok(
        connector.converter instanceof MC.InvestmentScreenerConverter,
        'Converter should be instance of InvestmentScreenerConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        secIds.map(id => `InvestmentScreener_${id}`),
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        20,
        'Connector table should have 20 row.'
    );
}

export function InvestmentScreenerResponseValidation () {
    const exampleResponse = {
        total: 3000,
        page: 1,
        pageSize: 20,
        rows: [
            {
                secId: 'F00000VCTT',
                Name: 'TestPortfolio1',
                riskRating: 4,
                rating: 3
            }
        ]
    };

    Assert.ok(
        InvestmentScreenerJSON.isResponse(exampleResponse),
        'InvestmentScreenerJSON should validate correct response.'
    );
}
