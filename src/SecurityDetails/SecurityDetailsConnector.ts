/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
    DATA_TABLES,
    initConverter
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
        let convertersToUse: Array<{ key: SecurityDetailsConverterType }>;
        const { converter, converters } = options;

        // Create multi data table based on user-selected converters,
        // otherwise use all available.
        if (!converters?.length && converter?.type) { // Backwards compatibility
            convertersToUse = [{ key: converter.type }];
        } else if (converters?.length) {
            convertersToUse = DATA_TABLES.filter(dt => converters?.includes(dt.key));
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


    public override readonly options: SecurityDetailsOptions;

    public override metadata: SecurityDetailsMetadata = {
        columns: {},
        id: '',
        isin: ''
    };


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

        for (const key of Object.keys(this.dataTables)) {
            const converter = initConverter({ type: key as SecurityDetailsConverterType });

            converter.parse({ json: json[0] });

            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        this.metadata = {
            columns: {},
            id: json[0].Id,
            isin: json[0].Isin
        };

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
