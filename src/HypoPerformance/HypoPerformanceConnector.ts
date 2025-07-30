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
import PAUSConnector from '../Shared/PAUSConnector';
import HypoPerformanceOptions, {
    HypoConverterOptions,
    HypoPerformanceRequestPayload
} from './HypoPerformanceOptions';
import { TestConverter } from './Converters';
import MorningstarConverter from '../Shared/MorningstarConverter';
import HypoJSON from './HypoPerformanceJSON';


/* *
 *
 *  Declarations
 *
 * */

/* *
 *
 *  Interfaces
 *
 * */

export interface HypoConverter extends MorningstarConverter {
    parse(options: HypoConverterOptions): void;
}


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

const DATA_TABLES = [
    { key: 'TestConverter' }
];


/* *
 *
 *  Class
 *
 * */


export class HypoPerformanceConnector extends PAUSConnector {


    /* *
     *
     *  Constructors
     *
     * */


    public constructor (
        options: HypoPerformanceOptions
    ) {
        super(options, DATA_TABLES);

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: HypoPerformanceOptions;

    protected url = '/portfolioanalysis/v1/hypo';

    /* *
     *
     *  Functions
     *
     * */

    public override async load (): Promise<any> {
        await super.load();

        const json = await this.response?.json() as HypoJSON.HypoResponse;

        for (const { key } of DATA_TABLES) {
            const converter = this.initConverter(key);

            converter.parse({ json: json });

            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        return this.setModifierOptions(this.options.dataModifier);
    }

    protected getPayload (): HypoPerformanceRequestPayload {
        return {
            View: { Id: this.options.viewId || 'Growth' },
            RequestSettings: this.options.requestSettings,
            Portfolios: this.options.portfolios
        };
    }

    private initConverter (key: string): HypoConverter {
        switch (key) {
            case 'TestConverter':
                return new TestConverter();
            default:
                throw new Error(`Unsupported key: ${key}`);
        }

    }


}

/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarHypoPerformance: typeof HypoPerformanceConnector
    }
}


External.DataConnector.registerType('MorningstarHypoPerformance', HypoPerformanceConnector);


/* *
 *
 *  Default Export
 *
 * */


export default HypoPerformanceConnector;
