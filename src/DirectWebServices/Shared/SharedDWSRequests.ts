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

'use strict';

import type { DWSRequest } from '../DWSOptions';
import type { InvestmentsConverterOptions, InvestmentsSecurityOptions } from '../InvestmentsConnector/InvestmentsOptions';

/* *
 *
 * Functions
 *
 * */


export function createRegionExposureRequest (
    converter: InvestmentsConverterOptions,
    security: InvestmentsSecurityOptions
): DWSRequest {
    const { id } = security;

    return {
        type: 'RegionExposure',
        url: `investments/${id}/country-and-regional-exposure-breakdown`
    };
}


export function createMockAssetAllocRequest (
    converter: InvestmentsConverterOptions,
    security: InvestmentsSecurityOptions
): DWSRequest {
    const { id } = security;

    return {
        type: 'MockAssetAlloc',
        url: `investments/${id}/asset-Allocation-Breakdown`
    };
}


export function createMockBasicDetailsRequest (
    converter: InvestmentsConverterOptions,
    security: InvestmentsSecurityOptions
): DWSRequest {
    const { id } = security;

    return {
        type: 'MockBasicDetails',
        url: `investments/${id}/investment-Basic-Details`
    };
}


export function createNestedTablesRequest (
    converter: InvestmentsConverterOptions,
    security: InvestmentsSecurityOptions
): DWSRequest {
    const { id } = security;

    return {
        type: 'NestedTablesConverter',
        url: `investments/${id}/asset-Allocation-Breakdown`
    };
}
