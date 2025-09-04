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
import {
    CalendarYearReturnConverter,
    RiskStatisticsConverter,
    MPTStatisticsConverter,
    CorrelationMatrixConverter,
    TrailingReturnsConverter
} from './Converters';
import PerformanceOptions, {
    PerformanceRequestPayload,
    PerformanceConverterOptions,
    PerformanceMetadata
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
    parse(options: PerformanceConverterOptions, hasMultiple?: boolean): void;
}

/* *
 *
 *  Constants
 *
 * */

export const DATA_TABLES = [
    { key: 'CalendarYearReturn' },
    { key: 'RiskStatistics' },
    { key: 'MPTStatistics' },
    { key: 'CorrelationMatrix' },
    { key: 'TrailingReturns' }
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

    public override metadata!: PerformanceMetadata;

    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<any> {
        await super.load();

        const json = await this.response?.json() as PerformanceJSON.PerformanceResponse;
        const hasMultiple = json.Performance.length > 1;

        for (const { key } of DATA_TABLES) {
            const converter = this.initConverter(key);

            for (const Performance of json.Performance) {
                converter.parse({ json: Performance }, hasMultiple);
            }

            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        this.metadata = {
            columns: {},
            json
        };

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
            case 'CalendarYearReturn':
                return new CalendarYearReturnConverter();
            case 'RiskStatistics':
                return new RiskStatisticsConverter();
            case 'MPTStatistics':
                return new MPTStatisticsConverter();
            case 'CorrelationMatrix':
                return new CorrelationMatrixConverter();
            case 'TrailingReturns':
                return new TrailingReturnsConverter();
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
