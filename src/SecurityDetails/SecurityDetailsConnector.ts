/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
import SecurityDetailsOptions, {
    SecurityDetailsConverterType,
    SecurityDetailsMetadata
} from './SecurityDetailsOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import SecurityDetailsJSON from './SecurityDetailsJSON';
import {
    initConverter,
    pickConverters
} from '../Shared/SharedSecurityDetails';


/* *
 *
 *  Constants
 *
 * */


/* *
 *
 *  Class
 *
 * */


export class SecurityDetailsConnector extends MorningstarConnector {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options: SecurityDetailsOptions
    ) {
        const { converter, converters } = options;
        const convertersToUse = pickConverters(converter, converters);


        options = {
            ...options,
            id: 'morningstar-security-details',
            type: 'MorningstarSecurityDetails',
            dataTables: convertersToUse
        };
        super(options);
        this.options = options;
    }

    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: SecurityDetailsOptions;

    public override metadata!: SecurityDetailsMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (
        options?: SecurityDetailsOptions
    ): Promise<this> {

        await super.load();

        const userOptions = { ...this.options, ...options };
        const { security, viewId = 'MFsnapshot' } = userOptions;
        const { id: securityId, idType: securityIdType } = (security || {});
        const api = this.api = this.api || new MorningstarAPI(userOptions.api);
        const url = new MorningstarURL(`ecint/v1/securities/${securityId}`, api.baseURL);

        const searchParams = url.searchParams;

        searchParams.set('idType', '' + securityIdType);
        searchParams.set('responseViewFormat', 'json');
        searchParams.set('viewid', viewId);

        const response = await api.fetch(url);
        const json = await response.json() as SecurityDetailsJSON.SecurityDetailsResponse;

        if (!SecurityDetailsJSON.isSecurityDetailsResponse(json)) {
            throw new Error('Invalid data');
        }

        for (const key of Object.keys(this.dataTables)) {
            const converter = initConverter({ type: key as SecurityDetailsConverterType });

            converter.parse({ json: json[0] });

            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        this.metadata = {
            columns: {},
            id: json[0].Id,
            isin: json[0].Isin,
            json
        };

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
        MorningstarSecurityDetails: typeof SecurityDetailsConnector;
    }
}


External.DataConnector.registerType('MorningstarSecurityDetails', SecurityDetailsConnector);


/* *
 *
 *  Default Export
 *
 * */


export default SecurityDetailsConnector;
