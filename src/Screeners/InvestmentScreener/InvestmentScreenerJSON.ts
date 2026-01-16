/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Lysy
 *
 * */

'use strict';

/* *
 *
 *  Namespace
 *
 * */

namespace InvestmentScreenerJSON {
    export interface Response {
        InvestmentScreener: InvestmentScreenerResponse;
    }

    export interface InvestmentScreenerResponse {
        total: number;
        page: number;
        pageSize: number;
        rows: InvestmentScreenerRow[];
    }

    export interface InvestmentScreenerRow {
        [key: string]: string | number | boolean;
    }

    /* *
     *
     *  Functions
     *
     * */

    export function isInvestmentScreenerResponse (
        json?: unknown
    ): json is InvestmentScreenerResponse {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as InvestmentScreenerResponse).rows === 'object' &&
            (json as InvestmentScreenerResponse).rows instanceof Array &&
            ((json as InvestmentScreenerResponse).rows.length === 0 ||
                isInvestmentScreenerRow(
                    (json as InvestmentScreenerResponse).rows[0]
                ))
        );
    }

    export function isInvestmentScreenerRow (
        json?: unknown
    ): json is InvestmentScreenerRow {
        return !!json && typeof json === 'object';
    }
}

/* *
 *
 *  Default Export
 *
 * */

export default InvestmentScreenerJSON;
