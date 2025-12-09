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

import EquitySectorsBreakdownJSON from './EquitySectorsBreakdownJSON';
import {
    EquitySectorsBreakdownConverterOptions,
    EquitySectorsBreakdownMetadata
} from './EquitySectorsBreakdownOptions';
import SectorsBreakdown from './SectorsBreakdownOptions';
import MorningstarConverter from '../../Shared/MorningstarConverter';
import * as External from '../../Shared/External';

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
            new External.DataTable({ id: 'EqSuperSector' }),
            new External.DataTable({ id: 'EqSector' }),
            new External.DataTable({ id: 'EqIndustry' })
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
                // Set sector or super sector column
                table.setColumn(`Type_${id}`);

                sectors.forEach((sector, index) => {
                    // Sector type value
                    table.setCell(`Type_${id}`, index, sector);

                    const prefix = `equityEcon${table.id.replace(/^Eq/u, '')}${sector}`;
                    const long = Number(sectorsData[`${prefix}PercLong`]);
                    const longRescaled =
                        Number(sectorsData[`${prefix}PercLongRescaled`]);
                    const short = Number(sectorsData[`${prefix}PercShort`]);
                    const net = Number(sectorsData[`${prefix}PercNet`]);

                    // Long value
                    if (long) {
                        table.setCell(`PercLong_${id}`, index, long);
                    }

                    // LongRescaled value
                    if (longRescaled) {
                        table.setCell(
                            `PercLongRescaled_${id}`,
                            index,
                            longRescaled
                        );
                    }

                    // Short value
                    if (short) {
                        table.setCell(`PercShort_${id}`, index, short);
                    }

                    // Net value
                    if (net) {
                        table.setCell(`PercNet_${id}`, index, net);
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
                const typeColumn = `Type_${id}`;
                const industries: Array<string> = [];

                // Industry type column
                table.setColumn(typeColumn);

                let index = 0;
                for (const key in sectorsData) {
                    const match = key.match(pattern);
                    if (match) {
                        const industryName = match[1];

                        // New industry
                        if (!industries.includes(industryName)) {
                            // Industry type value
                            table.setCell(typeColumn, index, industryName);

                            // Industry Long, RescaledLong, Short and Net values
                            SectorsBreakdown.suffixes.forEach((suffix) => {
                                const industryValue = sectorsData[
                                    `equityIndustry${industryName}${suffix}`
                                ];

                                // Set value of a specific category
                                if (industryValue) {
                                    table.setCell(
                                        `${suffix}_${id}`,
                                        index,
                                        Number(industryValue)
                                    );
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
