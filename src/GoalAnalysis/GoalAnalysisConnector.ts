/* *
 *
 *  (c) 2009-2026 Highsoft AS
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
import GoalAnalysisConverter from './GoalAnalysisConverter';
import GoalAnalysisOptions, {
    GoalAnalysisMetadata
} from './GoalAnalysisOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';


/* *
 *
 *  Class
 *
 * */


export class GoalAnalysisConnector extends MorningstarConnector {


    /**
     *
     * Static Properties
     *
     */


    protected static readonly defaultOptions: GoalAnalysisOptions = {
        id: 'morningstar-goal-analysis',
        type: 'MorningstarGoalAnalysis'
    };


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: GoalAnalysisOptions
    ) {
        options = {
            ...GoalAnalysisConnector.defaultOptions,
            ...options
        };

        super(options);

        this.converter = new GoalAnalysisConverter(options.converter);
        this.metadata = this.converter.metadata;
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: GoalAnalysisConverter;


    public override readonly metadata: GoalAnalysisMetadata;


    public override readonly options: GoalAnalysisOptions;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<this> {

        await super.load();

        const options = this.options;
        const api = this.api = this.api || new MorningstarAPI(options.api);
        const url = new MorningstarURL('ecint/v1/goal-analysis', api.baseURL);

        if (!options.assetClassWeights) {
            throw new Error('Option assetClassWeights is missing.');
        }

        const searchParams = url.searchParams;

        searchParams.set('AssetClassWeights', options.assetClassWeights.join('|'));

        if (options.annualInvestment) {
            searchParams.set('annualInvestment', `${options.annualInvestment}`);
        }

        if (options.currentSavings) {
            searchParams.set('currentSavings', `${options.currentSavings}`);
        }

        if (typeof options.includeDetailedInvestmentGrowthGraph === 'boolean') {
            searchParams.set(
                'IncludeDetailedInvestmentGrowthGraph',
                options.includeDetailedInvestmentGrowthGraph ? 'True' : 'False'
            );
        }

        if (options.requestProbability) {
            searchParams.set('RequestProbability', `${options.requestProbability}`);
        }

        if (options.target) {
            searchParams.set('target', `${options.target}`);
        }

        if (options.timeHorizon) {
            searchParams.set('timeHorizon', `${options.timeHorizon}`);
        }

        const response = await api.fetch(url);
        const json = await response.json() as unknown;

        this.converter.parse({ json });

        this.getTable().deleteColumns();
        this.getTable().setColumns(this.converter.getTable().getColumns());

        return this.applyTableModifiers();
    }


}


/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarGoalAnalysis: typeof GoalAnalysisConnector;
    }
}


External.DataConnector.registerType('MorningstarGoalAnalysis', GoalAnalysisConnector);


/* *
 *
 *  Default Export
 *
 * */


export default GoalAnalysisConnector;
