import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function equitySectorsBreakdown (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.InvestmentsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: '0P00002QN3'
        },
        converters: {
            EquitySectorsBreakdown: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();

    const connectorMeradata = connector.metadata['EquitySectorsBreakdown'];

    Assert.ok(
        connectorMeradata !== undefined,
        'InvestmentsConnector metadata should contain EquitySectorsBreakdown section.'
    );

    Assert.deepStrictEqual(
        Object.keys(connectorMeradata).sort(),
        [
            'columns',
            'performanceId'
        ],
        'EquitySectorsBreakdown metadata should contain expected properties.'
    );

    Assert.deepStrictEqual(
        connectorMeradata.performanceId,
        '0P00002QN3',
        'EquitySectorsBreakdown metadata should contain performanceId.'
    );

    const columns = ['Type', 'PercLong', 'PercLongRescaled', 'PercShort', 'PercNet'];
    const superSectorsDataTable = connector.getTable('EqSuperSectors');

    Assert.deepStrictEqual(
        superSectorsDataTable.getColumnIds(),
        columns,
        'EqSuperSectors table should have expected columns.'
    );

    Assert.ok(
        superSectorsDataTable.getRowCount() > 0,
        'EqSuperSectors table should not return empty rows.'
    );

    Assert.ok(
        superSectorsDataTable.metadata !== undefined,
        'EqSuperSectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(superSectorsDataTable.metadata).sort(),
        ['equityEconSectorRescalingFactorLong', 'performanceId'],
        'EqSuperSectors table metadata should contain expected properties.'
    );

    const sectorsDataTable = connector.getTable('EqSectors');

    Assert.deepStrictEqual(
        sectorsDataTable.getColumnIds(),
        columns,
        'EqSectors table should have expected columns.'
    );

    Assert.ok(
        sectorsDataTable.getRowCount() > 0,
        'EqSectors table should not return empty rows.'
    );

    Assert.ok(
        sectorsDataTable.metadata !== undefined,
        'EqSectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(sectorsDataTable.metadata).sort(),
        ['equityEconSectorRescalingFactorLong', 'performanceId'],
        'EqSectors table metadata should contain expected properties.'
    );

    const industriesDataTable = connector.getTable('EqIndustries');

    Assert.deepStrictEqual(
        industriesDataTable.getColumnIds(),
        columns,
        'EqIndustries table should have expected columns.'
    );

    Assert.ok(
        industriesDataTable.getRowCount() > 0,
        'EqIndustries table should not return empty rows.'
    );

    Assert.ok(
        industriesDataTable.metadata !== undefined,
        'EqIndustries table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(industriesDataTable.metadata).sort(),
        ['equityIndustryRescalingFactorLong', 'performanceId'],
        'EqIndustries table metadata should contain expected properties.'
    );
}
