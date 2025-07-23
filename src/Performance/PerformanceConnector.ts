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
import MorningstarAPI from '../Shared/MorningstarAPI';
import PAUSConnector from '../Shared/PAUSConnector';
import MorningstarURL from '../Shared/MorningstarURL';
import PerformanceOptions, {
    PerformanceRequestPayload
} from './PerformanceOptions';


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

// export const DATA_TABLES = [
//     { key: 'TrailingReturns' },
// ];


/* *
 *
 *  Class
 *
 * */


export class PerformanceConnector extends PAUSConnector {


    /* *
     *
     *  Constructors
     *
     * */


    public constructor (
        options: PerformanceOptions
    ) {
        super(
            options
        );

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: PerformanceOptions;

    /* *
     *
     *  Functions
     *
     * */


    public override async load (
        options?: PerformanceOptions
    ): Promise<any> {
        await super.load();
        const userOptions = { ...this.options, ...options };
        const api = this.api = this.api || new MorningstarAPI(userOptions.api);
        const url =
            new MorningstarURL('/portfolioanalysis/v1/performance?langcult=en-US', api.baseURL);

        const bodyPayload: PerformanceRequestPayload = {
            View: {
                Id: this.options.viewId || 'All'
            },
            Config: {
                Id: this.options.configId || 'QuickPortfolio'
            },
            RequestSettings: this.options.requestSettings,
            Portfolios: this.options.portfolios
        };

        const response = await api.fetch(url, {
            body: JSON.stringify(bodyPayload),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const json = await response.json() as unknown;

        // eslint-disable-next-line no-console
        console.log('Performance', json);

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
        MorningstarPerformance: typeof PerformanceConnector
    }
}


External.DataConnector.registerType('MorningstarPerformance', PerformanceConnector);


/* *
 *
 *  Default Export
 *
 * */


export default PerformanceConnector;
