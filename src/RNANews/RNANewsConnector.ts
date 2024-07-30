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

/* *
 *
 *  Class
 * 
 *  */

class RNANewsConnector extends MorningstarConnector {

    /**
     * Constructs an instance of RNANewsConnector.
     * @param {RNANewsOptions} [options]
     * Options for the connector and converter.
     */
    public constructor(
        options: RNANewsOptions
    ) {
        super(options);

        this.converter = new RNANewsConverter(options);
        this.options = options;
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
    public override async load(): Promise<this> {
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

        const url = new MorningstarURL('timeseries/rna-news');
        const searchParams = url.searchParams;
        const api = new MorningstarAPI(options.api);

        searchParams.setSecurityOptions([security]);

        if (startDate) {
            const date = RNANewsConnector.validateAndFormatDate(startDate);
            searchParams.set('startDate', date);
        }

        if (endDate) {
            const date = RNANewsConnector.validateAndFormatDate(endDate);
            searchParams.set('endDate', date);
        }

        if (maxStories) {
            const numericMaxStories = Number(maxStories);
            if (!Number.isInteger(numericMaxStories)) {
                throw new Error(`Expected maxStories to be integer, but is instead ${maxStories}`);
            }
            searchParams.set('maxStories', '' + maxStories);
        }

        if (localization) {
            searchParams.setLocalizationOptions(localization);
        }

        const response = await api.fetch(url);
        const json = await response.json() as RNANewsJSON.Response;

        this.converter.parse({ json });

        this.table.deleteColumns();
        this.table.setColumns(this.converter.getTable().getColumns());

        return this;
    }

}

/* *
 *
 * Class Namespace
 * 
 *  */

namespace RNANewsConnector {
    /**
     * If a number is provided, it is treated as a unix timestamp in
     * milliseconds and converted to format `yyyy-MM-dd`.
     * If a string is provided, it is validated to conform to the format.
     * @private
     * @param {number | string} date date as a timestamp of formatted string
     * @return {string} date formatted as `yyyy-MM-dd`.
     */
    export function validateAndFormatDate(date: number | string): string {
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


External.DataConnector.registerType(
    'MorningstarRNANews',
    RNANewsConnector
);


/* *
 *
 *  Default Export
 *
 * */


export default RNANewsConnector;