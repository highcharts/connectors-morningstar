/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
import MorningstarAPI from '../Shared/MorningstarAPI';
import PAUSConnector from '../Shared/PAUSConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import { DATA_TABLES, initConverter } from '../Shared/SharedXRayUS';

import type XRayUSJSON from './XRayUSJSON';
import type { XRayUSOptions, XRayUSMetadata, XRayUSRequestPayload } from './XRayUSOptions';

/* *
 *
 *  Declarations
 *
 * */


/* *
 *
 *  Functions
 *
 * */


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


export class XRayUSConnector extends PAUSConnector {


    /* *
     *
     *  Constructors
     *
     * */


    public constructor (
        options: XRayUSOptions
    ) {
        super(options, DATA_TABLES);

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: XRayUSOptions;

    public override metadata: XRayUSMetadata = {
        columns: {}
    };

    /* *
     *
     *  Functions
     *
     * */


    public override async load (
        options?: XRayUSOptions
    ): Promise<any> {
        await super.load();

        const userOptions = { ...this.options, ...options };
        const api = this.api = this.api || new MorningstarAPI(userOptions.api);
        const langcult = userOptions.langcult || 'en-US';
        const url =
            new MorningstarURL(`/portfolioanalysis/v1/xray?langcult=${langcult}`, api.baseURL);

        const bodyPayload: XRayUSRequestPayload = {
            view: {
                id: this.options.viewId || 'All'
            },
            config: {
                id: this.options.configId || 'Default'
            },
            requestSettings: this.options.requestSettings,
            portfolios: this.options.portfolios
        };

        const response = await api.fetch(url, {
            body: JSON.stringify(bodyPayload),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const json = await response.json() as XRayUSJSON.XRayUSResponse;

        for (const { key } of DATA_TABLES) {
            const converter = initConverter(key),
                hasMultiple = json.XRay.length > 1;

            for (const XRay of json.XRay) {
                converter.parse({
                    json: XRay,
                    hasMultiple
                });
            }

            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        this.metadata = {
            columns: {}
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
