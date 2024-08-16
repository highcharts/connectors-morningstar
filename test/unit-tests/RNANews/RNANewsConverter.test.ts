import * as Assert from 'node:assert/strict';
import * as MC from '../../../code/morningstar-connectors.src';

export async function rnaNewsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.RNANewsConnector({
      api,
      security: {
        id: 'GB00BLGZ9862',
        idType: 'ISIN'
      },
      startDate: '2023-05-13',
      endDate: '2023-05-23'
    });

    Assert.ok(
        connector instanceof MC.RNANewsConnector,
        'Connector should be instance of RNANewsConnector class.'
    );

    Assert.ok(
        connector.converter instanceof
        MC.RNANewsConverter,
        'Converter should be instance of RNANewsConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        ['Day', 'Title', 'Source', 'Type'],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        10,
        'Connector table should have one expected dividend row.'
    );

}