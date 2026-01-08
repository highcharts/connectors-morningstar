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

/* *
 *
 *  Imports
 *
 * */

import type { InvestmentsConverterType } from './InvestmentsConnector/InvestmentsOptions';
import type { MorningstarMetadata, MorningstarOptions } from '../Shared/MorningstarOptions';

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

export interface DWSConnectorOptions extends MorningstarOptions {
    languageId?: 'ENG' | 'SPA' | 'FRA' | 'DEU' | 'ITA' | 'JPN' | 'CHI' | 'ZHO' | 'KOR';
    requests?: Array<DWSRequest>;
}

export interface DWSConnectorMetadata extends MorningstarMetadata {
    rawResponses: Array<{ type: InvestmentsConverterType; json: unknown }>;
}

/* *
 *
 *  Default Export
 *
 * */

export default DWSConnectorOptions;
