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

import type {
    MorningstarConverterOptions,
    MorningstarMetadata
} from '../../../../Shared';
import type { Message } from '../../../InvestmentsConnector/InvestmentsJSON';
import type ProspectusFeesJSON from './ProspectusFeesJSON';

export interface ProspectusFeesConverterOptions extends MorningstarConverterOptions {
    json: ProspectusFeesJSON.ProspectusFeesResponse;
}

export interface ProspectusFeesConverterMetadata extends MorningstarMetadata {
    performanceId?: string;
    messages?: Array<Message>;
}
