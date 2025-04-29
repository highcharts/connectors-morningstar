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


import type * as _Dashboards from '@highcharts/dashboards';
import type * as _DataGrid from '@highcharts/dashboards/datagrid';


import _DataConnector from '@highcharts/dashboards/es-modules/Data/Connectors/DataConnector';
import _DataConverter from '@highcharts/dashboards/es-modules/Data/Converters/DataConverter';
import _DataTable from '@highcharts/dashboards/es-modules/Data/DataTable';


/* *
 *
 *  Declarations
 *
 * */


export type DataConnectorMetadata = _DataConnector['metadata'];


export type DataConnectorOptions = Partial<_DataConnector.UserOptions>;


export type DataConverterOptions = Partial<_DataConverter.Options>;


export type DataTable = _DataTable;


/* *
 *
 *  Constants
 *
 * */


const Dashboards: typeof _Dashboards = globalThis.window.Dashboards;


const DataGrid: typeof _DataGrid = globalThis.window.DataGrid;


export const DataConnector = (
    Dashboards?.DataConnector ||
    DataGrid?.DataConnector ||
    _DataConnector
);


export const DataConverter = (
    Dashboards?.DataConverter ||
    DataGrid?.DataConverter ||
    _DataConverter
);


export const DataTable = (
    Dashboards?.DataTable ||
    DataGrid?.DataTable ||
    _DataTable
);


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
