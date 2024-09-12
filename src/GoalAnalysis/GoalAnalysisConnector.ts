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


import GoalAnalysisConverter from './GoalAnalysisConverter';
import GoalAnalysisOptions from './GoalAnalysisOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';


/* *
 *
 *  Constants
 *
 * */


const assetClassDataPoints = [
    'annualisedRequiredReturn',
    'expectedReturn',
    'financialGoal',
    'probabilityAccumulate',
    'probabilityOfReachingTarget',
    'requiredReturn',
    'requiredReturnValue',
    'seriesData',
    'standardDeviation',
    'totalGain',
    'totalInvestment',
    'totalReturn',
    'years'
];


/* *
 *
 *  Class
 *
 * */


export class GoalAnalysisConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options: GoalAnalysisOptions = {}
    ) {
        super(options);

        this.converter = new GoalAnalysisConverter(options.converter);
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: GoalAnalysisConverter;


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
        const url = new MorningstarURL('/ecint/v1/goal-analysis', api.baseURL);

        if (!options.assetClassWeights) {
            throw new Error('Option assetClassWeights is missing.');
        }

        const assetClassWeights = options.assetClassWeights as unknown as Record<string, number>;
        const assetClassPipe: Array<number> = [];

        for (const dataPoint of assetClassDataPoints) {
            assetClassPipe.push(assetClassWeights[dataPoint] || 0);
        }

        url.searchParams.set('AssetClassWeights', assetClassPipe.join('|'));

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


export default GoalAnalysisConnector;
