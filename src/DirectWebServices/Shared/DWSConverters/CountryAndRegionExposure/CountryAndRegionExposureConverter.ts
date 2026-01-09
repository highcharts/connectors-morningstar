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


import type {
    CountryAndRegionExposureConverterMetadata,
    CountryAndRegionExposureConverterOptions
} from './CountryAndRegionExposureOptions';
import MorningstarConverter from '../../../../Shared/MorningstarConverter';
import { DataTable } from '../../../../Shared/External';

/**
 *
 * Constants
 *
 */


const PREFIXES = {
    RegionEquity: 'equityRegion',
    RegionFixedIncome: 'fixedIncRegion',
    RegionFixedIncomeGeo: 'fixdIncGeographic',
    RegionRevenueExposure: 'revenueExposureByRegion',
    CountryEquity: 'equityCountry',
    CountryBreakdown: 'fixdIncCountryBrkdwn',
    CountryRevenueExposure: 'revenueExposureByCountry'
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
        options?: CountryAndRegionExposureConverterOptions
    ) {
        super(options);

        this.metadata = {
            columns: {}
        };

        this.tables = [
            new DataTable({ id: 'RegionEquity' }),
            new DataTable({ id: 'RegionFixedIncome' }),
            new DataTable({ id: 'RegionFixedIncomeGeo' }),
            new DataTable({ id: 'RegionRevenueExposure' }),
            new DataTable({ id: 'CountryEquity' }),
            new DataTable({ id: 'CountryBreakdown' }),
            new DataTable({ id: 'CountryRevenueExposure' })
        ];
    }

    /**
     *
     *  Properties
     *
     */

    public readonly metadata: CountryAndRegionExposureConverterMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public override parse (options: CountryAndRegionExposureConverterOptions): void {
        const tables = this.tables,
            metadata = this.metadata,
            json = options.json,
            id = json.identifiers.performanceId,
            countryAndRegionalExposureBreakdown = json.countryAndRegionalExposureBreakdown;
        type ExposureType = keyof typeof PREFIXES;

        if (countryAndRegionalExposureBreakdown) {
            const tableRecords: Record<ExposureType, {
                table: DataTable,
                rowIndexRecord: Record<string, number>,
                nextRowIndex: number
            }> = {
                RegionEquity: { table: tables[0], rowIndexRecord: {}, nextRowIndex: 0 },
                RegionFixedIncome: { table: tables[1], rowIndexRecord: {}, nextRowIndex: 0 },
                RegionFixedIncomeGeo: { table: tables[2], rowIndexRecord: {}, nextRowIndex: 0 },
                RegionRevenueExposure: { table: tables[3], rowIndexRecord: {}, nextRowIndex: 0 },
                CountryEquity: { table: tables[4], rowIndexRecord: {}, nextRowIndex: 0 },
                CountryBreakdown: { table: tables[5], rowIndexRecord: {}, nextRowIndex: 0 },
                CountryRevenueExposure: { table: tables[6], rowIndexRecord: {}, nextRowIndex: 0 }
            };

            for (const key in countryAndRegionalExposureBreakdown) {
                if (key.includes('DevStatus')) continue;

                const type = (Object.keys(PREFIXES) as ExposureType[])
                    .find(t => key.startsWith(PREFIXES[t]));

                if (!type) continue;

                const tableRecord = tableRecords[type];
                const { table, rowIndexRecord } = tableRecord;

                // Initialize table metadata object and assign performanceId
                if (!table.metadata) {
                    table.metadata = {
                        performanceId: id
                    };
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

                if (type === 'RegionRevenueExposure' || type === 'CountryRevenueExposure') {
                    regionKey = key.slice(prefix.length + suffix.length);
                } else if (type === 'RegionFixedIncomeGeo') {
                    let rest = key.slice(prefix.length);
                    const sub = GEO_SUBPREFIXES.find(s => rest.startsWith(s));
                    if (!sub) continue;

                    rest = rest.slice(sub.length);
                    regionKey = rest.slice(0, rest.length - suffix.length);
                } else {
                    regionKey = key.slice(prefix.length, key.length - suffix.length);
                }

                let rowIndex = rowIndexRecord[regionKey];
                if (rowIndex === undefined) {
                    rowIndex = tableRecord.nextRowIndex++;
                    rowIndexRecord[regionKey] = rowIndex;

                    table.setCell(
                        table.id.match(/^[A-Z][a-z]*/u)?.[0] || table.id, // Region or Country
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

        // Converter metadata
        metadata.performanceId = id;

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
