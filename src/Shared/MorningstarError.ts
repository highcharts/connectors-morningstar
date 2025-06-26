/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
 *  Class
 *
 * */


export class MorningstarError extends Error {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        request: RequestInit,
        response: Response,
        substatus?: number,
        submessage?: string
    ) {
        super(
            MorningstarError.errorMessageMap[ response.statusText ] ||
            MorningstarError.statusMessageMap[ response.status ] ||
            'Unknown Error'
        );

        this.request = request;
        this.response = response;
        this.submessage = submessage;
        this.substatus = substatus;
    }


    /* *
     *
     *  Properties
     *
     * */


    public readonly request: RequestInit;


    public readonly response: Response;


    public readonly submessage?: string;


    public readonly substatus?: number;


}


/* *
 *
 *  Namespace
 *
 * */


export namespace MorningstarError {


    /* *
     *
     *  Constants
     *
     * */


    export const errorMessageMap: Record<string, string> = {
    };


    export const statusMessageMap: Record<number, string> = {
        200: 'OK',
        302: 'Found',
        304: 'Not Modified',
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
        414: 'Request URI Too Long',
        415: 'Unsupported Media Type',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout'
    };


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarError;
