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
    createCountryAndRegionExposureRequest,
    createEquitySectorsBreakdownRequest,
    createFixedIncomeSectorsBreakdownRequest,
    createAssetAllocRequest
} from './SharedDWSRequests';
import CountryAndRegionExposureConverter from './DWSConverters/CountryAndRegionExposure/CountryAndRegionExposureConverter';
import EquitySectorsBreakdownConverter from '../Sectors/EquitySectorsBreakdownConverter';
import FixedIncomeSectorsBreakdownConverter from '../Sectors/FixedIncomeSectorsBreakdownConverter';
import AssetAllocationBreakdownConverter from './DWSConverters/AssetAllocationBreakdown/AssetAllocationBreakdownConverter';
import MorningstarConverter from '../../Shared/MorningstarConverter';

import type {
    Converters,
    ConverterMetadata,
    InvestmentsConverters,
    InvestmentsConverterType,
    InvestmentsSecurityOptions
} from '../InvestmentsConnector/InvestmentsOptions';
import type { DWSRequest } from '../DWSOptions';
import type { MorningstarConverterOptions, MorningstarMetadata } from '../../Shared';

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
    },
    {
        key: 'CountryAndRegionExposure',
        children: [
            'Region_Equity',
            'Region_FixedIncome',
            'Region_RevenueExposure',
            'Region_FixedIncomeGeo',
            'Country_Equity',
            'Country_Breakdown',
            'Country_RevenueExposure'
        ]
    },
    {
        key: 'EquitySectorsBreakdown',
        children: ['EqSuperSectors', 'EqSectors', 'EqIndustries']
    },
    {
        key: 'FixedIncomeSectorsBreakdown',
        children: [
            'IncSuperSectors',
            'IncPrimarySectors',
            'IncSecondarySectors',
            'IncBrkSuperSectors',
            'IncBrkPrimarySectors',
            'IncBrkSecondarySectors'
        ]
    }
];

/* *
 *
 * Interfaces
 *
 * */

export interface InvestmentsConverter extends MorningstarConverter {
    metadata: InvestmentsConverterMetadata;

    parse(options: MorningstarConverterOptions): void;
}

export interface InvestmentsConverterMetadata extends MorningstarMetadata, ConverterMetadata {}

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
                requests.push(
                    createAssetAllocRequest(converter, security)
                );
                break;
            case 'CountryAndRegionExposure':
                requests.push(
                    createCountryAndRegionExposureRequest(converter, security)
                );
                break;
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
        case 'CountryAndRegionExposure':
            return new CountryAndRegionExposureConverter();
        case 'EquitySectorsBreakdown':
            return new EquitySectorsBreakdownConverter();
        case 'FixedIncomeSectorsBreakdown':
            return new FixedIncomeSectorsBreakdownConverter();
    }
}
