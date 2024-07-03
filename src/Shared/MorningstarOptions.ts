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
    path?: string;
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
