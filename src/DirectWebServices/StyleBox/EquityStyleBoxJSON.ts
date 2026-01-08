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

namespace EquityStyleBoxJSON {

    export interface EquityStyleBoxResponse extends InvestmentResponse {
        stockStyle: Array<EquityStyleBoxItem>;
    }

    export interface EquityStyleBoxItem {
        effectiveDate: string;
        regionId?: {
            value: string;
            code: number;
        };
        growthScore?: number;
        valueScore?: number;
        sizeScore: number;
        styleScore: number;
        styleBox: {
            value: string;
            code: number;
        };
    }

}

export default EquityStyleBoxJSON;
