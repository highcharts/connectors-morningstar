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

    const connectorMetadata = connector.metadata['FixedIncomeSectorsBreakdown'];

    Assert.ok(
        connectorMetadata !== undefined,
        'InvestmentsConnector metadata should contain FixedIncomeSectorsBreakdown section.'
    );

    Assert.deepStrictEqual(
        Object.keys(connectorMetadata).sort(),
        [
            'columns',
            'fixdIncMorningstarSectorsPortfolioDate',
            'performanceId'
        ],
        'FixedIncomeSectorsBreakdown metadata should contain expected properties.'
    );

    Assert.deepStrictEqual(
        connectorMetadata.performanceId,
        '0P00002QN3',
        'FixedIncomeSectorsBreakdown metadata should contain performanceId.'
    );

    const fixedIncColumns = [
        'Fixed_Income_Type',
        'Fixed_Income_Path',
        'Fixed_Income_PercNet',
        'Fixed_Income_PercShort',
        'Fixed_Income_PercLong',
        'Fixed_Income_PercLongRescaled'
    ].sort(),
        govPerCountrySuperSectorsDataTable = connector.getTable('IncGovPerCountrySuperSectors'),
        govPerCountrySectorsCount = govPerCountrySuperSectorsDataTable.getRowCount();

    Assert.deepStrictEqual(
        govPerCountrySuperSectorsDataTable.getColumnIds().sort(),
        fixedIncColumns,
        'IncGovPerCountrySuperSectors table should have expected columns.'
    );

    Assert.ok(
        govPerCountrySectorsCount > 0,
        'IncGovPerCountrySuperSectors table should not return empty rows.'
    );

    Assert.ok(
        govPerCountrySuperSectorsDataTable.metadata !== undefined,
        'IncGovPerCountrySuperSectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(govPerCountrySuperSectorsDataTable.metadata).sort(),
        [
            'performanceId'
        ],
        'IncGovPerCountrySuperSectors table metadata should contain expected properties.'
    );

    const superSectorsDataTable = connector.getTable('IncSuperSectors'),
        superSectorsCount = superSectorsDataTable.getRowCount();

    Assert.deepStrictEqual(
        superSectorsDataTable.getColumnIds().sort(),
        fixedIncColumns,
        'IncSuperSectors table should have expected columns.'
    );

    Assert.ok(
        superSectorsCount > 0,
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

    const primarySectorsDataTable = connector.getTable('IncPrimarySectors'),
        primarySectorsCount = primarySectorsDataTable.getRowCount();

    Assert.deepStrictEqual(
        primarySectorsDataTable.getColumnIds().sort(),
        fixedIncColumns,
        'IncPrimarySectors table should have expected columns.'
    );

    Assert.ok(
        primarySectorsCount > 0,
        'IncPrimarySectors table should not return empty rows.'
    );

    Assert.ok(
        primarySectorsDataTable.metadata !== undefined,
        'IncPrimarySectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(primarySectorsDataTable.metadata).sort(),
        [
            'fixedIncPrimarySectorRescalingFactorLong',
            'performanceId'
        ],
        'IncPrimarySectors table metadata should contain expected properties.'
    );

    const secondarySectorsDataTable = connector.getTable('IncSecondarySectors'),
        secondarySectorsCount = secondarySectorsDataTable.getRowCount();

    Assert.deepStrictEqual(
        secondarySectorsDataTable.getColumnIds().sort(),
        fixedIncColumns,
        'IncSecondarySectors table should have expected columns.'
    );

    Assert.ok(
        secondarySectorsCount > 0,
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

    const sectorsDataTable = connector.getTable('IncAllSectors'),
        sectorsCount = sectorsDataTable.getRowCount();

    Assert.deepStrictEqual(
        sectorsDataTable.getColumnIds().sort(),
        fixedIncColumns,
        'IncAllSectors table should have expected columns.'
    );

    Assert.ok(
        sectorsCount > 0,
        'IncAllSectors table should not return empty rows.'
    );

    Assert.ok(
        sectorsCount === (
            superSectorsCount +
            primarySectorsCount +
            secondarySectorsCount
        ),
        'IncAllSectors table should have all rows from previous sectors.'
    );

    const fixedIncBreakdownColumns = [
        'Fixed_Income_Breakdown_Type',
        'Fixed_Income_Breakdown_Path',
        'Fixed_Income_Breakdown_CalcNetFiperc',
        'Fixed_Income_Breakdown_CalcShortFiperc',
        'Fixed_Income_Breakdown_CalcLongFiperc'
    ].sort(),
        brkSuperSectorsDataTable = connector.getTable('IncBrkSuperSectors'),
        brkSuperSectorsCount = brkSuperSectorsDataTable.getRowCount();

    Assert.deepStrictEqual(
        brkSuperSectorsDataTable.getColumnIds().sort(),
        fixedIncBreakdownColumns,
        'IncBrkSuperSectors table should have expected columns.'
    );

    Assert.ok(
        brkSuperSectorsCount > 0,
        'IncBrkSuperSectors table should not return empty rows.'
    );

    Assert.ok(
        brkSuperSectorsDataTable.metadata !== undefined,
        'IncBrkSuperSectors table should have metadata defined.'
    );

    Assert.deepStrictEqual(
        Object.keys(brkSuperSectorsDataTable.metadata).sort(),
        [
            'performanceId'
        ],
        'IncBrkSuperSectors table metadata should contain expected properties.'
    );

    const brkPrimarySectorsDataTable = connector.getTable(
        'IncBrkPrimarySectors'
    ),
        brkPrimarySectorsCount = brkPrimarySectorsDataTable.getRowCount();

    Assert.deepStrictEqual(
        brkPrimarySectorsDataTable.getColumnIds().sort(),
        fixedIncBreakdownColumns,
        'IncBrkPrimarySectors table should have expected columns.'
    );

    Assert.ok(
        brkPrimarySectorsCount > 0,
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

    const brkSecondarySectorsDataTable = connector.getTable(
        'IncBrkSecondarySectors'
    ),
        brkSecondarySectorsCount = brkSecondarySectorsDataTable.getRowCount();

    Assert.deepStrictEqual(
        brkSecondarySectorsDataTable.getColumnIds().sort(),
        fixedIncBreakdownColumns,
        'IncBrkSecondarySectors table should have expected columns.'
    );

    Assert.ok(
        brkSecondarySectorsCount > 0,
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

    const brkSectorsDataTable = connector.getTable('IncBrkAllSectors'),
        brkSectorsCount = brkSectorsDataTable.getRowCount();

    Assert.deepStrictEqual(
        brkSectorsDataTable.getColumnIds().sort(),
        fixedIncBreakdownColumns,
        'IncBrkAllSectors table should have expected columns.'
    );

    Assert.ok(
        brkSectorsCount > 0,
        'IncBrkAllSectors table should not return empty rows.'
    );

    Assert.ok(
        brkSectorsCount === (
            brkSuperSectorsCount +
            brkPrimarySectorsCount +
            brkSecondarySectorsCount
        ),
        'IncBrkAllSectors table should have all rows from previous sectors.'
    );
}
