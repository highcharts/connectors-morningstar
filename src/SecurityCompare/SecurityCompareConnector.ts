/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import External from '../Shared/External';
import {
    SecurityDetailsConverterType
} from './../SecurityDetails/SecurityDetailsOptions';
import {
    initConverter
} from '../Shared/SharedSecurityDetails';
import {
    SecurityCompareOptions,
    SecurityCompareMetadata
} from '../SecurityCompare/SecurityCompareOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import SecurityDetailsJSON from '../SecurityDetails/SecurityDetailsJSON';
import {
    UTF_PIPE
} from '../Shared/Utilities';


/* *
 *
 *  Constants
 *
 * */


const DATA_TABLES: { key: SecurityDetailsConverterType }[] = [
    { key: 'TrailingPerformance' },
    { key: 'AssetAllocations' },
    { key: 'RegionalExposure' },
    { key: 'GlobalStockSectorBreakdown' },
    { key: 'CountryExposure' },
    { key: 'PortfolioHoldings' },
    { key: 'MarketCap' },
    { key: 'IndustryBreakdown' },
    { key: 'IndustryGroupBreakdown' },
    { key: 'BondStatistics' },
    { key: 'Meta' }
];


/* *
 *
 *  Class
 *
 * */


export class SecurityCompareConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options: SecurityCompareOptions
    ) {
        let convertersToUse;

        // Create multi data table based on user-selected converters,
        // otherwise use all available
        if (Array.isArray(options.converters) && options.converters.length > 0) {
            convertersToUse =
                DATA_TABLES.filter(dt => (options.converters as string[]).includes(dt.key));
        } else {
            convertersToUse = DATA_TABLES;
        }

        super(options, convertersToUse);
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: SecurityCompareOptions;

    public override metadata: SecurityCompareMetadata = {
        columns: {},
        ids: [],
        isins: []
    };


    /* *
     *
     *  Functions
     *
     * */


    public override async load (
        options?: SecurityCompareOptions
    ): Promise<this> {

        await super.load();

        const userOptions = { ...this.options, ...options };
        const { security, viewIds = 'MFsnapshot' } = userOptions;
        const { ids: securityIds, idType: securityIdType } = (security || {});
        const api = this.api = this.api || new MorningstarAPI(userOptions.api);
        const url = new MorningstarURL('ecint/v1/multi-securities/', api.baseURL);

        const searchParams = url.searchParams;
        searchParams.set('ids', '' + securityIds.join(UTF_PIPE));
        searchParams.set('idType', '' + securityIdType);
        searchParams.set('responseViewFormat', 'json');
        searchParams.set('viewIds', viewIds);

        const response = await api.fetch(url);
        const json = await response.json() as unknown;

        if (!SecurityDetailsJSON.isSecurityDetailsResponse(json)) {
            throw new Error('Invalid data');
        }

        this.table.deleteColumns();

        for (const key of Object.keys(this.dataTables)) {
            const converter = initConverter({ type: key as SecurityDetailsConverterType }, true);

            for (const security of json) {
                converter.parse({ json: security, hasMultiple: true });
            }

            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        this.metadata = {
            columns: {},
            ids: [],
            isins: []
        };


        for (const security of json) {
            this?.metadata?.ids?.push(security.Id);
            this?.metadata?.isins?.push(security.Isin);
        }

        return this.setModifierOptions(userOptions.dataModifier);
    }
}


/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarSecurityCompare: typeof SecurityCompareConnector;
    }
}


External.DataConnector.registerType('MorningstarSecurityCompare', SecurityCompareConnector);


/* *
 *
 *  Default Export
 *
 * */


export default SecurityCompareConnector;
