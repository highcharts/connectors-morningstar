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
import RiskScoreOptions, { BaseRiskScorePortfolio, RiskScorePortfolio } from './RiskScoreOptions';
import RiskScoreConverter from './RiskScoreConverter';
import { HoldingIdentiferType, MorningstarHoldingOptions, MorningstarHoldingValueOptions, MorningstarHoldingWeightOptions } from '../Shared/MorningstarOptions';

/* *
 * 
 *  Declarations
 * 
 * */


interface MorningstarHoldingRequest {
    /**
     * Security identifier.
     */
    identifier: string;

    /**
     * Security identifier type.
     */
    identifierType: HoldingIdentiferType;

    /**
     * Holding weight.
     * Mutually exclusive with value.
     */
    weight?: (number | string);

    /**
     * Holding value.
     * Mutually exclusive with weight.
     */
    value?: (number | string);

    /**
     * Name of holding.
     */
    name?: string;
}

interface RiskScorePortfolioRequest extends BaseRiskScorePortfolio {
    /**
     * List of holdings in your portfolio.
     * 
     * You specify the quantity of a holding using `weight` xor `value`. 
     * If `weight` is used, you must specify `totalValue`.
     */
    holdings: MorningstarHoldingRequest;
}

interface RiskScoreRequestPayload {
    Portfolios: RiskScorePortfolioRequest[];
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
    value?: (number|string);

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
        let currentHoldingType: 'weight' | 'value' | undefined;
        const holdingName = holding.name ?? holding.id;

        if (holding.weight !== undefined && holding.value !== undefined) {
            throw new Error(`The holding “${holdingName}” in the portfolio “${portfolioName}” cannot have both weight and value.`);
        } else if (holding.weight !== undefined) {
            currentHoldingType = 'weight';
        } else if (holding.value !== undefined) {
            currentHoldingType = 'value';
        } else {
            throw new Error(`The holding “${holdingName}” in the portfolio “${portfolioName}” does not have a value nor a weight.`);
        }

        if (holdingType === undefined) {
            holdingType = currentHoldingType;
        }

        if (currentHoldingType !== holdingType) {
            throw new Error(`The holdings in the portfolio “${portfolioName}” mix and match between using value and weight. This is not allowed.`);
        }
    }
}

function convertMorningstarHoldingOptionsToMorningstarHoldingRequest (
    holding: MorningstarHoldingWeightOptions | MorningstarHoldingValueOptions
): MorningstarHoldingRequest {
    const holdingRequest: MorningstarHoldingRequest = {
        identifier: holding.id,
        identifierType: holding.idType,
        name: holding.name
    };
    
    const typeErasedHolding = holding as MorningstarAnyHoldingOptions;

    if (typeErasedHolding.weight !== undefined) {
        holdingRequest.weight = typeErasedHolding.weight;
    } else if (typeErasedHolding.value !== undefined) {
        holdingRequest.value = typeErasedHolding.value;
    }

    return holdingRequest;
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

        const requestPortfolios = [...portfolios].map(portfolio => {
            Object.assign(portfolio, {
                holdings: portfolio.holdings.map(
                    holding => convertMorningstarHoldingOptionsToMorningstarHoldingRequest(holding)
                )
            });
            
            if (portfolio.currency === undefined) {
                portfolio.currency = 'BAS';
            }

            return portfolio as unknown as RiskScorePortfolioRequest;
        });

        const bodyPayload: RiskScoreRequestPayload = {
            Portfolios: requestPortfolios
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
