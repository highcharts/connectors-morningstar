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
    HypoPerformanceRequestPayload,
    HypoPerformanceMetadata
} from './HypoPerformanceOptions';
import { GrowthConverter } from './Converters';
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
    parse(options: HypoConverterOptions, hasMultiple?: boolean): void;
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
    { key: 'Growth' }
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

    public override metadata!: HypoPerformanceMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override async load (): Promise<any> {
        await super.load();

        const json = await this.response?.json() as HypoJSON.HypoResponse;
        const hasMultiple = json.Hypo.length > 1;

        for (const { key } of DATA_TABLES) {
            const converter = this.initConverter(key);

            for (const Hypo of json.Hypo) {
                converter.parse({ json: Hypo }, hasMultiple);
            }

            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        this.metadata = {
            columns: {},
            json
        };

        return this.setModifierOptions(this.options.dataModifier);
    }

    protected getPayload (): HypoPerformanceRequestPayload {
        return {
            view: { id: this.options.viewId || 'Growth' },
            requestSettings: this.options.requestSettings,
            portfolios: this.options.portfolios
        };
    }

    private initConverter (key: string): HypoConverter {
        switch (key) {
            case 'Growth':
                return new GrowthConverter();
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
