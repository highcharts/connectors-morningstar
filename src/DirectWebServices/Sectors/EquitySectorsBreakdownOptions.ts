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

import type EquitySectorsBreakdownJSON from './EquitySectorsBreakdownJSON';
import type { Message } from '../InvestmentsConnector/InvestmentsJSON';
import type { MorningstarConverterOptions } from '../../Shared/MorningstarOptions';
import type { InvestmentsConverterMetadata } from '../Shared/SharedDWSInvestments';

/* *
 *
 *  Interfaces
 *
 * */

export interface EquitySectorsBreakdownConverterOptions extends MorningstarConverterOptions {
    json: EquitySectorsBreakdownJSON.EquitySectorsBreakdownResponse;
}

export interface EquitySectorsBreakdownConverterMetadata extends InvestmentsConverterMetadata {
    messages?: Array<Message>;
    performanceId?: string;
}
