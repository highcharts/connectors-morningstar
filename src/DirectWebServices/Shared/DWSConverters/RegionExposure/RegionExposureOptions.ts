/* *
 *
 *  (c) 2009-2025 Highsoft AS
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

export interface RegionExposureOptions extends MorningstarConverterOptions {
    json: RegionExposureJSON.RegionExposureResponse;
}

export interface RegionExposureMetadata extends MorningstarMetadata {
    performanceId?: string;
    messages?: Array<Message>;
    equityRegionRescalingFactorLong?: number;
    fixedIncRegionRescalingFactorLong?: number;
    revenueExposureByRegionDate?: string;
}
