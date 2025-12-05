/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
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
} from '../../../../Shared/MorningstarOptions';
import { Message } from '../../../InvestmentsConnector/InvestmentsJSON';
import AssetAllocationBreakdownJSON from './AssetAllocationBreakdownJSON';

export interface AssetAllocationBreakdownConverterOptions extends MorningstarConverterOptions {
    json: AssetAllocationBreakdownJSON.AssetAllocationBreakdownResponse;
}

export interface AssetAllocationBreakdownMetadata extends MorningstarMetadata {
    performanceId?: string;
    messages?: Array<Message>;
    equityRegionRescalingFactorLong?: number;
    fixedIncRegionRescalingFactorLong?: number;
    revenueExposureByRegionDate?: string;
}
