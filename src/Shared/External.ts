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
 *  Imports
 *
 * */


import type * as _Dashboards from '@highcharts/dashboards/dashboards';
import type * as _Grid from '@highcharts/grid-pro/grid-pro';
import type _DataTableOptions from '@highcharts/dashboards/es-modules/Data/DataTableOptions';

import _DataConnector from '@highcharts/dashboards/es-modules/Data/Connectors/DataConnector';
import _DataConverter from '@highcharts/dashboards/es-modules/Data/Converters/DataConverter';
import _DataTable from '@highcharts/dashboards/es-modules/Data/DataTable';


/* *
 *
 *  Declarations
 *
 * */


export type DataConnectorMetadata = _DataConnector['metadata'];

export type DataConnectorOptions = _DataConnector['options'];

export type DataConverterOptions = Partial<_DataConverter.Options>;


export type DataTable = _DataTable;


export type DataTableOptions = _DataTableOptions;


/* *
 *
 *  Constants
 *
 * */


const Dashboards: typeof _Dashboards = globalThis.window.Dashboards;

const Grid: typeof _Grid | undefined =  typeof window !== 'undefined' &&
 'Grid' in window ? (window.Grid as typeof _Grid) : undefined;


export const DataConnector = (
    Dashboards?.DataConnector ||
    Grid?.DataConnector ||
    _DataConnector
);


export const DataConverter = (
    Dashboards?.DataConverter ||
    Grid?.DataConverter ||
    _DataConverter
);


export const DataTable = (
    Dashboards?.DataTable ||
    Grid?.DataTable ||
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
