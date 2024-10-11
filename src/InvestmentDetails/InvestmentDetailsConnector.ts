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


import InvestmentDetailsConverter from './InvestmentDetailsConverter';
import InvestmentDetailsOptions, {
    InvestmentDetailsMetadata
} from './InvestmentDetailsOptions';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarURL from '../Shared/MorningstarURL';


/* *
 *
 *  Class
 *
 * */


export class InvestmentDetailsConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: InvestmentDetailsOptions = {}
    ) {
        super(options);

        this.converter = new InvestmentDetailsConverter(options.converter);
        // this.metadata = this.converter.metadata;
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: InvestmentDetailsConverter;


    // public override readonly metadata: InvestmentDetailsMetadata;


    public override readonly options: InvestmentDetailsOptions;


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


export default InvestmentDetailsConnector;
