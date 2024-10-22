import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function securityDetailsLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.SecurityDetailsConnector({
        api,
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        }
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

    Assert.deepStrictEqual(
        connector.table.getColumnNames(),
        [
            'SecurityDetails_TrailingPerformance_TimePeriod',
            'SecurityDetails_TrailingPerformance_Value'
        ],
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.table.getRowCount(),
        10,
        'Connector table should have ten expected RNANews rows.'
    );

    Assert.deepStrictEqual(
        connector.metadata,
        {
            columns: {},
            id: 'F0GBR050DD',
            isin: 'GB0004460357'
        }
    )

}
