/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Jedrzej Ruta
 *
 * */

'use strict';

/* *
*
*  Imports
*
* */

import External from '../../Shared/External';
import DWSConnector from '../DWSConnector';
import TimeSeriesConverter from './TimeSeriesConverter';
import {
    MorningstarAPI,
    MorningstarRegion,
    MorningstarURL
} from '../../Shared';
import type {
    TimeSeriesConverterMetadata,
    TimeSeriesConnectorOptions
} from './TimeSeriesOptions';

/**
 *
 * Constants
 *
 */

const excludedKeys = ['id', 'type', 'category', 'dataPoint', 'ids', 'api', 'converter'];

/* *
 *
 *  Class
 *
 * */

export class TimeSeriesConnector extends DWSConnector {

    /* *
     *
     * Static Properties
     *
     */

    protected static readonly defaultOptions: Pick<TimeSeriesConnectorOptions, 'id' | 'type'> = {
        id: 'morningstar-time-series-connector',
        type: 'MorningstarTimeSeriesConnector'
    };

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options: TimeSeriesConnectorOptions
    ) {

        options = {
            ...TimeSeriesConnector.defaultOptions,
            ...options
        };

        super(options);

        this.options = options;

        this.metadata = {
            columns: {},
            rawResponse: void 0
        };

        this.converter = new TimeSeriesConverter(options.converter);
    }

    /* *
     *
     *  Properties
     *
     * */

    public override readonly converter: TimeSeriesConverter;

    public override readonly options: TimeSeriesConnectorOptions;

    public override readonly metadata!: TimeSeriesConverterMetadata;
    /* *
     *
     *  Functions
     *
     * */

    public override async load (): Promise<any> {
        await super.load();

        const { category, dataPoint, ids } = this.options;

        const api = this.api = this.api || new MorningstarAPI(this.options.api);

        if (!ids || ids.length === 0) {
            throw new Error('No security IDs found.');
        }

        const idList = ids.map(id => id.id).join(',');
        const idTypes = ids.map(id => id.idType).join(',');

        const url = new MorningstarURL(
            `direct-web-services/time-series/v1/${category}/${dataPoint}/${idList}`,
            this.options.api?.url || MorningstarRegion.baseURLs['Americas']
        );

        url.searchParams.set('idTypes', idTypes);

        // Set viable URL params for the request
        for (const [key, value] of Object.entries(this.options)) {
            if (excludedKeys.includes(key)) {
                continue;
            }
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    url.searchParams.set(
                        key,
                        value.map(v => (v == null ? '' : String(v))).join(',')
                    );
                } else {
                    url.searchParams.set(key, String(value));
                }
            }
        }

        const response = await api.fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        });

        const json = await response.json() as unknown;
        this.converter.parse({ json });

        this.metadata.rawResponse = json;

        this.getTable().deleteColumns();
        this.getTable().setColumns(this.converter.getTable().getColumns());

        return this.applyTableModifiers();
    }
}


/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarDWSTimeSeries: typeof TimeSeriesConnector;
    }
}


External.DataConnector.registerType('MorningstarDWSTimeSeries', TimeSeriesConnector);


/* *
 *
 *  Default Export
 *
 * */

export default TimeSeriesConnector;
