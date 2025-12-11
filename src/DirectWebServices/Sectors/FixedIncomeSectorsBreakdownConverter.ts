/* *
 *
 *  (c) 2009-2025 Highsoft AS
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

import SectorsBreakdown from './SectorsBreakdownOptions';
import MorningstarConverter from '../../Shared/MorningstarConverter';
import * as External from '../../Shared/External';

import type { FieldsMapping } from './FixedIncomeSectorsBreakdownJSON';
import type {
    FixedIncomeSectorsBreakdownConverterOptions,
    FixedIncomeSectorsBreakdownMetadata
} from './FixedIncomeSectorsBreakdownOptions';

// The fields mapping object
const fieldsMapping: FieldsMapping = {
    fixdInc: {
        pattern: new RegExp(
            `^fixdInc(${SectorsBreakdown.sectorTypes.map(s => `${s}Brkdwn`).join('|')})([^_]+)(${SectorsBreakdown.suffixesFiperc.join('|')})$`,
            'u'
        ),
        superSector: [],
        primarySector: [],
        secondarySector: [],
        suffixes: SectorsBreakdown.suffixesFiperc,
        column: 'Fixd_Inc_Brkdwn'
    },
    fixedInc: {
        pattern: new RegExp(
            `^fixedInc(${SectorsBreakdown.sectorTypes.join('|')})([^_]+)(${SectorsBreakdown.suffixes.join('|')})$`,
            'u'
        ),
        superSector: [],
        primarySector: [],
        secondarySector: [],
        suffixes: SectorsBreakdown.suffixes,
        column: 'Fixed_Inc'
    },
    surveyedFixedInc: {
        pattern: new RegExp(
            `^surveyedFixedInc(${SectorsBreakdown.sectorTypes.join('|')})([^_]+)(PercLong)$`,
            'u'
        ),
        superSector: [],
        primarySector: [],
        secondarySector: [],
        suffixes: ['PercLong'],
        column: 'Surveyed_Fixd_Inc'
    }
};

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
            new External.DataTable({ id: 'IncSuperSectors' }),
            new External.DataTable({ id: 'IncPrimarySectors' }),
            new External.DataTable({ id: 'IncSecondarySectors' }),
            new External.DataTable({ id: 'IncBrkSuperSectors' }),
            new External.DataTable({ id: 'IncBrkPrimarySectors' }),
            new External.DataTable({ id: 'IncBrkSecondarySectors' })
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

    public readonly metadata: FixedIncomeSectorsBreakdownMetadata;

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
            tablesObj: Record<string, External.DataTable> = {};

        // Prepare tables object
        tables.forEach((table) => {
            let category = table.id.replace('Inc', '').slice(0, -1);
            if (category.includes('Brk')) {
                category = `${category.replace('Brk', '')}Breakdown`;
            }
            tablesObj[category] = table;
        });

        if (sectorsData) {
            // Metadata
            metadata.performanceId = id;
            metadata.fixdIncMorningstarSectorsPortfolioDate =
                sectorsData.fixdIncMorningstarSectorsPortfolioDate || '';

            if (json.metadata.messages?.length) {
                metadata.messages = json.metadata.messages;
            }

            // Get possible data prefixes
            const prefixes = Object.keys(fieldsMapping);

            // Set the metadata in each table
            tables.forEach((table) => {
                table.metadata = {
                    performanceId: id
                };
            });

            // Search the data
            for (const option in sectorsData) {
                // Save factor properties in the metadata
                if (option.includes('Factor')) {
                    metadata[option] = Number(sectorsData[option]);
                }

                // Consider only selected data
                const field = prefixes.find((prefix) => option.startsWith(prefix));
                if (field) {
                    // Get the correct mapping object
                    const mapping = fieldsMapping[field as keyof typeof fieldsMapping];

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

                    // Get the right table
                    const table = tablesObj[type];

                    // Get the right array
                    const sectors = mapping[(type.charAt(0).toLowerCase() + type.slice(1)).replace('Breakdown', '')] as Array<string>,
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

                    const value = sectorsData[option];
                    if (value) {
                        // Set value of a specific category
                        table.setCell(`${column}_${match[3]}`, index, Number(value));
                    }
                }
            }

            // Clear sectors arrays
            for (const mapping of Object.values(fieldsMapping)) {
                mapping.superSector.length = 0;
                mapping.primarySector.length = 0;
                mapping.secondarySector.length = 0;
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
