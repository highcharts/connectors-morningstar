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

import MorningstarConverter from '../../Shared/MorningstarConverter';
import { SectorsBreakdownConverterOptions, SectorsBreakdownMetadata } from './SectorsBreakdownOptions';

const superSectors = [
    'Cyclical',
    'Defensive',
    'Sensitive'
];

const sectors = [
    'BasicMaterials',
    'ConsumerCyclical',
    'FinancialServices',
    'RealEstate',
    'ConsumerDefensive',
    'Healthcare',
    'Utilities',
    'Communication Services',
    'Energy',
    'Industrials',
    'Technology'
];

/* *
 *
 *  Class
 *
 * */

export class SectorsBreakdownConverter extends MorningstarConverter {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options?: SectorsBreakdownConverterOptions
    ) {
        super(options);
        this.metadata = {
            columns: {}
        };
    }

    /**
     *
     *  Properties
     *
     */

    public readonly metadata: SectorsBreakdownMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override parse (options: SectorsBreakdownConverterOptions): void {
        const table = this.table;
        const metadata = this.metadata;
        const userOptions = { ...this.options, ...options };
        const json = userOptions.json;
        const id = json.identifiers.performanceId;
        const sectorsData = json.morningstarEquitySectorsBreakdown;

        const setSectors = (sectors: string[], sectorType: string) => {
            // Set sector or super sector type column
            table.setColumn(`${sectorType}_Type_${id}`);

            sectors.forEach((sector, index) => {
                // Sector type value
                table.setCell(`${sectorType}_Type_${id}`, index, sector);

                const prefix = `equityEcon${sectorType}${sector}`;
                const long = Number(sectorsData[`${prefix}PercLong`]);
                const longRescaled = sectorsData[`${prefix}PercLongRescaled`];
                const short = sectorsData[`${prefix}PercShort`];
                const net = sectorsData[`${prefix}PercNet`];

                // Long value
                if (long) {
                    table.setCell(`${sectorType}_Long_${id}`, index, long);
                }

                // LongRescaled value
                if (longRescaled) {
                    table.setCell(
                        `${sectorType}_LongRescaled_${id}`,
                        index,
                        longRescaled
                    );
                }

                // Short value
                const shortCol = `${sectorType}_Short_${id}`;
                if (short) {
                    table.setCell(shortCol, index, short);
                } else if (net) {
                    table.setCell(shortCol, index, long - (net as number));
                }

                // Net value
                if (net) {
                    table.setCell(`${sectorType}_Net_${id}`, index, net);
                }
            });
        };

        // Super-sectors
        setSectors(superSectors, 'SuperSector');

        // Sectors
        setSectors(sectors, 'Sector');

        // Metadata
        metadata.performanceId = id;
        metadata.equityEconSectorRescalingFactorLong =
            Number(sectorsData.equityEconSectorRescalingFactorLong) || 0;

        if (json.metadata.messages?.length) {
            metadata.messages = json.metadata.messages;
        }
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default SectorsBreakdownConverter;
