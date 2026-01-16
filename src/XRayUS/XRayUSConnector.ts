/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import External from '../Shared/External';
import PAUSConnector from '../Shared/PAUSConnector';
import { DATA_TABLES, initConverter } from '../Shared/SharedXRayUS';

import type XRayUSJSON from './XRayUSJSON';
import type { XRayUSOptions, XRayUSMetadata, XRayUSRequestPayload } from './XRayUSOptions';


/* *
 *
 *  Class
 *
 * */


export class XRayUSConnector extends PAUSConnector {


    /**
     *
     * Static Properties
     *
     */


    protected static readonly defaultOptions: Partial<XRayUSOptions> = {
        id: 'morningstar-xray-us',
        type: 'MorningstarXRayUS',
        dataTables: DATA_TABLES
    };


    /* *
     *
     *  Constructors
     *
     * */


    public constructor (
        options: XRayUSOptions
    ) {
        options = {
            ...XRayUSConnector.defaultOptions,
            ...options
        };

        super(options);

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: XRayUSOptions;

    protected url = '/portfolioanalysis/v1/xray';

    public override metadata!: XRayUSMetadata;

    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<any> {
        await super.load();

        const json = await this.response?.json() as XRayUSJSON.XRayUSResponse,
            hasMultiple = json.XRay.length > 1;

        for (const { key } of DATA_TABLES) {
            const converter = initConverter(key);

            for (const XRay of json.XRay) {
                converter.parse({
                    json: XRay
                }, hasMultiple);
            }

            this.dataTables[key].metadata = converter.getTable().metadata;
            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        this.metadata = {
            columns: {},
            securityReference: json.SecurityReference,
            json
        };

        return this.applyTableModifiers();
    }

    protected getPayload (): XRayUSRequestPayload {
        return {
            view: { id: this.options.viewId || 'All' },
            config: { id: this.options.configId || 'Default' },
            requestSettings: this.options.requestSettings,
            portfolios: this.options.portfolios
        };
    }
}

/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarXRayUS: typeof XRayUSConnector
    }
}


External.DataConnector.registerType('MorningstarXRayUS', XRayUSConnector);


/* *
 *
 *  Default Export
 *
 * */


export default XRayUSConnector;
