/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Mateusz Bernacik
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
        super(options);

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


    public override async load (): Promise<any> {
        const url = `/portfolioanalysis/v1/performance?langcult=${this.options.langcult || 'en-US'}`;
        const response = await super.load(url);

        // eslint-disable-next-line no-console
        console.log('Performance', response);

        return this.setModifierOptions(this.options.dataModifier);
    }


    protected getPayload (): PerformanceRequestPayload {
        return {
            View: { Id: this.options.viewId || 'All' },
            Config: { Id: this.options.configId || 'QuickPortfolio' },
            RequestSettings: this.options.requestSettings,
            Portfolios: this.options.portfolios
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
