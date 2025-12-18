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
import type CountryAndRegionExposureJSON from './CountryAndRegionExposureJSON';

export interface CountryAndRegionExposureOptions extends MorningstarConverterOptions {
    json: CountryAndRegionExposureJSON.CountryAndRegionExposureResponse;
}

export interface CountryAndRegionExposureMetadata extends MorningstarMetadata {
    performanceId?: string;
    messages?: Array<Message>;
}
