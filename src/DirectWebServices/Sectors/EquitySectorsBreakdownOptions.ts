/* *
 *
 *  (c) 2009-2026 Highsoft AS
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

import type EquitySectorsBreakdownJSON from './EquitySectorsBreakdownJSON';
import type { Message } from '../InvestmentsConnector/InvestmentsJSON';
import type { MorningstarConverterOptions, MorningstarMetadata } from '../../Shared/MorningstarOptions';

/* *
 *
 *  Interfaces
 *
 * */

export interface EquitySectorsBreakdownConverterOptions extends MorningstarConverterOptions {
    json: EquitySectorsBreakdownJSON.EquitySectorsBreakdownResponse;
}

export interface EquitySectorsBreakdownConverterMetadata extends MorningstarMetadata {
    messages?: Array<Message>;
    performanceId?: string;
}
