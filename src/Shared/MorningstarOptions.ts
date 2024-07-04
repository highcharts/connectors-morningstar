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


import DataConnectorOptions from '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorOptions';


/* *
 *
 *  API Options
 *
 * */


export interface MorningstarAPIOptions {

    /**
     * Absolute URL or relative URL path to the API to be used.
     *
     * Defaults to the nearest Morningstar API region based on the browser
     * localization settings. 
     */
    url?: string;

    /**
     * Manually set the version of API.
     *
     * Default to the version number of the API URL or `1`.
     */
    version?: number;

}


export interface MorningstarConverterOptions {

}


export interface MorningstarOptions extends DataConnectorOptions {
    api?: MorningstarAPIOptions;
    converter?: MorningstarConverterOptions;
}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarOptions;
