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

import type { InvestmentsConverterType } from './InvestmentsConnector/InvestmentsOptions';
import type { MorningstarOptions } from '../Shared/MorningstarOptions';
import type { InvestmentsConverterMetadata } from './Shared/SharedDWSInvestments';

/* *
 *
 *  API Options
 *
 *
 * */

export interface DWSRequest {
    url: string;
    type: InvestmentsConverterType;
}

export interface DWSResponse {
    [key: string]: Response;
}

export interface DWSMetadata extends InvestmentsConverterMetadata {
    rawResponses: Array<{ type: InvestmentsConverterType; json: unknown }>;
}

export interface DWSOptions extends MorningstarOptions {
    languageId?: 'ENG' | 'SPA' | 'FRA' | 'DEU' | 'ITA' | 'JPN' | 'CHI' | 'ZHO' | 'KOR';
    requests?: Array<DWSRequest>;
}

/* *
 *
 *  Default Export
 *
 * */

export default DWSOptions;
