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


import InvestmentDetailsConverter from './InvestmentDetailsConverter';
import InvestmentDetailsOptions, {
    InvestmentDetailsMetadata
} from './InvestmentDetailsOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import {
    MorningstarSecurityOptions
} from '../Shared/MorningstarOptions';
import MorningstarURL from '../Shared/MorningstarURL';


/* *
 *
 *  Class
 *
 * */


export class InvestmentDetailsConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: InvestmentDetailsOptions = {}
    ) {
        super(options);

        this.converter = new InvestmentDetailsConverter(options.converter);
        this.metadata = this.converter.metadata;
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: InvestmentDetailsConverter;


    public override readonly metadata: InvestmentDetailsMetadata;


    public override readonly options: InvestmentDetailsOptions;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<this> {

        await super.load();

        /* Example:
        curl 
        --location --request GET 'https://www.us-api.morningstar.com/ecint/v1/securities/F0GBR050DD?viewId=MFsnapshot&responseViewFormat=json&idtype=msid' \
        --header 'Authorization: Bearer {token}'
        */

        const security: MorningstarSecurityOptions = {
            id: 'F0GBR050DD',
            idType: 'MSID'
        };
        const options = this.options;
        const api = this.api = this.api || new MorningstarAPI(options.api);
        const url = new MorningstarURL(`ecint/v1/securities/${security.id}`, api.baseURL);

        const searchParams = url.searchParams;

        searchParams.set('idType', security.idType);
        searchParams.set('responseViewFormat', 'json');
        searchParams.set('viewId', 'MFsnapshot');

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
 *  Default Export
 *
 * */


export default InvestmentDetailsConnector;
