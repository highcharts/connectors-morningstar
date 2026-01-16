/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Jedrzej Ruta
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
import type RegionExposureJSON from './RegionExposureJSON';

export interface RegionExposureConverterOptions extends MorningstarConverterOptions {
    json: RegionExposureJSON.RegionExposureResponse;
}

export interface RegionExposureConverterMetadata extends MorningstarMetadata {
    performanceId?: string;
    messages?: Array<Message>;
}
