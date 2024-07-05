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


import * as Dashboards from '@highcharts/dashboards';


/* *
 *
 *  Declarations
 *
 * */


/**
 * @internal
 * @todo Remove and replace references with Dashboards.DataConverter
 */
declare type Dashboards_DataConverter = Dashboards.DataConnector['converter'];


/**
 * @internal
 * @todo Remove and replace references with Dashboards.DataConverter
 */
declare type Dashboards_DataConverter_Options = Dashboards.DataConnector['converter']['options'];
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */


/* *
 *
 *  Class
 *
 * */


export abstract class MorningstarConverter implements Dashboards_DataConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: Partial<Dashboards_DataConverter_Options> = {}
    ) {
        this.options = options as Dashboards_DataConverter_Options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public options: Dashboards_DataConverter_Options;


}


/* *
 *
 *  Class Prototype
 *
 * */


/**
 * @internal
 * @todo Remove interface after Dashboards.DataConverter is available.
 */
export interface MorningstarConverter extends Dashboards_DataConverter {
    // Forcing non-existing structure on MorningstarConverter as a workaround.
}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarConverter;
