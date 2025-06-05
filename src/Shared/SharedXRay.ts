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
import { XRayConverterOptions, XRayMetadata } from '../XRay';


/* *
 *
 * Interfaces
 *
 * */

export interface XRayConverter extends MorningstarConverter {
    metadata: XRayMetadata;
    parse(options: XRayConverterOptions, benchmarkId?: string): void;
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
        case 'benchmark':
            return new BenchmarkConverter();
        case 'historicalPerformanceSeries':
            return new HistoricalPerformanceConverter();
        case 'trailingPerformance':
            return new XRayTrailingPerformanceConverter();
        case 'breakdowns':
            return new BreakdownsConverter();
        case 'riskStatistics':
            return new RiskStatisticsConverter();
        case 'underlyHoldings':
            return new UnderlyHoldingsConverter();
        default:
            throw new Error(`Unsupported key: ${dataPoint}`);
    }

}
