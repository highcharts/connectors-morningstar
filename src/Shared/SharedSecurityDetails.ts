/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


/* *
 *
 * Imports
 * 
 * */

import {
    AssetAllocationsConverter,
    TrailingPerformanceConverter,
    RegionalExposureConverter,
    GlobalStockSectorBreakdownConverter,
    CountryExposureConverter,
    MetaConverter
} from './Converters';
import { 
    SecurityDetailsConverterOptions,
    SecurityDetailsMetadata
} from '../SecurityDetails/SecurityDetailsOptions';
import MorningstarConverter from './MorningstarConverter';


/* *
 *
 * Interfaces
 * 
 * */

export interface SecurityDetailsConverter extends MorningstarConverter {
    metadata: SecurityDetailsMetadata;
    parse(options: SecurityDetailsConverterOptions): void;
}

/* *
 *
 * Functions
 * 
 * */

export function initConverter (
    converter?: SecurityDetailsConverterOptions,
    hasMultiple?: boolean
): SecurityDetailsConverter {

    switch (converter?.type) {
        case 'TrailingPerformance':
        default:
            return new TrailingPerformanceConverter({
                ...converter,
                hasMultiple
            });

        case 'AssetAllocations':
            return new AssetAllocationsConverter({
                ...converter,
                hasMultiple
            });

        case 'RegionalExposure':
            return new RegionalExposureConverter({
                ...converter,
                hasMultiple
            });

        case 'GlobalStockSectorBreakdown':
            return new GlobalStockSectorBreakdownConverter({
                ...converter,
                hasMultiple
            });

        case 'CountryExposure':
            return new CountryExposureConverter({
                ...converter,
                hasMultiple
            });
        case 'Meta':
            return new MetaConverter({
                ...converter,
                hasMultiple
            });
    }
}
