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
 *  Imports
 *
 * */


import MorningstarSearchParams from "./MorningstarSearchParams";


/* *
 *
 *  Class
 *
 * */


/**
 * Extended URL to provide additional functionanility.
 */
export class MorningstarURL extends URL {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor(
        url: (string|URL),
        base: (string|URL|undefined) = window.location.href
    ) {
        const superURL = new URL(url, base);

        super(superURL);

        this._searchParams = new MorningstarSearchParams(superURL.searchParams);
    }


    /* *
     *
     *  Properties
     *
     * */


    public _searchParams: MorningstarSearchParams;


    public override get searchParams(): MorningstarSearchParams {
        return this._searchParams;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarURL;
