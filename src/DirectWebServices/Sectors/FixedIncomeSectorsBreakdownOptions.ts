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

import type FixedIncomeSectorsBreakdownJSON from './FixedIncomeSectorsBreakdownJSON';
import type { Message } from '../InvestmentsConnector/InvestmentsJSON';
import type { MorningstarConverterOptions } from '../../Shared/MorningstarOptions';
import type { InvestmentsConverterMetadata } from '../Shared/SharedDWSInvestments';

/* *
 *
 *  Interfaces
 *
 * */

export interface FixedIncomeSectorsBreakdownConverterOptions extends MorningstarConverterOptions {
    json: FixedIncomeSectorsBreakdownJSON.FixedIncomeSectorsBreakdownResponse;
}

export interface FixedIncomeSectorsBreakdownConverterMetadata extends InvestmentsConverterMetadata {
    fixdIncMorningstarSectorsPortfolioDate?: string;
    messages?: Array<Message>;
    performanceId?: string;
    surveyedFixedIncSectorDate?: string;
}
