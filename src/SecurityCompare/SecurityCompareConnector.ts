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
    SecurityDetailsConverter,
    initConverter
} from '../Shared/SharedSecurityDetails';
import { SecurityDetailsMetadata } from '../SecurityDetails/SecurityDetailsOptions';
import { SecurityCompareOptions } from '../SecurityCompare/SecurityCompareOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import SecurityDetailsJSON from '../SecurityDetails/SecurityDetailsJSON';
import { 
    UTF_PIPE
} from '../Shared/Utilities';


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

        this.converter = initConverter(options.converter, true);

        this.metadata = this.converter.metadata;
        this.options = options;

    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: SecurityDetailsConverter;


    public override readonly metadata: SecurityDetailsMetadata;


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

        for (const security of json) {
            this.converter.parse({ json: security, hasMultiple: true });
        }

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
