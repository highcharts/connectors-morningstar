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
    createEquitySectorsBreakdownRequest,
    createFixedIncomeSectorsBreakdownRequest,
    createNestedTablesRequest
} from './SharedDWSRequests';
import EquitySectorsBreakdownConverter from '../Sectors/EquitySectorsBreakdownConverter';
import FixedIncomeSectorsBreakdownConverter from '../Sectors/FixedIncomeSectorsBreakdownConverter';
import NestedTablesConverter from './DWSConverters/NestedTablesConverter';
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
    { key: 'EquitySectorsBreakdown' },
    { key: 'FixedIncomeSectorsBreakdown' },
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
            case 'EquitySectorsBreakdown':
                requests.push(
                    createEquitySectorsBreakdownRequest(converter, security)
                );
                break;
            case 'FixedIncomeSectorsBreakdown':
                requests.push(
                    createFixedIncomeSectorsBreakdownRequest(converter, security)
                );
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
        case 'EquitySectorsBreakdown':
            return new EquitySectorsBreakdownConverter();
        case 'FixedIncomeSectorsBreakdown':
            return new FixedIncomeSectorsBreakdownConverter();
        case 'NestedTablesConverter':
            return new NestedTablesConverter();
    }
}
