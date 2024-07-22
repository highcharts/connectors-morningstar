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
import MorningstarConverter from '../Shared/MorningstarConverter';
import TimeSeriesRatingConverter from './Converters/TimeSeriesRatingConverter';
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

        switch (options.series?.type) {

            case 'Rating':
                this.converter = new TimeSeriesRatingConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

            default:
                throw new Error('Invalid series type');

        }

        this.options = options;

    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: MorningstarConverter;


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
