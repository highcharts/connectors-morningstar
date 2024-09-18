/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Eskil Gjerde Sviggum
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import External from '../Shared/External';
import MorningstarConnector from '../Shared/MorningstarConnector';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarURL from '../Shared/MorningstarURL';
import RiskScoreOptions, { RiskScorePortfolio } from './RiskScoreOptions';
import RiskScoreConverter from './RiskScoreConverter';
import { MorningstarHoldingOptions, MorningstarHoldingValueOptions, MorningstarHoldingWeightOptions } from '../Shared/MorningstarOptions';

/* *
 * 
 *  Declarations
 * 
 * */

interface RiskScoreRequestPayload {
    Portfolios: [RiskScorePortfolio] | [RiskScorePortfolio, RiskScorePortfolio];
}

interface MorningstarAnyHoldingOptions extends MorningstarHoldingOptions {

    /**
     * Name of holding.
     */
    name?: string;

    /**
     * Holding weight.
     * 
     * `value` and `weight` are mutually exclusive.
     */
    weight?: (number|string);

    /**
     * Holding value.
     * 
     * `value` and `weight` are mutually exclusive.
     */
    value: (number|string);

}

/* *
 * 
 *  Functions
 * 
 * */

/**
 * Validates the holdings, throws an error if they have unmatching 
 * ways of describing quantity.
 * 
 * @param holdings { MorningstarHoldingWeightOptions[] }
 * @param portfolioName { string }
 * @throws
 */
function validatePortfolioHoldings (
    holdings: MorningstarHoldingWeightOptions[] | MorningstarHoldingValueOptions[],
    portfolioName: string
) {
    let holdingType: 'weight' | 'value' | undefined;

    for (const holding of (holdings as MorningstarAnyHoldingOptions[])) {
        let currentHoldingType: 'weight' | 'value' | 'both' | undefined;
        if (holding.weight !== undefined && holding.value !== undefined) {
            currentHoldingType = 'both';
        } else if (holding.weight !== undefined) {
            currentHoldingType = 'weight';
        } else if (holding.value !== undefined) {
            currentHoldingType = 'value';
        } else {
            const holdingName = holding.name ?? holding.id;
            throw new Error(`The holding “${holdingName}” in the portfolio “${portfolioName}” does not have a value nor a weight.`);
        }
        
        if (currentHoldingType === 'both') {
            continue;
        }

        if (holdingType === undefined) {
            holdingType = currentHoldingType;
        }

        if (currentHoldingType !== holdingType) {
            throw new Error(`The holdings in the portfolio “${portfolioName}” mix and match between using value and weight. This is not allowed.`);
        }
    }
}


/* *
 *
 *  Class
 * 
 *  */


export class RiskScoreConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */


    /**
     * Constructs an instance of RiskScoreConnector.
     *
     * @param { RiskScoreOptions } [options]
     * Options for the connector and converter.
     */
    public constructor (
        options: RiskScoreOptions = {}
    ) {
        super(options);

        this.converter = new RiskScoreConverter(options.converter);
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: RiskScoreConverter;


    public override readonly options: RiskScoreOptions;


    /* *
     *
     *  Functions
     *
     * */


    /**
     * Loads Risk Score data from Morningstar.
     *
     * @return {Promise<this>}
     * Same connector instance with modified table.
     */
    public override async load (): Promise<this> {
        await super.load();

        const options = this.options;
        const portfolios = options.portfolios;

        if (!portfolios || (portfolios as Array<RiskScorePortfolio>).length === 0) {
            return this;
        }

        for (const portfolio of portfolios) {
            validatePortfolioHoldings(portfolio.holdings, portfolio.name);
        }

        const bodyPayload: RiskScoreRequestPayload = {
            Portfolios: portfolios
        };

        const api = this.api = this.api || new MorningstarAPI(options.api);
        const url = new MorningstarURL('/portfolio-analysis/v1/risk-score', api.baseURL);

        const response = await api.fetch(url, {
            body: JSON.stringify(bodyPayload),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const json = await response.json() as unknown;

        this.converter.parse({ json });

        this.table.deleteColumns();
        this.table.setColumns(this.converter.getTable().getColumns());

        return this;
    }


}


/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarRiskScore: typeof RiskScoreConnector;
    }
}


External.DataConnector.registerType('MorningstarRiskScore', RiskScoreConnector);


/* *
 *
 *  Default Export
 *
 * */


export default RiskScoreConnector;
