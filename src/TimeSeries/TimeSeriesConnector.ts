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


import Converters from './Converters';
import External from '../Shared/External';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import TimeSeriesConverter from './TimeSeriesConverter';
import TimeSeriesOptions from './TimeSeriesOptions';


/* *
 *
 *  Class
 *
 * */


export class TimeSeriesConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: TimeSeriesOptions = {}
    ) {
        super(options);

        switch (options.series?.type) {

            case 'CumulativeReturn':
                this.converter = new Converters.CumulativeReturnSeriesConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

            case 'Dividend':
                this.converter = new Converters.DividendSeriesConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

            case 'Growth':
                this.converter = new Converters.GrowthSeriesConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

            case 'Rating':
                this.converter = new Converters.RatingSeriesConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

            case 'Price':
                this.converter = new Converters.PriceSeriesConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

            case 'OHLCV':
                this.converter = new Converters.OHLCVSeriesConverter({
                    ...options.converter,
                    ...options.series,
                    securities: options.securities
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


    public override readonly converter: TimeSeriesConverter;


    public override readonly options: TimeSeriesOptions;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<this> {

        await super.load();

        const options = this.options;
        const currencyId = options.currencyId;
        const endDate = options.endDate;
        const securities = options.securities;
        const startDate = options.startDate;
        const tax = options.tax;
        const frequency = options.frequency;

        if (!securities) {
            return this;
        }

        const api = this.api = this.api || new MorningstarAPI(options.api);
        const url = new MorningstarURL('/ecint/v1/' + this.converter.path, api.baseURL);

        url.setSecuritiesOptions(securities);

        if (currencyId) {
            url.searchParams.set('currencyId', currencyId);
        }

        if (endDate) {
            url.setDate('endDate', endDate);
        }

        if (startDate) {
            url.setDate('startDate', startDate);
        }

        if (tax) {
            url.searchParams.set('tax', tax);
        }

        if (frequency) {
            url.searchParams.set('frequency', frequency);
        }

        this.converter.decorateURL(url);

        const response = await api.fetch(url);
        const json = await response.json() as unknown;

        this.converter.parse({ json });

        this.table.deleteColumns();
        this.table.setColumns(this.converter.getTable().getColumns());

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


External.DataConnector.registerType('MorningstarTimeSeries', TimeSeriesConnector);


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesConnector;
