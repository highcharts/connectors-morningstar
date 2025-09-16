/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


/* *
 *
 * Imports
 *
 * */

import {
    CorrelationMatrixConverter,
    CreditQualityConverter,
    EquityStyleConverter,
    FixedIncomeStyleConverter,
    XrayTrailingReturnsConverter,
    AssetAllocationsConverter,
    RollingReturnsConverter,
    RiskStatisticsConverter,
    XRayCalendarYearReturnConverter,
    FundStatisticsConverter,
    HoldingsConverter,
    MPTStatisticsConverter,
    WorldRegionsConverter
} from './USConverters';

import type MorningstarConverter from './MorningstarConverter';
import type { XRayUSConverterOptions } from '../XRayUS/XRayUSOptions';

/* *
 *
 *  Constants
 *
 * */

export const DATA_TABLES = [
    { key: 'CorrelationMatrix' },
    { key: 'CreditQuality' },
    { key: 'EquityStyle' },
    { key: 'FixedIncomeStyle' },
    { key: 'TrailingReturns' },
    { key: 'AssetAllocations' },
    { key: 'RollingReturns' },
    { key: 'RiskStatistics' },
    { key: 'CalendarYearReturn' },
    { key: 'FundStatistics' },
    { key: 'Holdings' },
    { key: 'MPTStatistics' },
    { key: 'WorldRegions' }
];

/* *
 *
 * Interfaces
 *
 * */

export interface XRayUSConverter extends MorningstarConverter {
    parse(options: XRayUSConverterOptions, hasMultiple?: boolean): void;
}

/* *
 *
 * Functions
 *
 * */

export function initConverter (
    key: string
): XRayUSConverter {
    switch (key) {
        case 'CorrelationMatrix':
            return new CorrelationMatrixConverter();
        case 'CreditQuality':
            return new CreditQualityConverter();
        case 'EquityStyle':
            return new EquityStyleConverter();
        case 'FixedIncomeStyle':
            return new FixedIncomeStyleConverter();
        case 'AssetAllocations':
            return new AssetAllocationsConverter();
        case 'RollingReturns':
            return new RollingReturnsConverter();
        case 'RiskStatistics':
            return new RiskStatisticsConverter();
        case 'CalendarYearReturn':
            return new XRayCalendarYearReturnConverter();
        case 'FundStatistics':
            return new FundStatisticsConverter();
        case 'Holdings':
            return new HoldingsConverter();
        case 'MPTStatistics':
            return new MPTStatisticsConverter();
        case 'TrailingReturns':
            return new XrayTrailingReturnsConverter();
        case 'WorldRegions':
            return new WorldRegionsConverter();
        default:
            throw new Error(`Unsupported key: ${key}`);
    }

}
