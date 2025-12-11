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

import type EquitySectorsBreakdownJSON from './EquitySectorsBreakdownJSON';
import type {
    EquitySectorsBreakdownConverterOptions,
    EquitySectorsBreakdownMetadata
} from './EquitySectorsBreakdownOptions';

/* *
 *
 *  Class
 *
 * */

export class EquitySectorsBreakdownConverter extends MorningstarConverter {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options?: EquitySectorsBreakdownConverterOptions
    ) {
        super(options);

        // Create main data tables
        this.tables = [
            new External.DataTable({ id: 'EqSuperSectors' }),
            new External.DataTable({ id: 'EqSectors' }),
            new External.DataTable({ id: 'EqIndustries' })
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

    public readonly metadata: EquitySectorsBreakdownMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override parse (
        options: EquitySectorsBreakdownConverterOptions
    ): void {
        const tables = this.tables,
            metadata = this.metadata,
            userOptions = { ...this.options, ...options },
            json = userOptions.json,
            id = json.identifiers.performanceId,
            sectorsData = json.morningstarEquitySectorsBreakdown;

        if (sectorsData) {
            const setSectors = (
                sectors: string[],
                table: External.DataTable
            ) => {
                sectors.forEach((sector, index) => {
                    // Sector type value
                    table.setCell('Type', index, sector);

                    // Prepare a prefix for getting the right data
                    const prefix = `equityEcon${table.id.replace(/^Eq/u, '').slice(0, -1)}${sector}`;

                    // Long value
                    const long = Number(sectorsData[`${prefix}PercLong`]);
                    if (long) {
                        table.setCell('PercLong', index, long);
                    }

                    // LongRescaled value
                    const longRescaled =
                        Number(sectorsData[`${prefix}PercLongRescaled`]);
                    if (longRescaled) {
                        table.setCell('PercLongRescaled', index, longRescaled);
                    }

                    // Short value
                    const short = Number(sectorsData[`${prefix}PercShort`]);
                    if (short) {
                        table.setCell('PercShort', index, short);
                    }

                    // Net value
                    const net = Number(sectorsData[`${prefix}PercNet`]);
                    if (net) {
                        table.setCell('PercNet', index, net);
                    }
                });

                // Set metadata for sector related table
                table.metadata = {
                    performanceId: id,
                    equityEconSectorRescalingFactorLong:
                        metadata.equityEconSectorRescalingFactorLong
                };
            };

            function setIndustries (
                sectorsData: EquitySectorsBreakdownJSON.MorningstarEquitySectorsBreakdownItem,
                table: External.DataTable
            ): void {
                // Pattern to find industry related records
                const pattern = new RegExp(
                    '^equityIndustry(.+)(' + SectorsBreakdown.suffixes.join('|') + ')$',
                    'u'
                );
                const industries: Array<string> = [];

                let index = 0;
                for (const key in sectorsData) {
                    const match = key.match(pattern);
                    if (match) {
                        const industryName = match[1];

                        // New industry
                        if (!industries.includes(industryName)) {
                            // Industry type value
                            table.setCell('Type', index, industryName);

                            // Industry Long, RescaledLong, Short and Net values
                            SectorsBreakdown.suffixes.forEach((suffix) => {
                                const industryValue = sectorsData[
                                    `equityIndustry${industryName}${suffix}`
                                ];

                                // Set value of a specific category
                                if (industryValue) {
                                    table.setCell(suffix, index, Number(industryValue));
                                }
                            });

                            // Save industry
                            industries.push(industryName);
                            index++;
                        }
                    }
                }

                // Set metadata for industry related table
                table.metadata = {
                    performanceId: id,
                    equityIndustryRescalingFactorLong: metadata.equityIndustryRescalingFactorLong
                };
            }

            // Metadata
            metadata.performanceId = id;
            metadata.equityEconSectorRescalingFactorLong =
                Number(sectorsData.equityEconSectorRescalingFactorLong) || 0;
            metadata.equityIndustryRescalingFactorLong =
                Number(sectorsData.equityIndustryRescalingFactorLong) || 0;

            if (json.metadata.messages?.length) {
                metadata.messages = json.metadata.messages;
            }

            // Super Sectors
            setSectors(SectorsBreakdown.superSectors, tables[0]);

            // Sectors
            setSectors(SectorsBreakdown.sectors, tables[1]);

            // Industries
            setIndustries(sectorsData, tables[2]);
        }
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default EquitySectorsBreakdownConverter;
