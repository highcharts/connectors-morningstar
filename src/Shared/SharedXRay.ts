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
    HistoricalPerformanceConverter,
    UnderlyHoldingsConverter,
    XRayTrailingPerformanceConverter,
    RiskStatisticsConverter,
    XRayAssetAllocationsConverter,
    XRayGlobalStockSectorConverter,
    XRayRegionalExposureConverter,
    XRayStyleBoxConverter
} from './Converters';

import type MorningstarConverter from './MorningstarConverter';
import type { XRayConverterOptions } from '../XRay';

/* *
 *
 *  Constants
 *
 * */

export const DATA_TABLES = [
    { key: 'AssetAllocation' },
    { key: 'GlobalStockSector' },
    { key: 'HistoricalPerformanceSeries' },
    { key: 'RegionalExposure' },
    { key: 'RiskStatistics' },
    { key: 'StyleBox' },
    { key: 'TrailingPerformance' },
    { key: 'UnderlyHoldings' }
];

/* *
 *
 * Interfaces
 *
 * */

export interface XRayConverter extends MorningstarConverter {
    parse(options: XRayConverterOptions): void;
}

/* *
 *
 * Functions
 *
 * */

export function initConverter (
    dataPoint: string
): XRayConverter {
    switch (dataPoint) {
        case 'HistoricalPerformanceSeries':
            return new HistoricalPerformanceConverter();
        case 'TrailingPerformance':
            return new XRayTrailingPerformanceConverter();
        case 'RiskStatistics':
            return new RiskStatisticsConverter();
        case 'UnderlyHoldings':
            return new UnderlyHoldingsConverter();
        case 'AssetAllocation':
            return new XRayAssetAllocationsConverter();
        case 'GlobalStockSector':
            return new XRayGlobalStockSectorConverter();
        case 'RegionalExposure':
            return new XRayRegionalExposureConverter();
        case 'StyleBox':
            return new XRayStyleBoxConverter();
        default:
            throw new Error(`Unsupported key: ${dataPoint}`);
    }

}
