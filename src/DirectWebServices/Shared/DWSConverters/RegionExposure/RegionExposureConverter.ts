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


import type { RegionExposureOptions } from './RegionExposureOptions';
import MorningstarConverter from '../../../../Shared/MorningstarConverter';

/**
 *
 * Constants
 *
 */


const PREFIXES = {
    Equity: 'equityRegion',
    FixedIncome: 'fixedIncRegion',
    FixedIncomeGeographic: 'fixdIncGeographic',
    RevenueExposure: 'revenueExposureByRegionPerc'
};

const GEO_SUBPREFIXES = [
    'DevelopmentStatusBreakdown',
    'SuperRegionBreakdown',
    'PrimaryRegionBreakdown',
    'RegionBreakdown'
] as const;

const REGIONS: Record<string, string> = {
    Africa: 'Africa',
    AfricaormiddleEast: 'Africa/Middle East',
    Americas: 'Americas',
    AsiaDev: 'Asia (Developed)',
    AsiaDeveloped: 'Asia (Developed)',
    AsiaEmrg: 'Asia (Emerging)',
    AsiaEmerging: 'Asia (Emerging)',
    Australasia: 'Australasia',
    Canada: 'Canada',
    Developed: 'Developed Markets',
    EuropeDeveloped: 'Europe (Developed)',
    EuropeDev: 'Europe (Developed)',
    EuropeEmrg: 'Europe (Emerging)',
    EuropeEmerging: 'Europe (Emerging)',
    EuropeExEuro: 'Europe ex-Eurozone',
    EuropeExEur: 'Europe ex-Eurozone',
    Eurozone: 'Eurozone',
    Emerging: 'Emerging Markets',
    GreaterAsia: 'Greater Asia',
    GreaterEurope: 'Greater Europe',
    Japan: 'Japan',
    LatinAmerica: 'Latin America',
    Latinam: 'Latin America',
    MiddleEast: 'Middle East',
    Mideast: 'Middle East',
    NorthAmerica: 'North America',
    NotClassified: 'Not Classified',
    Uk: 'United Kingdom',
    Unclassified: 'Not Classified',
    UnitedKingdom: 'United Kingdom',
    UnitedStates: 'United States',
    Unknown: 'Unknown',
    Us: 'United States'
};

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


export class RegionExposureConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: RegionExposureOptions
    ) {
        super(options);

        this.metadata = {};
    }

    /**
     *
     *  Properties
     *
     */

    public readonly metadata: Record<string, unknown>;


    /* *
     *
     *  Functions
     *
     * */


    public override parse (options: RegionExposureOptions): void {
        const metadata = this.metadata,
            table = this.table,
            json = options.json,
            countryAndRegionalExposureBreakdown = json.countryAndRegionalExposureBreakdown;

        if (countryAndRegionalExposureBreakdown) {
            const rowIndexByRegion: Record<string, number> = {};
            let nextRowIndex = 0;

            for (const key in countryAndRegionalExposureBreakdown) {
                if (
                    key.includes('Country') ||
                    key.includes('DevStatus')
                ) continue;

                // Assign metadata for RescalingFactor and RevenueExposureDate
                if (
                    key.includes('Factor') ||
                    key.includes('Date')
                ) {
                    metadata[key] = countryAndRegionalExposureBreakdown[key];
                }

                // Cast value to number from string
                const value = Number(countryAndRegionalExposureBreakdown[key]);

                type ExposureType = keyof typeof PREFIXES;
                const type = (Object.keys(PREFIXES) as ExposureType[])
                    .find(t => key.startsWith(PREFIXES[t]));

                if (!type) continue;

                const prefix = PREFIXES[type];

                // If no suffix found, fallback to 'Perc' for RevenueExposure
                const suffix = SUFFIXES.find(s => key.endsWith(s)) || 'Perc';
                let regionKey;

                if (type === 'RevenueExposure') {
                    regionKey = key.slice(prefix.length);
                } else if (type === 'FixedIncomeGeographic') {
                    let rest = key.slice(prefix.length);
                    const sub = GEO_SUBPREFIXES.find(s => rest.startsWith(s));
                    if (!sub) continue;

                    rest = rest.slice(sub.length);
                    regionKey = rest.slice(0, rest.length - suffix.length);
                } else {
                    regionKey = key.slice(prefix.length, key.length - suffix.length);
                }

                // Assign region based on regionKey
                const region = REGIONS[regionKey];

                let rowIndex = rowIndexByRegion[region];
                if (rowIndex === undefined) {
                    rowIndex = nextRowIndex++;
                    rowIndexByRegion[region] = rowIndex;

                    table.setCell(
                        'Region',
                        rowIndex,
                        region
                    );
                }

                table.setCell(
                    `${type}_${suffix}`,
                    rowIndex,
                    value
                );
            }
        }

        metadata.performanceId = json.identifiers.performanceId;

        if (json.metadata.messages?.length) {
            metadata.messages = json.metadata.messages;
        }

        (table.metadata as Record<string, unknown>) = this.metadata;
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default RegionExposureConverter;
