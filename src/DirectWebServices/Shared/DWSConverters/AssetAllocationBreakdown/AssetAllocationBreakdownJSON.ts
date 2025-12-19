/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


'use strict';

import type { InvestmentResponse } from '../../../InvestmentsConnector/InvestmentsJSON';

/* *
 *
 *  Namespace
 *
 * */


namespace AssetAllocationBreakdownJSON {

    export interface AssetAllocationBreakdownResponse extends InvestmentResponse {
        assetAllocationBreakdown: assetAllocationBreakdownItem;
    }

    export interface assetAllocationBreakdownItem {
        [key: string]: number;
    }
}


export default AssetAllocationBreakdownJSON;
