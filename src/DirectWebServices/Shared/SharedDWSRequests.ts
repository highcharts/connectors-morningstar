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
