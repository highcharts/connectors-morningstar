/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Lysy
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type InvestmentScreenerOptions from './InvestmentScreenerOptions';
import type {
    InvestmentScreenerFilter,
    InvestmentScreenerMetadata
} from './InvestmentScreenerOptions';
import External from '../../Shared/External';
import MorningstarAPI from '../../Shared/MorningstarAPI';
import MorningstarConnector from '../../Shared/MorningstarConnector';
import InvestmentScreenerConverter from './InvestmentScreenerConverter';
import MorningstarURL from '../../Shared/MorningstarURL';

/* *
 *
 *  Constants
 *
 * */

const UTF_PIPE = '|';
const UTF_COLON = ':';

/* *
 *
 *  Class
 *
 * */
export class InvestmentScreenerConnector extends MorningstarConnector {
    public constructor (
        options: InvestmentScreenerOptions = { universeIds: [] }
    ) {
        super(options);

        this.converter = new InvestmentScreenerConverter(options.converter);
        this.metadata = this.converter.metadata;
        this.options = options;
    }

    public override readonly converter: InvestmentScreenerConverter;

    public override readonly options: InvestmentScreenerOptions;

    public override readonly metadata: InvestmentScreenerMetadata;

    public override async load (
        options?: InvestmentScreenerOptions
    ): Promise<this> {
        await super.load();

        const userOptions = { ...this.options, ...options };
        this.api ??= new MorningstarAPI(userOptions.api);
        const api = this.api;
        const url = new MorningstarURL('ecint/v1/screener', api.baseURL);
        const searchParams = url.searchParams;

        searchParams.set('outputType', 'json');
        searchParams.set('universeIds', userOptions.universeIds.join(UTF_PIPE));

        if (userOptions.securityDataPoints) {
            searchParams.set(
                'securityDataPoints',
                userOptions.securityDataPoints.join(',')
            );
        }

        if (userOptions.filters) {
            const filters = userOptions.filters.reduce(
                (prev, curr) =>
                    prev === '' ?
                        this.getFilter(curr) :
                        prev + UTF_PIPE + this.getFilter(curr),
                ''
            );
            searchParams.set('filters', filters);
        }

        if (userOptions.ignoreRestructure) {
            searchParams.set(
                'ignoreRestructure',
                `${userOptions.ignoreRestructure}`
            );
        }

        if (userOptions.term) {
            searchParams.set('term', userOptions.term);
        }

        if (userOptions.applyTrackRecordExtension) {
            searchParams.set(
                'applyTrackRecordExtension',
                `${userOptions.applyTrackRecordExtension}`
            );
        }

        if (userOptions.page) {
            searchParams.set('page', `${userOptions.page}`);
        }

        if (userOptions.pageSize) {
            searchParams.set('pageSize', `${userOptions.pageSize || 1}`);
        }

        if (userOptions.sortOrder) {
            searchParams.set('sortOrder', userOptions.sortOrder);
        }

        if (userOptions.countryId) {
            searchParams.set('countryId', userOptions.countryId);
        }

        if (userOptions.currencyId) {
            searchParams.set('currencyId', userOptions.currencyId);
        }

        const response = await api.fetch(url);
        const json = (await response.json()) as unknown;

        this.converter.parse({ json });
        this.table.deleteColumns();
        this.table.setColumns(this.converter.getTable().getColumns());

        return this;
    }

    private getFilter (filter: InvestmentScreenerFilter): string {
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
        MorningstarInvestmentScreener: typeof InvestmentScreenerConnector;
    }
}

External.DataConnector.registerType(
    'MorningstarInvestmentScreener',
    InvestmentScreenerConnector
);

/* *
 *
 *  Default Export
 *
 * */

export default InvestmentScreenerConnector;
