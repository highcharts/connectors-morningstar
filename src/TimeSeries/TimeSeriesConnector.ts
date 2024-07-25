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
import GrowthSeriesConverter from './Converters/GrowthSeriesConverter';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarConverter from '../Shared/MorningstarConverter';
import MorningstarURL from '../Shared/MorningstarURL';
import TimeSeriesCumulativeReturnConverter from './Converters/TimeSeriesCumulativeReturnConverter';
import TimeSeriesDividendConverter from './Converters/TimeSeriesDividendConverter';
import TimeSeriesOptions from './TimeSeriesOptions';
import TimeSeriesRatingConverter from './Converters/TimeSeriesRatingConverter';


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

            case 'CumulativeReturn':
                this.converter = new TimeSeriesCumulativeReturnConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

            case 'Dividend':
                this.converter = new TimeSeriesDividendConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

            case 'Growth':
                this.converter = new GrowthSeriesConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

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


    /* *
     *
     *  Functions
     *
     * */


    public override async load(): Promise<this> {
        const options = this.options;
        const securities = options.securities;
        const tax = options.tax;

        if (securities) {
            const url = new MorningstarURL('timeseries/cumulativereturn');
            const searchParams = url.searchParams;
            const api = new MorningstarAPI(options.api);

            searchParams.setSecurityOptions(securities);

            if (tax) {
                searchParams.set('tax', tax);
            }

            const response = await api.fetch(url);
            const json = await response.json() as unknown;

            this.converter.parse({ json });

            this.table.deleteColumns();
            this.table.setColumns(this.converter.getTable().getColumns());
        }

        return this;
    }


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
