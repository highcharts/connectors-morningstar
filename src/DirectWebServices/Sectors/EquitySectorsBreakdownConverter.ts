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
        const table = this.table;
        const metadata = this.metadata;
        const userOptions = { ...this.options, ...options };
        const json = userOptions.json;
        const id = json.identifiers.performanceId;
        const sectorsData = json.morningstarEquitySectorsBreakdown;

        if (sectorsData) {
            const setSectors = (sectors: string[], sectorType: string) => {
                // Set sector or super sector column
                table.setColumn(`${sectorType}_Type_${id}`);

                sectors.forEach((sector, index) => {
                    // Sector type value
                    table.setCell(`${sectorType}_Type_${id}`, index, sector);

                    const prefix = `equityEcon${sectorType}${sector}`;
                    const long = Number(sectorsData[`${prefix}PercLong`]);
                    const longRescaled =
                        Number(sectorsData[`${prefix}PercLongRescaled`]);
                    const short = Number(sectorsData[`${prefix}PercShort`]);
                    const net = Number(sectorsData[`${prefix}PercNet`]);

                    // Long value
                    if (long) {
                        table.setCell(`${sectorType}_PercLong_${id}`, index, long);
                    }

                    // LongRescaled value
                    if (longRescaled) {
                        table.setCell(
                            `${sectorType}_PercLongRescaled_${id}`,
                            index,
                            longRescaled
                        );
                    }

                    // Short value
                    const shortCol = `${sectorType}_PercShort_${id}`;
                    if (short) {
                        table.setCell(shortCol, index, short);
                    }

                    // Net value
                    if (net) {
                        table.setCell(`${sectorType}_PercNet_${id}`, index, net);
                    }
                });
            };

            function setIndustries (
                sectorsData: EquitySectorsBreakdownJSON.MorningstarEquitySectorsBreakdownItem
            ): void {
                // Pattern to find industry related records
                const pattern = new RegExp(
                    '^equityIndustry(.+)(' + SectorsBreakdown.suffixes.join('|') + ')$',
                    'u'
                );
                const typeColumn = `Industry_Type_${id}`;
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
                                        `Industry_${suffix}_${id}`,
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
            }

            // Super-sectors
            setSectors(SectorsBreakdown.superSectors, 'SuperSector');

            // Sectors
            setSectors(SectorsBreakdown.sectors, 'Sector');

            // Industries
            setIndustries(sectorsData);

            // Metadata
            metadata.performanceId = id;
            metadata.equityEconSectorRescalingFactorLong =
                Number(sectorsData.equityEconSectorRescalingFactorLong) || 0;
            metadata.equityIndustryRescalingFactorLong =
                Number(sectorsData.equityIndustryRescalingFactorLong) || 0;

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

export default EquitySectorsBreakdownConverter;
