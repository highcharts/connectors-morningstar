/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Dalek
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import SectorsBreakdownJSON, { Message } from './SectorsBreakdownJSON';
import type {
    MorningstarConverterOptions,
    MorningstarMetadata
} from '../../Shared/MorningstarOptions';

/* *
 *
 *  Interfaces
 *
 * */

export interface SectorsBreakdownConverterOptions extends MorningstarConverterOptions {
    json: SectorsBreakdownJSON.Response;
}

export interface SectorsBreakdownMetadata extends MorningstarMetadata {
    performanceId?: string;
    equityEconSectorRescalingFactorLong?: number;
    messages?: Array<Message>;
}
