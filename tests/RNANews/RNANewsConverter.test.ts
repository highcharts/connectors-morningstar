import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';
import RNANewsJSON from '../../code/es-modules/RNANews/RNANewsJSON';

export async function rnaNewsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.RNANewsConnector({
      api,
      security: {
        id: 'GB00BLGZ9862',
        idType: 'ISIN'
      },
      maxStories: 10,
      dataModifier: {
        type: 'Invert'
      }
    }),
    columnNames = ['Day', 'Title', 'Source', 'Type'];

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
        columnNames,
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        10,
        'Connector table should have ten expected RNANews rows.'
    );

    Assert.deepStrictEqual(
      connector.table.modified.getColumn('columnNames'),
      columnNames,
      'Connector inverted table should exist of expected columns.'
    );

    Assert.strictEqual(
        columnNames.length,
        connector.table.modified.getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );

}

export function rnaNewsValidation () {

  const day = '1723766400000';
  const item = ['LSE20240816070005_5311334', 'Transaction in Own Shares', 'RNS', 'POS'];

  const mockResponse = [
    {
      day: day,
      items: [item]
    }
  ];

  Assert.ok(
    RNANewsJSON.isResponse(mockResponse),
    'Mock response should be considered a valid response'
  );
}

export function rnaNewsUrlShouldBeEMEA () {

  const connector = new MC.RNANewsConnector({});

  Assert.equal(
      connector.options.api?.url,
      'https://www.emea-api.morningstar.com/',
      'Connector options should override url to be emea if api options are not provided'
  );
}

export function rnaNewsUrlShouldNotOverrideIfAPIOptionsAreProvided () {

  const connector = new MC.RNANewsConnector({
    api: {
      url: 'https://www.us-api.morningstar.com/'
    }
  });

  Assert.equal(
      connector.options.api?.url,
      'https://www.us-api.morningstar.com/',
      'Connector options should not override url to be emea if api options are provided'
  );
}
