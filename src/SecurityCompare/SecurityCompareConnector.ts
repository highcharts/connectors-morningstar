/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
import SecurityCompareConverter from './SecurityCompareConverter';
import {
    TrailingPerformanceConverter
} from './Converters';
import SecurityCompareOptions, {
    SecurityCompareMetadata
} from './SecurityCompareOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';


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
        super(options);

        switch (options.converter?.type) {
            case 'TrailingPerformance':
            default:
                this.converter = new TrailingPerformanceConverter({
                    ...options.converter
                });
                break;
        }

        this.metadata = this.converter.metadata;
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: SecurityCompareConverter;


    public override readonly metadata: SecurityCompareMetadata;


    public override readonly options: SecurityCompareOptions;


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
        searchParams.set('ids', '' + securityIds.join('|'));
        searchParams.set('idType', '' + securityIdType);
        searchParams.set('responseViewFormat', 'json');
        searchParams.set('viewIds', viewIds);

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
