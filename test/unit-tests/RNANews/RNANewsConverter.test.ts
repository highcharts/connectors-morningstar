import * as Assert from 'node:assert/strict';
import * as MC from '../../../code/connectors-morningstar.src';
import RNANewsJSON from '../../../src/RNANews/RNANewsJSON';

export async function rnaNewsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.RNANewsConnector({
      api,
      security: {
        id: 'GB00B019KW72',
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
        'Connector table should have ten expected RNANews rows.'
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
