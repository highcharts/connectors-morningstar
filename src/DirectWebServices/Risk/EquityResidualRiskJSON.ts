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

namespace EquityResidualRiskJSON {

    export interface EquityResidualRiskResponse extends InvestmentResponse {
        dailyDividendResidualRiskAndReturnSensitivity: Array<ResidualRiskAndReturnSensitivity>;
        dailyNonDividendResidualRiskAndReturnSensitivity: Array<ResidualRiskAndReturnSensitivity>;
        dividendResidualRiskAndReturnSensitivity: ResidualRiskAndReturnSensitivity;
        nonDividendResidualRiskAndReturnSensitivity: ResidualRiskAndReturnSensitivity;
    }

    export interface ResidualRiskAndReturnSensitivity {
        [key: string]: number | string;
    }
}

export default EquityResidualRiskJSON;
