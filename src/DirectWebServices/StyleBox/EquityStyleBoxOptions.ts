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

import type EquityStyleBoxJSON from './EquityStyleBoxJSON';
import type { Message } from '../InvestmentsConnector/InvestmentsJSON';
import type { MorningstarConverterOptions, MorningstarMetadata } from '../../Shared/MorningstarOptions';

/* *
 *
 *  Interfaces
 *
 * */

export interface EquityStyleBoxConverterOptions extends MorningstarConverterOptions {
    json: EquityStyleBoxJSON.EquityStyleBoxResponse;
}

export interface EquityStyleBoxConverterMetadata extends MorningstarMetadata {
    messages?: Array<Message>;
    performanceId?: string;
}
