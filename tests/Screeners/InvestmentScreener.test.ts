import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';
import InvestmentScreenerJSON from 
'../../code/es-modules/Screeners/InvestmentScreener/InvestmentScreenerJSON';

export async function investmentScreenerLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const secIds = [
        'secId',
        'name',
        'investmentType',
        'holdingTypeId',
        'universe',
        'tenforeId',
        'closePrice',
        'ongoingCharge',
        'initialPurchase',
        'maxFrontEndLoad'
    ];
    const connector = new MC.InvestmentScreenerConnector({
        id: '',
        type: '',
        api,
        page: 1,
        pageSize: 20,
        currencyId: 'USD',
        securityDataPoints: secIds,
        universeIds: ['FOALL$$ALL'],
        dataModifier: {
            type: 'Invert'
        }
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
        connector.getTable().getColumnIds(),
        secIds.map(id => `InvestmentScreener_${id}`),
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.getTable().getRowCount(),
        15,
        'Connector table should have 15 rows.'
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

export function InvestmentScreenerResponseValidation () {
    const exampleResponse = {
        total: 18238,
        page: 1,
        pageSize: 20,
        rows: [
            {
                SecId: 'F000002PLH',
                Name: '(LF)-Flexi Allocation Greece Eurobank',
                riskrating: 4,
                rating: 4
            }
        ]
    };

    Assert.ok(
        InvestmentScreenerJSON.isInvestmentScreenerResponse(exampleResponse),
        'InvestmentScreenerJSON should validate correct response.'
    );
}
