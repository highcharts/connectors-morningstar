import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function securityDetailsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
      api
    });

    Assert.ok(
        connector instanceof MC.SecurityDetailsConnector,
        'Connector should be instance of SecurityDetailsConnector class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.SecurityDetailsConverter,
        'Converter should be instance of SecurityDetailsConverter.'
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
