/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 * - Jedrzej Ruta
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */

import { RegionExposureConverterOptions, RegionExposureMetadata } from './RegionExposureOptions';
import MorningstarConverter from '../../../Shared/MorningstarConverter';


/**
 *
 * Constants
 *
 */


const PREFIXES = {
    Equity: 'equityRegion',
    FixedIncome: 'fixedIncRegion',
    RevenueExposure: 'revenueExposureByRegionPerc'
};

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
    Unclassified: 'Not Classified',
    UnitedKingdom: 'United Kingdom',
    Uk: 'United Kingdom',
    UnitedStates: 'United States',
    Us: 'United States'
};

const SUFFIXES = [
    'PercLongRescaled',
    'PercLong',
    'PercNet'
];

export class RegionExposureConverter extends MorningstarConverter {

    /* *
        *
        *  Constructor
        *
        * */


    public constructor (
        options?: RegionExposureConverterOptions
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

    public readonly metadata: RegionExposureMetadata;


    /* *
        *
        *  Functions
        *
        * */


    public override parse (
        options: RegionExposureConverterOptions
    ): void {
        const metadata = this.metadata,
            table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            json =
                userOptions.json,
            countryAndRegionalExposureBreakdown = json.countryAndRegionalExposureBreakdown;

        if (countryAndRegionalExposureBreakdown) {
            const rowIndexByRegion: Record<string, number> = {};
            let nextRowIndex = 0;

            for (const key in countryAndRegionalExposureBreakdown) {
                // TODO: Add metadata for RescalingFactor and
                // RevenueExposureDate
                if (
                    key.includes('Country') ||
                    key.includes('Factor') ||
                    key.includes('Date')
                ) continue;

                // Cast value to number from string
                const value = Number(countryAndRegionalExposureBreakdown[key]);

                type ExposureType = keyof typeof PREFIXES;
                const type = (Object.keys(PREFIXES) as ExposureType[])
                    .find(t => key.startsWith(PREFIXES[t]));

                if (!type) continue;

                const prefix = PREFIXES[type];

                // If no suffix found, fallback to 'Perc' for RevenueExposure
                const suffix = SUFFIXES.find(s => key.endsWith(s)) || 'Perc';

                const regionKey =
                    type === 'RevenueExposure' ?
                        key.slice(prefix.length) :
                        key.slice(prefix.length, key.length - suffix.length);

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

        if (
            json.metadata.messages &&
            json.metadata.messages.length > 0
        ) {
            metadata.messages = json.metadata.messages;
        }
    }
}


/* *
*
*  Default Export
*
* */


export default RegionExposureConverter;
