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
    SecurityDetailsMetadata
} from './SecurityDetailsOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import SecurityDetailsJSON from './SecurityDetailsJSON';
import {
    initConverter,
    SecurityDetailsConverter
} from '../Shared/SharedSecurityDetails';


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
        super(options);

        this.converter = initConverter(options.converter);

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


    public override readonly options: SecurityDetailsOptions;


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
        const json = await response.json() as unknown;
        if (!SecurityDetailsJSON.isSecurityDetailsResponse(json)) {
            throw new Error('Invalid data');
        }

        this.converter.parse({ json: json[0] });

        this.table.deleteColumns();
        this.table.setColumns(this.converter.getTable().getColumns());

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
