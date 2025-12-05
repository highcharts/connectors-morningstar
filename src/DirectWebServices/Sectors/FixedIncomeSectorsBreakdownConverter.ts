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

import { FieldsMapping } from './FixedIncomeSectorsBreakdownJSON';
import {
    FixedIncomeSectorsBreakdownConverterOptions,
    FixedIncomeSectorsBreakdownMetadata
} from './FixedIncomeSectorsBreakdownOptions';
import SectorsBreakdown from './SectorsBreakdownOptions';
import MorningstarConverter from '../../Shared/MorningstarConverter';

// The fields mapping object
const fieldsMapping: FieldsMapping = {
    fixdInc: {
        pattern: new RegExp(
            `^fixdInc(${SectorsBreakdown.sectorTypes.join('Brkdwn|')})([^_]+)(${SectorsBreakdown.suffixesFiperc.join('|')})$`,
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
        const table = this.table;
        const metadata = this.metadata;
        const userOptions = { ...this.options, ...options };
        const json = userOptions.json;
        const id = json.identifiers.performanceId;
        const sectorsData = json.morningstarFixedIncomeSectorsBreakdown;

        if (sectorsData) {
            let initTypeColumns = true;
            // Search the data
            for (const option in sectorsData) {
                // Use the mapping object
                for (const [field, mapping] of Object.entries(fieldsMapping)) {
                    // Try to find matching proeprty
                    const match = option.match(mapping.pattern);
                    if (!match) {
                        continue;
                    }
                    const column = mapping.column;

                    // The init of the sector types columns
                    if (initTypeColumns) {
                        SectorsBreakdown.sectorTypes.forEach((type) => {
                            if (type !== 'SecondrySector') {
                                const sectorsArray =
                                    mapping[type.charAt(0).toLowerCase() + type.slice(1)] as Array<string>;

                                if (!sectorsArray.length) {
                                    table.setColumn(`${type}_${column}_Type_${id}`);
                                }
                            }
                        });
                        initTypeColumns = false;
                    }

                    // Get correct type and name
                    const type = match[1] === 'SecondrySector' ? 'SecondarySector' : match[1];
                    const name = match[2];
                    const typeAndName = `${type}${name}`;

                    // Get the righ array
                    const sectors = mapping[type.charAt(0).toLowerCase() + type.slice(1)] as Array<string>;

                    // New sector
                    if (sectors && !sectors.includes(typeAndName)) {
                        // Save breakdown sector
                        sectors.push(typeAndName);
                        const index = sectors.length - 1;

                        // Sector type value
                        table.setCell(
                            `${type}_${column}_Type_${id}`,
                            index,
                            name
                        );

                        // Sector values
                        mapping.suffixes.forEach((suffix) => {
                            const value = sectorsData[
                                `${field}${type}${name}${suffix}`
                            ];

                            // Set value of a specific category
                            if (value) {
                                table.setCell(
                                    `${type}_${column}_${suffix}_${id}`,
                                    index,
                                    Number(value)
                                );
                            }
                        });
                    }
                }
            }

            // Clear sector arrays
            for (const mapping of Object.values(fieldsMapping)) {
                mapping.superSector.length = 0;
                mapping.primarySector.length = 0;
                mapping.secondarySector.length = 0;
            }

            // Metadata
            metadata.performanceId = id;

            if (json.metadata.messages?.length) {
                metadata.messages = json.metadata.messages;
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
