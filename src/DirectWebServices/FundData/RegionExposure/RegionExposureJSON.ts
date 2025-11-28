/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Jedrzej Ruta
 *
 * */


'use strict';

import { InvestmentResponse } from '../FundDataJSON';

/* *
 *
 *  Namespace
 *
 * */


namespace RegionExposureJSON {

    export interface RegionExposureResponse extends InvestmentResponse {
        countryAndRegionalExposureBreakdown: countryAndRegionalExposureBreakdownItem;
    }

    export interface countryAndRegionalExposureBreakdownItem {
        [key: string]: number | string;
    }
}


export default RegionExposureJSON;
