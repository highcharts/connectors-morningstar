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

import type { MorningstarOptions } from '../../Shared/MorningstarOptions';
import type { DWSConnectorMetadata } from '../DWSOptions';

/* *
 *
 *  API Options
 *
 *
 * */

export type InvestmentsConverters = Partial<Record<InvestmentsConverterType, InvestmentsConverterOptions>>;

export type Converters = Array<{ key: InvestmentsConverterType, children?: string[] }>;

export type InvestmentsConverterType =
    'AssetAllocationBreakdown' |
    'CountryAndRegionExposure' |
    'EquitySectorsBreakdown' |
    'EquityStyleBox' |
    'FixedIncomeSectorsBreakdown' |
    'ProspectusFees';

export interface InvestmentsConnectorMetadata extends DWSConnectorMetadata, ConnectorMetadata {}

export type ConnectorMetadata = {
    [K in InvestmentsConverterType]?: {
        [key: string]: unknown;
    };
};

export interface InvestmentsOptions extends MorningstarOptions {
    converters?: InvestmentsConverters;
    security?: InvestmentsSecurityOptions;
}

export interface InvestmentsConverterOptions {
    startDate?: string;
    endDate?: string;
}

export interface InvestmentsSecurityOptions {
    id: string;
}

/* *
 *
 *  Default Export
 *
 * */

export default InvestmentsOptions;
