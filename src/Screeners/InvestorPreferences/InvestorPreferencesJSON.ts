/* *
 *
 *  (c) 2009-2026 Highsoft AS
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

/* *
 *
 *  Namespace
 *
 * */

namespace InvestorPreferencesJSON {

    export interface Response {
        InvestorPreferences: InvestorPreferencesResponse;
    }
    export interface InvestorPreferencesResponse {
        total: number;
        page: number;
        pageSize: number;
        rows: InvestorPreferenceRow[];
    }

    export interface InvestorPreferenceRow {
        [key: string]: any;
    }


    export function isInvestorPreferencesResponse (
        json?: unknown
    ): json is InvestorPreferencesResponse {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as InvestorPreferencesResponse).rows === 'object' &&
            (json as InvestorPreferencesResponse).rows instanceof Array &&
            ((json as InvestorPreferencesResponse).rows.length === 0 ||
                isInvestorPreferenceRow(
                    (json as InvestorPreferencesResponse).rows[0]
                ))
        );
    }

    export function isInvestorPreferenceRow (
        json?: unknown
    ): json is InvestorPreferenceRow {
        return !!json && typeof json === 'object';
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default InvestorPreferencesJSON;
