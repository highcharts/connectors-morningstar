/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Eskil Gjerde Sviggum
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
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarURL from '../Shared/MorningstarURL';
import RNANewsOptions from './RNANewsOptions';
import RNANewsConverter from './RNANewsConverter';
import RNANewsJSON from './RNANewsJSON';
import MorningstarRegion from '../Shared/MorningstarRegion';


/* *
 *
 *  Functions
 *
 * */


/**
 * If a number is provided, it is treated as a unix timestamp in
 * milliseconds and converted to format `yyyy-MM-dd`.
 * If a string is provided, it is validated to conform to the format.
 * @private
 * @param {number | string} date date as a timestamp of formatted string
 * @return {string} date formatted as `yyyy-MM-dd`.
 */
function validateAndFormatDate (date: number | string): string {
    let timestamp: number;
    if (typeof date === 'string') {
        // Check if string is a number, likely a timestamp
        if (!Number.isNaN(Number(date))) {
            timestamp = Number(date);
        } else {
            const parsedDate = Date.parse(date);
            if (Number.isNaN(parsedDate)) {
                throw new Error(`The date ${date} is not a valid date.`);
            }
            timestamp = parsedDate;
        }
    } else if (typeof date === 'number') {
        timestamp = date;
    } else {
        throw new Error(
            'The provided date is not of type string, nor number.'
        );
    }

    return new Date(timestamp)
        .toISOString()
        .substring(0, 10);
}


/* *
 *
 *  Class
 * 
 *  */


export class RNANewsConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */


    /**
     * Constructs an instance of RNANewsConnector.
     *
     * @param {RNANewsOptions} [options]
     * Options for the connector and converter.
     */
    public constructor (
        options: RNANewsOptions = {}
    ) {
        super(options);

        this.converter = new RNANewsConverter(options.converter);
        this.options = options;

        if (this.options.api?.url === undefined) {
            this.options.api = {
                ...(this.options.api ?? {}),
                url: MorningstarRegion.baseURLs['EMEA']
            };
        }
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: RNANewsConverter;


    public override readonly options: RNANewsOptions;


    /* *
     *
     *  Functions
     *
     * */


    /**
     * Loads RNANews data from Morningstar.
     *
     * @return {Promise<this>}
     * Same connector instance with modified table.
     */
    public override async load (): Promise<this> {
        await super.load();

        const options = this.options;
        const {
            security,
            startDate,
            endDate,
            maxStories,
            localization
        } = options;

        if (!security) {
            return this;
        }

        const api = this.api = this.api || new MorningstarAPI(options.api);
        const url = new MorningstarURL('ecint/v1/timeseries/rna-news', api.baseURL);

        url.setSecuritiesOptions([security]);

        if (startDate) {
            const date = validateAndFormatDate(startDate);
            url.setDate('startDate', date);
        }

        if (endDate) {
            const date = validateAndFormatDate(endDate);
            url.setDate('endDate', date);
        }

        if (maxStories) {
            const numericMaxStories = Number(maxStories);
            if (!Number.isInteger(numericMaxStories)) {
                throw new Error(`Expected maxStories to be integer, but is instead ${maxStories}`);
            }
            url.searchParams.set('maxStories', '' + maxStories);
        }

        if (localization) {
            url.setLocalizationOptions(localization);
        }

        const response = await api.fetch(url);
        const json = await response.json() as RNANewsJSON.Response;

        this.converter.parse({ json });

        this.table.deleteColumns();
        this.table.setColumns(this.converter.getTable().getColumns());

        return this.setModifierOptions(options.dataModifier);
    }


}


/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarRNANews: typeof RNANewsConnector;
    }
}


External.DataConnector.registerType('MorningstarRNANews', RNANewsConnector);


/* *
 *
 *  Default Export
 *
 * */


export default RNANewsConnector;
