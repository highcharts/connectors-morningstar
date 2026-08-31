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
        'Fixed_Income_PercLong',
        'Fixed_Income_PercLongRescaled'
    ].sort();

    const regionSectorAsserts = (tableName: string) => {
        const dataTable = connector.getTable(tableName),
            dataTableCount = dataTable.getRowCount();

        Assert.deepStrictEqual(
            dataTable.getColumnIds().sort(),
            fixedIncColumns,
            `${tableName} table should have expected columns.`
        );

        Assert.ok(
            dataTableCount > 0,
            `${tableName} table should not return empty rows.`
        );

        Assert.ok(
            dataTable.metadata !== undefined,
            `${tableName} table should have metadata defined.`
        );

        Assert.deepStrictEqual(
            Object.keys(dataTable.metadata).sort(),
            [
                'performanceId'
            ],
            `${tableName} table metadata should contain expected properties.`
        );
    };

    [
        // 'IncInflationPerRegionSecondarySectors',
        'IncAgencyPerRegionSecondarySectors'
    ].forEach(regionSectorAsserts);

    fixedIncColumns.push('Fixed_Income_PercShort');
    fixedIncColumns.sort();

    [
        'IncGovernmentPerRegionSuperSectors',
        'IncTreasuryPerRegionSecondarySectors'
    ].forEach(regionSectorAsserts);

    const sectorAsserts = (
        sectorObj: { [tableName: string]: Array<string>; },
        columns: Array<string>
    ) => {
        Object.entries(sectorObj).forEach(([tableName, metadata]) => {
            const dataTable = connector.getTable(tableName),
                dataTableCount = dataTable.getRowCount();

            sectorsRowCount += dataTableCount;

            Assert.deepStrictEqual(
                dataTable.getColumnIds().sort(),
                columns,
                `${tableName} table should have expected columns.`
            );

            Assert.ok(
                dataTableCount > 0,
                `${tableName} table should not return empty rows.`
            );

            Assert.ok(
                dataTable.metadata !== undefined,
                `${tableName} table should have metadata defined.`
            );

            Assert.deepStrictEqual(
                Object.keys(dataTable.metadata).sort(),
                [
                    ...metadata,
                    'performanceId'
                ],
                `${tableName} table metadata should contain expected properties.`
            );
        });
    };

    let sectorsRowCount = 0;
    sectorAsserts({
        IncSuperSectors: [
            'fixedIncSuperSectorGovernmentCountryRescalingFactorLong',
            'fixedIncSuperSectorRescalingFactorLong'
        ],
        IncPrimarySectors: [
            'fixedIncPrimarySectorRescalingFactorLong'
        ],
        IncSecondarySectors: [
            'fixedIncSecondarySectorAgencyorquasiAgencyCountryRescalingFactorLong',
            'fixedIncSecondarySectorInflationProtectedCountryRescaling' +
            'FactorLong',
            'fixedIncSecondarySectorRescalingFactorLong',
            'fixedIncSecondarySectorTreasuryCountryRescalingFactorLong'
        ]
    }, fixedIncColumns);

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
        sectorsCount === sectorsRowCount,
        'IncAllSectors table should have all rows from previous sectors.'
    );
    sectorsRowCount = 0;

    const fixedIncBreakdownColumns = [
        'Fixed_Income_Breakdown_Type',
        'Fixed_Income_Breakdown_Path',
        'Fixed_Income_Breakdown_CalcNetFiperc',
        'Fixed_Income_Breakdown_CalcShortFiperc',
        'Fixed_Income_Breakdown_CalcLongFiperc'
    ].sort();

    sectorAsserts({
        IncBrkSuperSectors: [],
        IncBrkPrimarySectors: [],
        IncBrkSecondarySectors: []
    }, fixedIncBreakdownColumns);

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
        brkSectorsCount === sectorsRowCount,
        'IncBrkAllSectors table should have all rows from previous sectors.'
    );
}
