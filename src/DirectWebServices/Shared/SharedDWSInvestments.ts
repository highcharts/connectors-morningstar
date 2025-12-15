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


/* *
*
*  Imports
*
* */

import {
    createAssetAllocRequest
} from './SharedDWSRequests';
import AssetAllocationBreakdownConverter from './DWSConverters/AssetAllocationBreakdown/AssetAllocationBreakdownConverter';
import MorningstarConverter from '../../Shared/MorningstarConverter';

import type {
    InvestmentsConverters,
    InvestmentsConverterType,
    InvestmentsSecurityOptions,
    Converters
} from '../InvestmentsConnector/InvestmentsOptions';
import type { DWSRequest } from '../DWSOptions';
import type { MorningstarConverterOptions } from '../../Shared';

/* *
 *
 * Constants
 *
 * */

const CONVERTERS: Converters = [
    { 
        key: 'AssetAllocationBreakdown', 
        children: [
            'AssetAlloc',
            'CanadianAssetAlloc',
            'UnderlyingAssetAlloc'
        ]
    }
];

/* *
 *
 * Interfaces
 *
 * */

export interface InvestmentsConverter extends MorningstarConverter {
    parse(options: MorningstarConverterOptions): void;
}

/* *
 *
 * Functions
 *
 * */

export function pickConverters (
    converters?: InvestmentsConverters
): Converters {
    const converterTypes = Object.keys(converters || {});

    if (converterTypes?.length) {
        const matchingTables = CONVERTERS.filter(dt => converterTypes.includes(dt.key));
        return matchingTables.length ? matchingTables : CONVERTERS;
    }

    return CONVERTERS;
}

export function dataTablesFromConverters (
    converters: Converters
): Array<{ key: string }> {
    return converters.flatMap(converter =>
        converter.children?.map(child => ({ key: child })) || [{ key: converter.key }]
    );
}

export function createRequests (
    convertersToUse: Converters,
    userConverters: InvestmentsConverters,
    security: InvestmentsSecurityOptions
): Array<DWSRequest> {
    const requests: Array<DWSRequest> = [];

    for (const { key: type } of convertersToUse) {
        const converter = userConverters[type];

        if (!converter) {
            continue;
        }
        switch (type) {
            case 'AssetAllocationBreakdown':
                requests.push(createAssetAllocRequest(converter, security));
                break;
        }
    }

    return requests;
}

export function initConverter (
    type: InvestmentsConverterType
): InvestmentsConverter {
    switch (type) {
        default:
        case 'AssetAllocationBreakdown':
            return new AssetAllocationBreakdownConverter();
    }
}
