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

namespace RNANewsJSON {


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
        day: number;

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


}


/* *
*
*  Default Export
*
* */


export default RNANewsJSON;