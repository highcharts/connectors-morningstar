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


import External from '../Shared/External';
import MorningstarConnector from '../Shared/MorningstarConnector';
import TimeSeriesConverter from './TimeSeriesConverter';
import TimeSeriesOptions from './TimeSeriesOptions';


/* *
 *
 *  Class
 *
 * */


class TimeSeriesConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: TimeSeriesOptions
    ) {
        super(options);

        this.converter = new TimeSeriesConverter(options.converter);
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: TimeSeriesConverter;


    public override readonly options: TimeSeriesOptions;


}


/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarTimeSeries: typeof TimeSeriesConnector
    }
}


External.DataConnector.registerType(
    'MorningstarTimeSeries',
    TimeSeriesConnector
);


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesConnector;
