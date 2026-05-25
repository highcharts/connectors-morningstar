/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Dalek
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import {
    createFieldsMapping,
    fixedIncomeBreakdownPathMap,
    fixedIncomePathMap,
    getRegionSectorType,
    sectorsPerRegion
} from './FixedIncomeSectorsBreakdownMap';
import MorningstarConverter from '../../Shared/MorningstarConverter';
import { DataTable } from '../../Shared/External';

import type {
    FixedIncomeSectorsBreakdownConverterOptions,
    FixedIncomeSectorsBreakdownConverterMetadata
} from './FixedIncomeSectorsBreakdownOptions';
import { SectorAccumulatorKey } from './FixedIncomeSectorsBreakdownJSON';

/* *
 *
 *  Class
 *
 * */

export class FixedIncomeSectorsBreakdownConverter extends MorningstarConverter {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options?: FixedIncomeSectorsBreakdownConverterOptions
    ) {
        super(options);

        // Create main data tables
        this.tables = [
            // Region-specific sectors
            new DataTable({ id: 'IncGovernmentPerRegionSuperSectors' }),
            new DataTable({ id: 'IncTreasuryPerRegionSecondarySectors' }),
            new DataTable({ id: 'IncInflationPerRegionSecondarySectors' }),
            new DataTable({ id: 'IncAgencyPerRegionSecondarySectors' }),

            // Fixed income sectors
            new DataTable({ id: 'IncAllSectors' }),
            new DataTable({ id: 'IncSuperSectors' }),
            new DataTable({ id: 'IncPrimarySectors' }),
            new DataTable({ id: 'IncSecondarySectors' }),

            // Fixed income breakdown sectors
            new DataTable({ id: 'IncBrkAllSectors' }),
            new DataTable({ id: 'IncBrkSuperSectors' }),
            new DataTable({ id: 'IncBrkPrimarySectors' }),
            new DataTable({ id: 'IncBrkSecondarySectors' })
        ];

        this.metadata = {
            columns: {}
        };
    }

    /* *
     *
     *  Properties
     *
     */

    public readonly metadata: FixedIncomeSectorsBreakdownConverterMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override parse (
        options: FixedIncomeSectorsBreakdownConverterOptions
    ): void {
        const tables = this.tables,
            metadata = this.metadata,
            userOptions = { ...this.options, ...options },
            json = userOptions.json,
            id = json.identifiers.performanceId,
            sectorsData = json.morningstarFixedIncomeSectorsBreakdown,
            tablesObj: Record<string, DataTable> = {};

        // Prepare tables object
        tables.forEach((table) => {
            let category = table.id.replace('Inc', '').slice(0, -1);
            if (category.includes('Brk')) {
                category = `${category.replace('Brk', '')}Breakdown`;
            }
            tablesObj[category] = table;

            // Set the metadata in each table
            table.metadata = {
                performanceId: id
            };
        });

        if (sectorsData) {
            const {
                fixdIncMorningstarSectorsPortfolioDate,
                surveyedFixedIncSectorDate
            } = sectorsData;

            // Converter metadata
            metadata.performanceId = id;

            if (fixdIncMorningstarSectorsPortfolioDate) {
                metadata.fixdIncMorningstarSectorsPortfolioDate =
                    fixdIncMorningstarSectorsPortfolioDate as string;
            }

            if (surveyedFixedIncSectorDate) {
                metadata.surveyedFixedIncSectorDate =
                    surveyedFixedIncSectorDate as string;
            }

            if (json.metadata.messages?.length) {
                metadata.messages = json.metadata.messages;
            }

            // Get the fields mapping per parse
            const fieldsMapping = createFieldsMapping();

            // Get possible data prefixes
            const prefixes = Object.keys(fieldsMapping);

            // Search the data
            for (const option in sectorsData) {
                // Consider only selected data
                const field = prefixes.find(
                    (prefix) => option.startsWith(prefix)
                );

                if (field) {
                    // Get the correct mapping object
                    const mapping = fieldsMapping[
                        field as keyof typeof fieldsMapping
                    ];

                    // Try to find matching property
                    const match = option.match(mapping.pattern);
                    if (!match) {
                        continue;
                    }

                    // Get correct type and name
                    let type = match[1]
                        .replace('Secondry', 'Secondary')
                        .replace('Brkdwn', 'Breakdown');

                    const name = match[2],
                        typeAndName = `${type}${name}`;

                    // Check if the sector is a region-specific or not
                    const regionSector = sectorsPerRegion.find(
                        item => item === typeAndName
                    );

                    // Get the type for a correct data table
                    type = getRegionSectorType(regionSector) || type;

                    // Get the right table
                    const table = tablesObj[type];

                    // Save the value also in the table with all sectors
                    let allTable;

                    // But don't include region-specific government sectors
                    if (!regionSector) {
                        allTable = type.includes('Breakdown') ?
                            tablesObj['AllSectorBreakdown'] :
                            tablesObj['AllSector'];
                    }

                    // Save factor properties in the table's metadata
                    if (option.includes('Factor') && table.metadata) {
                        table.metadata[option] = Number(sectorsData[option]);
                        continue;
                    }

                    // Get the right sector array key
                    const sectorKey =
                        (type.charAt(0).toLowerCase() + type.slice(1))
                            .replace('Breakdown', '') as SectorAccumulatorKey;

                    // Get the right arrays
                    const sectors = mapping[sectorKey] ?? [],
                        allSectors = mapping['allSector'],
                        column = mapping.column;

                    // New sector
                    let index = sectors.indexOf(typeAndName);
                    if (sectors && index === -1) {
                        index = sectors.length;

                        // Save sector
                        sectors.push(typeAndName);

                        // Sector type value
                        table.setCell(`${column}_Type`, index, name);
                    }

                    // New sector
                    let allIndex = allSectors.indexOf(typeAndName);
                    if (!regionSector && allSectors && allIndex === -1) {
                        allIndex = allSectors.length;

                        // Save sector
                        allSectors.push(typeAndName);

                        // Sector type value
                        allTable?.setCell(`${column}_Type`, allIndex, name);
                    }

                    const value = sectorsData[option];
                    if (value) {
                        const columnId = `${column}_${match[3]}`,
                            cellValue = Number(value);

                        // Set value of a specific category
                        table.setCell(columnId, index, cellValue);
                        allTable?.setCell(columnId, allIndex, cellValue);
                    }

                    // Get the path of all sectors
                    const path = field === 'fixdInc' ?
                            fixedIncomeBreakdownPathMap.get(typeAndName) :
                            fixedIncomePathMap.get(typeAndName),
                        columnId = `${column}_Path`,
                        cellValue = (path ?? (regionSector ?
                            name :
                            ['Uncategorized', name].join('/'))
                        ).replace('Breakdown', '');

                    // Set path to sector value
                    table.setCell(columnId, index, cellValue);
                    allTable?.setCell(columnId, allIndex, cellValue);
                }
            }
        }
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default FixedIncomeSectorsBreakdownConverter;
