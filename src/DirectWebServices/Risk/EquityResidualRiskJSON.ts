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
        dailyDividendResidualRiskAndReturnSensitivity: Array<DailyDividendResidualRiskAndReturnSensitivity>;
        dailyNonDividendResidualRiskAndReturnSensitivity: Array<DailyNonDividendResidualRiskAndReturnSensitivity>;
        dividendResidualRiskAndReturnSensitivity: DividendResidualRiskAndReturnSensitivity;
        nonDividendResidualRiskAndReturnSensitivity: NonDividendResidualRiskAndReturnSensitivity;
    }

    export interface DailyDividendResidualRiskAndReturnSensitivity {
        [key: string]: number | string;
    }

    export interface DailyNonDividendResidualRiskAndReturnSensitivity {
        [key: string]: number | string;
    }

    export interface DividendResidualRiskAndReturnSensitivity {
        [key: string]: number | string;
    }

    export interface NonDividendResidualRiskAndReturnSensitivity {
        [key: string]: number | string;
    }
}

export default EquityResidualRiskJSON;
