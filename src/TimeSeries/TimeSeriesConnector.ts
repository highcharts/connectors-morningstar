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
import MorningstarURL from '../Shared/MorningstarURL';
import CumulativeReturnSeriesConverter from './Converters/CumulativeReturnSeriesConverter';
import DividendSeriesConverter from './Converters/DividendSeriesConverter';
import TimeSeriesOptions from './TimeSeriesOptions';
import TimeSeriesRatingConverter from './Converters/RatingSeriesConverter';
import PriceSeriesConverter from './Converters/PriceSeriesConverter';
import TimeSeriesConverter from './Converters/TimeSeriesConverter';


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
        options: TimeSeriesOptions
    ) {
        super(options);

        switch (options.series?.type) {

            case 'CumulativeReturn':
                this.converter = new CumulativeReturnSeriesConverter({
                    ...options.converter,
                    ...options.series
                });
                break;

            case 'Dividend':
                this.converter = new DividendSeriesConverter({
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

            case 'Price':
                this.converter = new PriceSeriesConverter({
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
