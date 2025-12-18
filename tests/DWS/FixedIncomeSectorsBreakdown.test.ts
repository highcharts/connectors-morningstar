import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function fixedIncomeSectorsBreakdown (
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
            FixedIncomeSectorsBreakdown: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();

    const connectorMeradata = connector.metadata['FixedIncomeSectorsBreakdown'];

    Assert.ok(
        connectorMeradata !== undefined,
        'InvestmentsConnector metadata should contain FixedIncomeSectorsBreakdown section.'
    );

    Assert.deepStrictEqual(
        Object.keys(connectorMeradata).sort(),
        [
            'columns',
            'fixdIncMorningstarSectorsPortfolioDate',
            'performanceId'
        ],
        'FixedIncomeSectorsBreakdown metadata should contain expected properties.'
    );

    Assert.deepStrictEqual(
        connectorMeradata.performanceId,
        '0P00002QN3',
        'FixedIncomeSectorsBreakdown metadata should contain performanceId.'
    );

    const fixedIncColumns = [
        'Fixed_Inc_Type',
        'Fixed_Inc_PercLongRescaled',
        'Fixed_Inc_PercNet',
        'Fixed_Inc_PercShort',
        'Fixed_Inc_PercLong'
    ];
    const superSectorsDataTable = connector.getTable('IncSuperSectors');

    Assert.deepStrictEqual(
        superSectorsDataTable.getColumnIds(),
        fixedIncColumns,
        'IncSuperSectors table should have expected columns.'
    );

    Assert.ok(
        superSectorsDataTable.getRowCount() > 0,
        'IncSuperSectors table should not return empty rows.'
    );

    Assert.ok(
        superSectorsDataTable.metadata !== undefined,
        'IncSuperSectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(superSectorsDataTable.metadata).sort(),
        [
            'fixedIncSuperSectorGovernmentCountryRescalingFactorLong',
            'fixedIncSuperSectorRescalingFactorLong',
            'performanceId'
        ],
        'IncSuperSectors table metadata should contain expected properties.'
    );

    const primarySectorsDataTable = connector.getTable('IncPrimarySectors');

    Assert.deepStrictEqual(
        primarySectorsDataTable.getColumnIds(),
        fixedIncColumns,
        'IncPrimarySectors table should have expected columns.'
    );

    Assert.ok(
        primarySectorsDataTable.getRowCount() > 0,
        'IncPrimarySectors table should not return empty rows.'
    );

    Assert.ok(
        primarySectorsDataTable.metadata !== undefined,
        'IncPrimarySectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(primarySectorsDataTable.metadata).sort(),
        ['fixedIncPrimarySectorRescalingFactorLong', 'performanceId'],
        'IncPrimarySectors table metadata should contain expected properties.'
    );

    const secondarySectorsDataTable = connector.getTable('IncSecondarySectors');

    Assert.deepStrictEqual(
        secondarySectorsDataTable.getColumnIds(),
        fixedIncColumns,
        'IncSecondarySectors table should have expected columns.'
    );

    Assert.ok(
        secondarySectorsDataTable.getRowCount() > 0,
        'IncSecondarySectors table should not return empty rows.'
    );

    Assert.ok(
        secondarySectorsDataTable.metadata !== undefined,
        'IncSecondarySectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(secondarySectorsDataTable.metadata).sort(),
        [
            'fixedIncSecondarySectorAgencyorquasiAgencyCountryRescalingFactorLong',
            'fixedIncSecondarySectorInflationProtectedCountryRescalingFactorLong',
            'fixedIncSecondarySectorRescalingFactorLong',
            'fixedIncSecondarySectorTreasuryCountryRescalingFactorLong',
            'performanceId'
        ],
        'IncSecondarySectors table metadata should contain expected properties.'
    );

    const fixdIncBrkdwnColumns = [
        'Fixd_Inc_Brkdwn_Type',
        'Fixd_Inc_Brkdwn_CalcNetFiperc',
        'Fixd_Inc_Brkdwn_CalcLongFiperc',
        'Fixd_Inc_Brkdwn_CalcShortFiperc'
    ];
    const brkSuperSectorsDataTable = connector.getTable('IncBrkSuperSectors');

    Assert.deepStrictEqual(
        brkSuperSectorsDataTable.getColumnIds(),
        fixdIncBrkdwnColumns,
        'IncBrkSuperSectors table should have expected columns.'
    );

    Assert.ok(
        brkSuperSectorsDataTable.getRowCount() > 0,
        'IncBrkSuperSectors table should not return empty rows.'
    );

    Assert.ok(
        brkSuperSectorsDataTable.metadata !== undefined,
        'IncBrkSuperSectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(brkSuperSectorsDataTable.metadata).sort(),
        ['performanceId'],
        'IncBrkSuperSectors table metadata should contain expected properties.'
    );

    const brkPrimarySectorsDataTable = connector.getTable('IncBrkPrimarySectors');

    Assert.deepStrictEqual(
        brkPrimarySectorsDataTable.getColumnIds(),
        fixdIncBrkdwnColumns,
        'IncBrkPrimarySectors table should have expected columns.'
    );

    Assert.ok(
        brkPrimarySectorsDataTable.getRowCount() > 0,
        'IncBrkPrimarySectors table should not return empty rows.'
    );

    Assert.ok(
        brkPrimarySectorsDataTable.metadata !== undefined,
        'IncBrkPrimarySectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(brkPrimarySectorsDataTable.metadata).sort(),
        ['performanceId'],
        'IncBrkPrimarySectors table metadata should contain expected properties.'
    );

    const brkSecondarySectorsDataTable = connector.getTable('IncBrkSecondarySectors');

    Assert.deepStrictEqual(
        brkSecondarySectorsDataTable.getColumnIds(),
        fixdIncBrkdwnColumns,
        'IncBrkSecondarySectors table should have expected columns.'
    );

    Assert.ok(
        brkSecondarySectorsDataTable.getRowCount() > 0,
        'IncBrkSecondarySectors table should not return empty rows.'
    );

    Assert.ok(
        brkSecondarySectorsDataTable.metadata !== undefined,
        'IncBrkSecondarySectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(brkSecondarySectorsDataTable.metadata).sort(),
        ['performanceId'],
        'IncBrkSecondarySectors table metadata should contain expected properties.'
    );
}
