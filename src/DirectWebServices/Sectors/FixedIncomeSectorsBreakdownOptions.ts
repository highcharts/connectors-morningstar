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

import SectorsBreakdown from './SectorsBreakdownOptions';

import type FixedIncomeSectorsBreakdownJSON from './FixedIncomeSectorsBreakdownJSON';
import type {
    MorningstarConverterOptions,
    MorningstarMetadata
} from '../../Shared/MorningstarOptions';

/* *
 *
 *  Interfaces
 *
 * */

export interface FixedIncomeSectorsBreakdownConverterOptions extends MorningstarConverterOptions {
    json: FixedIncomeSectorsBreakdownJSON.FixedIncomeSectorsBreakdownResponse;
}

export interface FixedIncomeSectorsBreakdownMetadata extends MorningstarMetadata {
    performanceId?: string;
    messages?: Array<SectorsBreakdown.Message>;
    [key: string]: unknown;
}
