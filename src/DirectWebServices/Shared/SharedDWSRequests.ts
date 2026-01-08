/* *
 *
 *  (c) 2009-2026 Highsoft AS
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

export function createAssetAllocRequest (
    converter: InvestmentsConverterOptions,
    security: InvestmentsSecurityOptions
): DWSRequest {
    const { id } = security;

    return {
        type: 'AssetAllocationBreakdown',
        url: `investments/${id}/asset-Allocation-Breakdown`
    };
}

export function createCountryAndRegionExposureRequest (
    converter: InvestmentsConverterOptions,
    security: InvestmentsSecurityOptions
): DWSRequest {
    const { id } = security;

    return {
        type: 'CountryAndRegionExposure',
        url: `investments/${id}/country-and-regional-exposure-breakdown`
    };
}

export function createEquitySectorsBreakdownRequest (
    converter: InvestmentsConverterOptions,
    security: InvestmentsSecurityOptions
): DWSRequest {
    const { id } = security;

    return {
        type: 'EquitySectorsBreakdown',
        url: `investments/${id}/morningstar-equity-sectors-breakdown`
    };
}

export function createEquityStyleBoxRequest (
    converter: InvestmentsConverterOptions,
    security: InvestmentsSecurityOptions
): DWSRequest {
    const { id } = security;

    // Look for the start and end dates
    const { startDate, endDate } = converter;

    return {
        type: 'EquityStyleBox',
        url:
            startDate && endDate ?
                `investments/${id}/equity-style-box?startDate=${startDate}&endDate=${endDate}` :
                `investments/${id}/equity-style-box`
    };
}

export function createFixedIncomeSectorsBreakdownRequest (
    converter: InvestmentsConverterOptions,
    security: InvestmentsSecurityOptions
): DWSRequest {
    const { id } = security;

    return {
        type: 'FixedIncomeSectorsBreakdown',
        url: `investments/${id}/morningstar-fixed-income-sectors-breakdown`
    };
}
