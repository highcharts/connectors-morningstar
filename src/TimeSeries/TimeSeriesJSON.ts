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


namespace TimeSeriesJSON {


    /* *
     *
     *  Declarations
     *
     * */


    export interface CurrencyHistory {
        HistoryDetail: Array<CurrencyHistoryDetail>;
    }


    export interface CurrencyHistoryDetail {
        EndDate: string;
        Value: CurrencyValue;
    }


    export interface CurrencyValue {
        CurrencyId: string;
        value: string;
    }


    export interface History {
        HistoryDetail: Array<HistoryDetail>;
    }


    export interface HistoryDetail {
        EndDate: string;
        Value: string;
    }


    export interface Response {
        TimeSeries: TimeSeriesResponse;
    }


    export interface Security {
        CumulativeReturnSeries?: Array<History>;
        DividendSeries?: Array<CurrencyHistory>;
        Id: string;
        RatingSeries?: Array<History>;
    }

    export interface TimeSeriesResponse {
        Security: Array<Security>;
    }


    /* *
     *
     *  Functions
     *
     * */


    export function isHistory(
        json?: unknown
    ): json is History {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as History).HistoryDetail === 'object' &&
            (json as History).HistoryDetail instanceof Array &&
            (
                (json as History).HistoryDetail.length === 0 ||
                isHistoryDetail((json as History).HistoryDetail[0])
            )
        );
    }


    function isHistoryDetail(
        json?: unknown
    ): json is HistoryDetail {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as HistoryDetail).EndDate === 'string' &&
            typeof (json as HistoryDetail).Value === 'string'
        );
    }


    export function isResponse(
        json?: unknown
    ): json is Response {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as Response).TimeSeries === 'object' &&
            isTimeSeriesReponse((json as Response).TimeSeries)
        );
    }


    function isSecurity(
        json?: unknown
    ): json is Security {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as Security).Id === 'string' &&
            (
                typeof (json as Security).CumulativeReturnSeries === 'undefined' ||
                (json as Security).CumulativeReturnSeries instanceof Array
            ) &&
            (
                typeof (json as Security).DividendSeries === 'undefined' ||
                (json as Security).DividendSeries instanceof Array
            ) &&
            (
                typeof (json as Security).RatingSeries === 'undefined' ||
                (json as Security).RatingSeries instanceof Array
            )
        );
    }


    export function isTimeSeriesReponse(
        json?: unknown
    ): json is TimeSeriesResponse {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as TimeSeriesResponse).Security === 'object' &&
            (json as TimeSeriesResponse).Security instanceof Array &&
            (
                (json as TimeSeriesResponse).Security.length === 0 ||
                isSecurity((json as TimeSeriesResponse).Security[0])
            )
        );
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesJSON;
