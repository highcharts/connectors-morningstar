/* *
 *
 *  (c) 2009-2025 Highsoft AS
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

import InvestorPreferencesOptions from './InvestorPreferencesOptions';
import InvestorPreferencesConverter from './InvestorPreferencesConverter';
import type {
    InvestorPreferencesFilter,
    InvestorPreferencesMetadata
} from './InvestorPreferencesOptions';
import External from '../../Shared/External';
import MorningstarAPI from '../../Shared/MorningstarAPI';
import MorningstarConnector from '../../Shared/MorningstarConnector';
import MorningstarURL from '../../Shared/MorningstarURL';
import { 
    UTF_PIPE,
    UTF_COLON 
} from '../../Shared/Utilities';


/**
 *
 * Declarations
 *
 */

type NonStringOptions = (
    'universeIds' | 'page' | 'pageSize' | 'filters' | 'filterDataPoints'
);

interface InvestorPreferencesBody extends Omit<InvestorPreferencesOptions, NonStringOptions> {
    /**
     *
     * A list of filter data points. Custom data points can be configured. See
     * Filters for information about how to get a list of filter data points.
     *
     */
    filterDataPoints?: string;
    /**
     *
     * A list of criteria a security must meet to be included in the results.
     *
     */
    filters?: string;
    /**
     *
     * Output type of the connector response
     *
     */
    outputType: string;
    /**
     *
     * The number of output pages.
     *
     */
    page?: string;
    /**
      *
      *  The number of rows per page.
      *
      */
    pageSize?: string;
    /**
     *
     * A list of investment universe identifiers to query. Values may end with
     * `:1` to signify that a custom universe is not only client funds.
     *
     */
    universeIds: string;
}

/* *
 *
 *  Class
 *
 * */

export class InvestorPreferencesConnector extends MorningstarConnector {
    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options: InvestorPreferencesOptions = { universeIds: [] }
    ) {
        super(options);

        this.converter = new InvestorPreferencesConverter(options.converter);
        this.metadata = this.converter.metadata;
        this.options = options;
    }

    /* *
     *
     *  Properties
     *
     * */

    public override readonly converter: InvestorPreferencesConverter;

    public override readonly options: InvestorPreferencesOptions;

    public override readonly metadata: InvestorPreferencesMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override async load (
        options?: InvestorPreferencesOptions
    ): Promise<this> {
        await super.load();

        const userOptions = { ...this.options, ...options };
        const api = (this.api = this.api || new MorningstarAPI(userOptions.api));
        const url = new MorningstarURL('ecint/v1/screener', api.baseURL);

        const body: InvestorPreferencesBody = {
            universeIds: userOptions.universeIds.join(UTF_PIPE),
            outputType: 'json'
        };

        if (userOptions.page) {
            body.page = `${userOptions.page}`;
        }

        if (userOptions.pageSize) {
            body.pageSize = `${userOptions.pageSize}`;
        }

        if (userOptions.sortOrder) {
            body.sortOrder = `${userOptions.sortOrder}`;
        }

        if (userOptions.languageId) {
            body.languageId = `${userOptions.languageId}`;
        }

        if (userOptions.currencyId) {
            body.currencyId = `${userOptions.currencyId}`;
        }

        if (userOptions.securityDataPoints) {
            body.securityDataPoints = userOptions.securityDataPoints;
        }

        if (userOptions.calculatedDataPoints) {
            this.metadata.calculatedDataPointNames =
                userOptions.calculatedDataPoints.map((value) => value.name);
            body.calculatedDataPoints = userOptions.calculatedDataPoints.map(
                (value) => ({ ...value, type: 'bool' })
            );
        }

        if (userOptions.filters) {
            body.filters = userOptions.filters.reduce(
                (prev, curr) =>
                    prev === '' ?
                        this.getFilter(curr) :
                        prev + UTF_PIPE + this.getFilter(curr),
                ''
            );
        }

        if (userOptions.filterDataPoints) {
            body.filterDataPoints = userOptions.filterDataPoints.join(UTF_PIPE);
        }

        if (userOptions.term) {
            body.term = userOptions.term;
        }

        if (userOptions.countryId) {
            body.countryId = userOptions.countryId;
        }

        if (userOptions.applyTrackRecordExtension) {
            body.applyTrackRecordExtension = userOptions.applyTrackRecordExtension;
        }

        if (userOptions.ignoreRestructure) {
            body.ignoreRestructure = userOptions.ignoreRestructure;
        }

        const response = await api.fetch(url, {
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const json = await response.json() as unknown;

        this.converter.parse({ json });

        this.table.deleteColumns();
        this.table.setColumns(this.converter.getTable().getColumns());

        return this;
    }

    private getFilter (filter: InvestorPreferencesFilter): string {
        return `${filter.dataPointId}${UTF_COLON}${filter.comparatorCode}${UTF_COLON}${filter.value}`;
    }
}

/* *
 *
 *  Registry
 *
 * */

declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarInvestorPreferences: typeof InvestorPreferencesConnector;
    }
}

External.DataConnector.registerType(
    'MorningstarInvestorPreferences',
    InvestorPreferencesConnector
);

/* *
 *
 *  Default Export
 *
 * */

export default InvestorPreferencesConnector;
