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
    createFixedIncomeSectorsBreakdownRequest
} from './SharedDWSRequests';
import EquitySectorsBreakdownConverter from '../Sectors/EquitySectorsBreakdownConverter';
import FixedIncomeSectorsBreakdownConverter from '../Sectors/FixedIncomeSectorsBreakdownConverter';
import MorningstarConverter from '../../Shared/MorningstarConverter';

import type {
    InvestmentsConverters,
    InvestmentsConverterType,
    InvestmentsSecurityOptions
} from '../InvestmentsConnector/InvestmentsOptions';
import type DataTable from '@highcharts/dashboards/es-modules/Data/DataTable';
import type { DWSRequest } from '../DWSOptions';
import type { MorningstarConverterOptions } from '../../Shared';

/* *
 *
 * Constants
 *
 * */

const DATA_TABLES: { key: InvestmentsConverterType }[] = [
    { key: 'EquitySectorsBreakdown' },
    { key: 'FixedIncomeSectorsBreakdown' }
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
): Array<{ key: InvestmentsConverterType }> {
    const converterTypes = Object.keys(converters || {});

    if (converterTypes?.length) {
        const matchingTables =
            DATA_TABLES.filter(dt => converterTypes.includes(dt.key));
        return matchingTables.length ? matchingTables : DATA_TABLES;
    }

    return DATA_TABLES;
}

export function createRequests (
    dataTables: Record<string, DataTable>,
    converters: InvestmentsConverters,
    security: InvestmentsSecurityOptions
): Array<DWSRequest> {
    const requests: Array<DWSRequest> = [];

    for (const type of Object.keys(dataTables)) {
        switch (type) {
            case 'EquitySectorsBreakdown':
                requests.push(
                    createEquitySectorsBreakdownRequest(
                        converters[type],
                        security
                    )
                );
                break;
            case 'FixedIncomeSectorsBreakdown':
                requests.push(
                    createFixedIncomeSectorsBreakdownRequest(
                        converters[type],
                        security
                    )
                );
                break;
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
    }
}
