/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Jedrzej Ruta
 *
 * */


'use strict';


/* *
*
*  Imports
*
* */


import type { CountryAndRegionExposureMetadata, CountryAndRegionExposureOptions } from './CountryAndRegionExposureOptions';
import MorningstarConverter from '../../../../Shared/MorningstarConverter';
import { DataTable } from '../../../../Shared/External';

/**
 *
 * Constants
 *
 */


const PREFIXES = {
    Equity: 'equityRegion',
    FixedIncome: 'fixedIncRegion',
    FixedIncomeGeo: 'fixdIncGeographic',
    RevenueExposure: 'revenueExposureByRegionPerc'
};

const GEO_SUBPREFIXES = [
    'DevelopmentStatusBreakdown',
    'SuperRegionBreakdown',
    'PrimaryRegionBreakdown',
    'RegionBreakdown'
];

const SUFFIXES = [
    'PercLongRescaled',
    'PercLong',
    'PercNet',
    'CalcShortFiperc',
    'CalcNetFiperc',
    'CalcLongFiperc'
];

/* *
 *
 *  Class
 *
 * */


export class CountryAndRegionExposureConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: CountryAndRegionExposureOptions
    ) {
        super(options);

        this.metadata = {
            columns: {}
        };

        this.tables = [
            new DataTable({ id: 'Region_Equity' }),
            new DataTable({ id: 'Region_FixedIncome' }),
            new DataTable({ id: 'Region_FixedIncomeGeo' }),
            new DataTable({ id: 'Region_RevenueExposure' })
        ];
    }

    /**
     *
     *  Properties
     *
     */

    public readonly metadata: CountryAndRegionExposureMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public override parse (options: CountryAndRegionExposureOptions): void {
        const tables = this.tables,
            metadata = this.metadata,
            json = options.json,
            countryAndRegionalExposureBreakdown = json.countryAndRegionalExposureBreakdown;
        type ExposureType = keyof typeof PREFIXES;

        if (countryAndRegionalExposureBreakdown) {
            const tableRecords: Record<ExposureType, {
                table: DataTable,
                rowIndexByRegion: Record<string, number>,
                nextRowIndex: number
            }> = {
                Equity: { table: tables[0], rowIndexByRegion: {}, nextRowIndex: 0 },
                FixedIncome: { table: tables[1], rowIndexByRegion: {}, nextRowIndex: 0 },
                FixedIncomeGeo: { table: tables[2], rowIndexByRegion: {}, nextRowIndex: 0 },
                RevenueExposure: { table: tables[3], rowIndexByRegion: {}, nextRowIndex: 0 }
            };

            for (const key in countryAndRegionalExposureBreakdown) {
                if (
                    key.includes('Country') ||
                    key.includes('DevStatus')
                ) continue;

                const type = (Object.keys(PREFIXES) as ExposureType[])
                    .find(t => key.startsWith(PREFIXES[t]));

                if (!type) continue;

                const tableRecord = tableRecords[type];
                const { table, rowIndexByRegion } = tableRecord;

                // Create empty table metadata record instead of casting
                if (!table.metadata) {
                    table.metadata = {};
                }

                // Assign metadata for RescalingFactor and RevenueExposureDate
                if (
                    key.includes('Factor') ||
                    key.includes('Date')
                ) {
                    table.metadata[key] = countryAndRegionalExposureBreakdown[key];
                    continue;
                }

                // Cast value to number from string
                const value = Number(countryAndRegionalExposureBreakdown[key]);

                const prefix = PREFIXES[type];

                // If no suffix found, fallback to 'Perc' for RevenueExposure
                const suffix = SUFFIXES.find(s => key.endsWith(s)) || 'Perc';
                let regionKey;

                if (type === 'RevenueExposure') {
                    regionKey = key.slice(prefix.length);
                } else if (type === 'FixedIncomeGeo') {
                    let rest = key.slice(prefix.length);
                    const sub = GEO_SUBPREFIXES.find(s => rest.startsWith(s));
                    if (!sub) continue;

                    rest = rest.slice(sub.length);
                    regionKey = rest.slice(0, rest.length - suffix.length);
                } else {
                    regionKey = key.slice(prefix.length, key.length - suffix.length);
                }

                let rowIndex = rowIndexByRegion[regionKey];
                if (rowIndex === undefined) {
                    rowIndex = tableRecord.nextRowIndex++;
                    rowIndexByRegion[regionKey] = rowIndex;

                    table.setCell(
                        'Region',
                        rowIndex,
                        regionKey
                    );
                }

                table.setCell(
                    suffix,
                    rowIndex,
                    value
                );
            }
        }

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


export default CountryAndRegionExposureConverter;
