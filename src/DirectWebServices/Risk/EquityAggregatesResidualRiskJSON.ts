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

import { InvestmentResponse } from '../InvestmentsConnector/InvestmentsJSON';

/* *
 *
 *  Namespace
 *
 * */

namespace EquityAggregatesResidualRiskJSON {

    export interface EquityAggregatesResidualRiskResponse extends InvestmentResponse {
        aggregationResidualRiskAndReturnSensitivity: Array<AggregationResidualRiskAndReturnSensitivity>;
    }

    export interface AggregationResidualRiskAndReturnSensitivity {
        [key: string]: number | string;
    }
}

export default EquityAggregatesResidualRiskJSON;
