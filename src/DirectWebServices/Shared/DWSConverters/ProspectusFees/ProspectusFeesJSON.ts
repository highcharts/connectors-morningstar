/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


'use strict';

import type { InvestmentResponse } from '../../../InvestmentsConnector/InvestmentsJSON';

/* *
 *
 *  Namespace
 *
 * */


namespace ProspectusFeesJSON {

    export interface ProspectusFeesResponse extends InvestmentResponse {
        prospectusFees: ProspectusFeesItem;
    }

    export interface ProspectusFeesItem {
        [key: string]: number | string | { [key: string]: number | string };
    }
}


export default ProspectusFeesJSON;
