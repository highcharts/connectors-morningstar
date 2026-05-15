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
    fixedIncomePathMap,
    fixedIncomeBreakdownPathMap,
    sectorCountryVariants
} from './FixedIncomeSectorsBreakdownMap';
import SectorsBreakdown from './SectorsBreakdownOptions';
import MorningstarConverter from '../../Shared/MorningstarConverter';
import { DataTable } from '../../Shared/External';

import type { FieldsMapping } from './FixedIncomeSectorsBreakdownJSON';
import type {
    FixedIncomeSectorsBreakdownConverterOptions,
    FixedIncomeSectorsBreakdownConverterMetadata
} from './FixedIncomeSectorsBreakdownOptions';

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
            new DataTable({ id: 'IncGovPerCountrySuperSectors' }),
            new DataTable({ id: 'IncSuperSectors' }),
            new DataTable({ id: 'IncPrimarySectors' }),
            new DataTable({ id: 'IncSecondarySectors' }),
            new DataTable({ id: 'IncAllSectors' }),
            new DataTable({ id: 'IncBrkSuperSectors' }),
            new DataTable({ id: 'IncBrkPrimarySectors' }),
            new DataTable({ id: 'IncBrkSecondarySectors' }),
            new DataTable({ id: 'IncBrkAllSectors' })
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
            const fieldsMapping = this.createFieldsMapping();

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

                    // Try to find matching proeprty
                    const match = option.match(mapping.pattern);
                    if (!match) {
                        continue;
                    }

                    // Get correct type and name
                    const type = match[1]
                            .replace('Secondry', 'Secondary')
                            .replace('Brkdwn', 'Breakdown'),
                        name = match[2],
                        typeAndName = `${type}${name}`;

                    // Check if the sector is a country-specific government
                    const isGovPerCountry =
                        sectorCountryVariants.includes(typeAndName);

                    // Get the right table
                    const table = isGovPerCountry ?
                        // Handle country-specific super sectors
                        tablesObj['GovPerCountrySuperSector'] :
                        // Handle any other sectors
                        tablesObj[type];

                    // Save the value also in the table with all sectors
                    let allTable;

                    // But don't include country-specific government sectors
                    if (!isGovPerCountry) {
                        allTable = type.includes('Breakdown') ?
                            tablesObj['AllSectorBreakdown'] :
                            tablesObj['AllSector'];
                    }

                    // Save factor properties in the table's metadata
                    if (option.includes('Factor') && table.metadata) {
                        table.metadata[option] = Number(sectorsData[option]);
                        continue;
                    }

                    // Get the right arrays
                    const sectors = mapping[isGovPerCountry ?
                            'govPerCountrySuperSector' :
                            (type.charAt(0).toLowerCase() +
                                type.slice(1)).replace('Breakdown', '')
                        ] as Array<string>,
                        allSectors = mapping['allSector'] as Array<string>,
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
                    if (!isGovPerCountry && allSectors && allIndex === -1) {
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
                        cellValue = (path ?? (isGovPerCountry ?
                            name :
                            ['Uncategorized', name].join('/'))
                        ).replace('Breakdown', '');

                    // Set path to sector value
                    table.setCell(columnId, index, cellValue);
                    allTable?.setCell(columnId, allIndex, cellValue);
                }
            }

            // Add missing sector for uncategorized
            const value = [
                'Uncategorized',
                null,
                'Uncategorized',
                null,
                null,
                null
            ];

            // Complete others tables with missing uncategorized values
            tablesObj['SuperSector'].setRow(value);
            tablesObj['AllSector'].setRow(value);
        }
    }

    private createFieldsMapping (): FieldsMapping {
        // The fields mapping object
        return {
            fixdInc: {
                pattern: new RegExp(
                    `^fixdInc(${SectorsBreakdown.sectorTypes.map(s => `${s}Brkdwn`).join('|')})([^_]+)(${SectorsBreakdown.suffixesFiperc.join('|')})$`,
                    'u'
                ),
                superSector: [],
                primarySector: [],
                secondarySector: [],
                allSector: [],
                suffixes: SectorsBreakdown.suffixesFiperc,
                column: 'Fixed_Income_Breakdown'
            },
            fixedInc: {
                pattern: new RegExp(
                    `^fixedInc(${SectorsBreakdown.sectorTypes.join('|')})([^_]+)(${SectorsBreakdown.suffixes.join('|')})$`,
                    'u'
                ),
                govPerCountrySuperSector: [],
                superSector: [],
                primarySector: [],
                secondarySector: [],
                allSector: [],
                suffixes: SectorsBreakdown.suffixes,
                column: 'Fixed_Income'
            },
            surveyedFixedInc: {
                pattern: new RegExp(
                    `^surveyedFixedInc(${SectorsBreakdown.sectorTypes.join('|')})([^_]+)(PercLong)$`,
                    'u'
                ),
                superSector: [],
                primarySector: [],
                secondarySector: [],
                allSector: [],
                suffixes: ['PercLong'],
                column: 'Surveyed_Fixed_Income'
            }
        };
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default FixedIncomeSectorsBreakdownConverter;
