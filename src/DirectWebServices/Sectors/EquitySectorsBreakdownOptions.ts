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

import EquitySectorsBreakdownJSON from './EquitySectorsBreakdownJSON';
import SectorsBreakdown from './SectorsBreakdownOptions';

import type {
    MorningstarConverterOptions,
    MorningstarMetadata
} from '../../Shared/MorningstarOptions';

/* *
 *
 *  Interfaces
 *
 * */

export interface EquitySectorsBreakdownConverterOptions extends MorningstarConverterOptions {
    json: EquitySectorsBreakdownJSON.EquitySectorsBreakdownResponse;
}

export interface EquitySectorsBreakdownMetadata extends MorningstarMetadata {
    performanceId?: string;
    equityEconSectorRescalingFactorLong?: number;
    equityIndustryRescalingFactorLong?: number;
    messages?: Array<SectorsBreakdown.Message>;
}
