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


import type DataConverterType from '@highcharts/dashboards/es-modules/Data/Converters/DataConverter';

import * as Dashboards from '@highcharts/dashboards';


/* *
 *
 *  Declarations
 *
 * */


export type DataConnector = Dashboards.DataConnector;

export type DataConnectorOptions =
    Partial<Dashboards.DataConnector.UserOptions>;

export type DataConveter = DataConverterType;

export type DataConverterOptions = Partial<DataConverterType.Options>;


export type DataTable = Dashboards.DataTable;


/* *
 *
 *  Constants
 *
 * */


export const DataConnector = Dashboards.DataConnector;

// @todo simplify
export const DataConverter =
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
    (Dashboards as any).DataConverter as typeof DataConverterType;

export const DataTable = Dashboards.DataTable;


/* *
 *
 *  Default Export
 *
 * */


export default {
    DataConnector,
    DataConverter,
    DataTable
};
