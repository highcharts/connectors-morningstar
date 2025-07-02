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
    BenchmarkConverter,
    HistoricalPerformanceConverter,
    UnderlyHoldingsConverter,
    XRayTrailingPerformanceConverter,
    BreakdownsConverter,
    RiskStatisticsConverter
} from './Converters';

import MorningstarConverter from './MorningstarConverter';
import { XRayConverterOptions } from '../XRay';

/* *
 *
 *  Constants
 *
 * */

export const DATA_TABLES = [
    { key: 'Benchmark' },
    { key: 'Breakdowns' },
    { key: 'HistoricalPerformanceSeries' },
    { key: 'RiskStatistics' },
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
        case 'Benchmark':
            return new BenchmarkConverter();
        case 'HistoricalPerformanceSeries':
            return new HistoricalPerformanceConverter();
        case 'TrailingPerformance':
            return new XRayTrailingPerformanceConverter();
        case 'Breakdowns':
            return new BreakdownsConverter();
        case 'RiskStatistics':
            return new RiskStatisticsConverter();
        case 'UnderlyHoldings':
            return new UnderlyHoldingsConverter();
        default:
            throw new Error(`Unsupported key: ${dataPoint}`);
    }

}
