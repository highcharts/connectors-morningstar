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

namespace EquitySectorsBreakdownJSON {

    export interface EquitySectorsBreakdownResponse extends InvestmentResponse {
        morningstarEquitySectorsBreakdown: MorningstarEquitySectorsBreakdownItem;
    }

    export interface MorningstarEquitySectorsBreakdownItem {
        [key: string]: number | string;
    }
}

export default EquitySectorsBreakdownJSON;
