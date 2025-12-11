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
    createRegionExposureRequest,
    createMockAssetAllocRequest,
    createMockBasicDetailsRequest,
    createNestedTablesRequest
} from './SharedDWSRequests';
import RegionExposureConverter from './DWSConverters/RegionExposure/RegionExposureConverter';
import MockAssetAllocConverter from './DWSConverters/MockAssetAllocConverter';
import MockBasicDetailsConverter from './DWSConverters/MockBasicDetailsConverter';
import NestedTablesConverter from './DWSConverters/NestedTablesConverter';
import MorningstarConverter from '../../Shared/MorningstarConverter';

import type {
    Converters,
    InvestmentsConverters,
    InvestmentsConverterType,
    InvestmentsSecurityOptions
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
        key: 'RegionExposure',
        children: ['Equity', 'FixedIncome', 'RevenueExposure', 'FixedIncomeGeo']
    },
    { key: 'MockAssetAlloc' },
    { key: 'MockBasicDetails' },
    { key: 'NestedTablesConverter', children: ['Table1', 'Table2', 'Table3'] }
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
            case 'RegionExposure':
                requests.push(createRegionExposureRequest(converter, security));
                break;
            case 'MockAssetAlloc':
                requests.push(createMockAssetAllocRequest(converter, security));
                break;
            case 'MockBasicDetails':
                requests.push(createMockBasicDetailsRequest(converter, security));
                break;
            case 'NestedTablesConverter':
                requests.push(createNestedTablesRequest(converter, security));
        }
    }

    return requests;
}

export function initConverter (
    type: InvestmentsConverterType
): InvestmentsConverter {
    switch (type) {
        case 'RegionExposure':
            return new RegionExposureConverter();
        case 'MockAssetAlloc':
            return new MockAssetAllocConverter();
        case 'MockBasicDetails':
            return new MockBasicDetailsConverter();
        case 'NestedTablesConverter':
            return new NestedTablesConverter();
    }
}
