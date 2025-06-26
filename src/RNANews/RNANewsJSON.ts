/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Eskil Gjerde Sviggum
 *
 * */


'use strict';


/* *
 *
 *  Namespace
 *
 * */


export namespace RNANewsJSON {


    /* *
     *
     *  Declarations
     *
     * */


    export type RNANewsResponseItem = [id: string, title: string, source: string, type: string];


    export type RNANewsItem = [day: number, title: string, source: string, type: string];


    /**
     * The response JSON for RNANews from Morningstar.
     */
    export interface ResponseItem {
        /**
         * A UNIX timestamp in milliseconds specifying the day
         * at which the news items were published.
         */
        day: string;

        /**
         * List of news items.
         *
         * A news-item is a 4-tuple with the following fields:
         *  - Unique identifier
         *  - Title of announcement.
         *  - Source
         *  - Type
         */
        items: RNANewsResponseItem[];
    }


    export type Response = ResponseItem[];


    /* *
     *
     *  Functions
     *
     * */


    export function isResponse (
        json?: unknown
    ): json is Response {
        return (
            !!json &&
            Array.isArray(json) &&
            (json.length === 0 || 
            isResponseItem((json as Array<unknown>)[0]))
        );
    }


    function isResponseItem (
        json?: unknown
    ): json is ResponseItem {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as ResponseItem).day === 'string' &&
            typeof (json as ResponseItem).items === 'object' &&
            isRNANewsResponseItem((json as ResponseItem).items[0])
        );
    }


    function isRNANewsResponseItem (
        json?: unknown
    ): json is RNANewsResponseItem {
        return (
            !!json &&
            Array.isArray(json) &&
            json.length === 4 &&
            !json.find(entry => typeof entry !== 'string')
        );
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default RNANewsJSON;
