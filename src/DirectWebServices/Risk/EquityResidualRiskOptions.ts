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

import type EquityResidualRiskJSON from './EquityResidualRiskJSON';
import type { Message } from '../InvestmentsConnector/InvestmentsJSON';
import type { MorningstarConverterOptions, MorningstarMetadata } from '../../Shared/MorningstarOptions';

/* *
 *
 *  Interfaces
 *
 * */

export interface EquityResidualRiskConverterOptions extends MorningstarConverterOptions {
    json: EquityResidualRiskJSON.EquityResidualRiskResponse;
}

export interface EquityResidualRiskConverterMetadata extends MorningstarMetadata {
    messages?: Array<Message>;
    performanceId?: string;
}

/* *
 *
 *  Namespace
 *
 * */

export namespace EquityResidualRisk {

    /* *
     *
     *  Constants
     *
     * */

    export const days = ['252Day', '504Day', '756Day', '1008Day', '1260Day', '2520Day'];

    export const months = ['12Month', '24Month', '36Month', '48Month', '60Month', '120Month'];

    export const riskMetrics = ['Alpha', 'Beta', 'RSquare'];

}
