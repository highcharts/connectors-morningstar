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

/* *
 *
 *  Namespace
 *
 * */

namespace EquitySectorsBreakdownJSON {

    export interface EquitySectorsBreakdownResponse extends SectorsBreakdown.InvestmentResponse {
        morningstarEquitySectorsBreakdown: MorningstarEquitySectorsBreakdownItem;
    }

    export interface MorningstarEquitySectorsBreakdownItem {
        [key: string]: number | string;
    }
}

export default EquitySectorsBreakdownJSON;
