/* *
 *
 *  (c) 2009-2026 Highsoft AS
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

import type EquityAggregatesResidualRiskJSON from './EquityAggregatesResidualRiskJSON';
import type { Message } from '../InvestmentsConnector/InvestmentsJSON';
import type { MorningstarConverterOptions, MorningstarMetadata } from '../../Shared/MorningstarOptions';

/* *
 *
 *  Interfaces
 *
 * */

export interface EquityAggregatesResidualRiskConverterOptions extends MorningstarConverterOptions {
    json: EquityAggregatesResidualRiskJSON.EquityAggregatesResidualRiskResponse;
}

export interface EquityAggregatesResidualRiskConverterMetadata extends MorningstarMetadata {
    messages?: Array<Message>;
    performanceId?: string;
}

/* *
 *
 *  Namespace
 *
 * */

export namespace EquityAggregatesResidualRisk {

    /* *
     *
     *  Constants
     *
     * */

    export const months = ['36Month', '48Month', '60Month', '120Month'];

    export const riskMetrics = ['Alpha', 'Beta'];

}
