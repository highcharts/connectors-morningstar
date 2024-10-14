import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function investmentDetailsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.InvestmentDetailsConnector({
      api
    });

    Assert.ok(
        connector instanceof MC.InvestmentDetailsConnector,
        'Connector should be instance of InvestmentDetailsConnector class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.InvestmentDetailsConverter,
        'Converter should be instance of InvestmentDetailsConverter.'
    );

    await connector.load();

    // console.log(connector.table.getColumns());

    // Assert.deepStrictEqual(
    //     connector.table.getColumnNames(),
    //     ['Day', 'Title', 'Source', 'Type'],
    //     'Connector table should exist of expected columns.'
    // );

    // Assert.strictEqual(
    //     connector.table.getRowCount(),
    //     10,
    //     'Connector table should have ten expected RNANews rows.'
    // );

}
