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
import { AssetsAllocationsConverter, TrailingPerformanceConverter } from './Converters';
import SecurityDetailsOptions, {
    SecurityDetailsMetadata
} from './SecurityDetailsOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import SecurityDetailsConverter from './SecurityDetailsConverter';

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


    // public constructor (
    //     options: SecurityDetailsOptions = {}
    // ) {
    //     super(options);

    //     this.converter = new SecurityDetailsConverter(options.converter);
    //     this.options = optons;
    // }


    public constructor (
        options: SecurityDetailsOptions = {}
    ) {
        super(options);

        switch (options.type) {
            case 'trailingPerformance':
            default:
                this.converter = new TrailingPerformanceConverter({
                    ...options.converter
                });
                break;

            case 'assetsAllocations':
                this.converter = new AssetsAllocationsConverter({
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
