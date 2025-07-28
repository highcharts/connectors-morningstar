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
import { TestConverter } from './Converters';
import PerformanceOptions, {
    PerformanceRequestPayload,
    PerformanceConverterOptions
} from './PerformanceOptions';
import type MorningstarConverter from '../Shared/MorningstarConverter';
import type PerformanceJSON from './PerformanceJSON';


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

export interface PerformanceConverter extends MorningstarConverter {
    parse(options: PerformanceConverterOptions): void;
}

/* *
 *
 *  Constants
 *
 * */

export const DATA_TABLES = [
    { key: 'TestConverter' }
];


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
        super(options, DATA_TABLES);

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: PerformanceOptions;

    protected url = '/portfolioanalysis/v1/performance';


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<any> {
        await super.load();

        const json = await this.response?.json() as PerformanceJSON.PerformanceResponse;

        for (const { key } of DATA_TABLES) {
            const converter = this.initConverter(key);

            converter.parse({ json: json });

            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        return this.setModifierOptions(this.options.dataModifier);
    }


    protected getPayload (): PerformanceRequestPayload {
        return {
            view: { id: this.options.viewId || 'All' },
            config: { id: this.options.configId || 'QuickPortfolio' },
            requestSettings: this.options.requestSettings,
            portfolios: this.options.portfolios
        };
    }

    private initConverter (key: string): PerformanceConverter {
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
