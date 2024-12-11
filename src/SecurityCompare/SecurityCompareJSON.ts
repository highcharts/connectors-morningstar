/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Pawel Lysy
 *
 * */


'use strict';


/* *
 *
 *  Namespace
 *
 * */


namespace SecurityCompareJSON {


    /* *
     *
     *  Declarations
     *
     * */

    interface CurrencyType {
        Id: string;
    }

    export interface SecurityCompareResponse {
        Id: string;
        Isin: string;
        Domicile: string;
        Currency: CurrencyType;
        TrailingPerformance: SecurityCompareTrailingPerformance[];
        Type: string;
        CurrencyId: string;
        Date: string;
    }

    interface SecurityCompareTrailingPerformance {
        ReturnType: string;
        Return: SecurityCompareReturn[];
    }

    interface SecurityCompareReturn {
        Date: string;
        Value: number;
        TimePeriod: string;
        Annualized?: boolean;
    }

    /* *
     *
     *  Functions
     *
     * */

    export function isSecurityCompare (
        json: unknown
    ) {
        // @todo properly validate json
        return true;
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as SecurityCompareResponse).Id === 'string' &&
            typeof (json as SecurityCompareResponse).Currency === 'object' &&
            (
                (json as SecurityCompareResponse).TrailingPerformance.length === 0 ||
                isTrailingPerformance((json as SecurityCompareResponse).TrailingPerformance[0])
            )
        );
    }

    export function isSecurityCompareResponse (
        json?: unknown
    ): json is Array<SecurityCompareResponse> {
        return (
            !!json &&
            Array.isArray(json) &&
            (
                json.length > 1 &&
                isSecurityCompare(json[0])
            )
        );
    }


    function isTrailingPerformance (
        json?: unknown
    ): json is SecurityCompareTrailingPerformance {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as SecurityCompareTrailingPerformance).ReturnType === 'string' &&
            (
                Array.isArray((json as SecurityCompareTrailingPerformance).Return) &&
                isReturn((json as SecurityCompareTrailingPerformance).Return[0])
            )
        );
    }


    function isReturn (
        json?: unknown
    ): json is SecurityCompareReturn {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as SecurityCompareReturn).Value === 'number' &&
            typeof (json as SecurityCompareReturn).TimePeriod === 'string' &&
            typeof (json as SecurityCompareReturn).Date === 'string' &&
            (
                typeof (json as SecurityCompareReturn).Annualized === 'undefined' ||
                typeof (json as SecurityCompareReturn).Annualized === 'boolean'
            )
        );
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default SecurityCompareJSON;
