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
 *
 * */


'use strict';


/* *
 *
 *  Namespace
 *
 * */


namespace InvestmentDetailsJSON {


    /* *
     *
     *  Declarations
     *
     * */

    interface CurrencyType {
        Id: string;
   }

    export interface InvestmentDetailsResponse {
        Id: string;
        Isin: string;
        Domicile: string;
        Currency: CurrencyType;
        TrailingPerfromance: InvestmentDetailsTrailingPerformance[];
        ReturnType: string;
        Type: string;
        CurrencyId: string;
        Date: string;
    }

    interface InvestmentDetailsTrailingPerformance {

        Return: InvestmentDetailsReturn[];
    }

    interface InvestmentDetailsReturn {
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

    export function isInvestmentDetails(json: InvestmentDetailsResponse) {

        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as InvestmentDetailsResponse).Id === 'string' &&
            typeof (json as InvestmentDetailsResponse).Currency === 'object' &&
            typeof (json as InvestmentDetailsResponse).ReturnType === 'string' &&
            (
                (json as InvestmentDetailsResponse).TrailingPerfromance.length === 0 ||
                isTrailingPerformance((json as InvestmentDetailsResponse).TrailingPerfromance[0])
            )
        );
    }

    export function isInvestmentDetailsResponse (
        json?: unknown
    ): json is Array<InvestmentDetailsResponse> {
        return (
            !!json &&
            Array.isArray(json) &&
            (
                json.length === 0 ||
                isInvestmentDetails(json[0])
            )
        )
    }


    function isTrailingPerformance (
        json?: unknown
    ): json is InvestmentDetailsTrailingPerformance {
        return (
            !!json &&
            typeof json === 'object' &&
            Array.isArray((json as InvestmentDetailsTrailingPerformance).Return) &&
            isReturnType((json as InvestmentDetailsTrailingPerformance).Return[0])
        );
    }


    function isReturnType (
        json?: unknown
    ): json is InvestmentDetailsReturn {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as InvestmentDetailsReturn).Value === 'number' &&
            typeof (json as InvestmentDetailsReturn).TimePeriod === 'string' &&
            typeof (json as InvestmentDetailsReturn).Date === 'string' &&
            (
                typeof (json as InvestmentDetailsReturn).Annualized === 'undefined' ||
                typeof (json as InvestmentDetailsReturn).Annualized === 'boolean'
            )
        );
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default InvestmentDetailsJSON;
