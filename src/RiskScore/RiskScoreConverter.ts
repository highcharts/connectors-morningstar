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

import MorningstarConverter from '../Shared/MorningstarConverter';
import RiskScoreJSON from './RiskScoreJSON';
import { RiskScoreConverterOptions } from './RiskScoreOptions';


/* *
 *
 *  Declarations
 *
 * */


type RiskScorePortfolio = {
    externalId?: string,
    name: string,
    riskScore: number,
    alignmentScore: number,
    rSquared: number,
    retainedWeightProxied: number,
    scoringMethodUsed: string,
    effectiveDate: number
};


/* *
 *
 *  Class
 *
 * */


/**
 * Handles parsing and transformation of Portfolio Risk Score to a table.
 *
 * @private
 */
export class RiskScoreConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    /**
     * Constructs an instance of the RiskScoreConverter.
     *
     * @param { RiskScoreConverterOptions } [options]
     * Options for the converter.
     */
    constructor (
        options: RiskScoreConverterOptions = {}
    ) {
        super(options);

        this.options = options as Required<RiskScoreConverterOptions>;
    }

    /* *
     *
     *  Properties
     *
     * */


    /**
     * Options for the DataConverter.
     */
    public override readonly options: Required<RiskScoreConverterOptions>;

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Initiates the parsing of the Risk Score response
     *
     * @param { RiskScoreConverterOptions } [options]
     * Options for the parser
     *
     */
    public parse (
        options: RiskScoreConverterOptions
    ): (boolean|undefined) {
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!RiskScoreJSON.isResponse(json)) {
            throw new Error('Invalid data');
        }

        // Parse and cumulate risk scores by date

        const sortedPortfolios: RiskScorePortfolio[] = [];
        const errors: string[] = [];

        for (const riskScorePortfolio of json.riskScores) {
            const {
                externalId,
                name,
                effectiveDate,
                riskScore,
                alignmentScore,
                rSquared,
                retainedWeightProxied,
                scoringMethodUsed
            } = riskScorePortfolio.portfolio;

            sortedPortfolios.push({
                externalId,
                name,
                effectiveDate: Date.parse(effectiveDate),
                riskScore,
                alignmentScore,
                rSquared,
                retainedWeightProxied,
                scoringMethodUsed
            });

            if (
                riskScorePortfolio.metadata !== undefined && 
                riskScorePortfolio.metadata.messages.length > 0
            ) {
                for (const message of riskScorePortfolio.metadata.messages) {
                    const holdingNames = message.invalidHoldings.map(
                        invalidHolding => invalidHolding.identifier
                    );

                    errors.push(
                        `The holding(s) ${holdingNames.join(', ')} are invalid. ${message.message}`
                    );
                }
            }
        }

        sortedPortfolios.sort((a, b) => (
            a.effectiveDate === b.effectiveDate ?
                0 :
                a.effectiveDate < b.effectiveDate ? -1 : 1
        ));

        const portfolioNames = sortedPortfolios.map(portfolio => portfolio.name);

        // Reset table

        table.deleteColumns();

        const valueColumns = [
            'EffectiveDate',
            'RiskScore',
            'AlignmentScore',
            'RSquared',
            'RetainedWeightProxied',
            'ScoringMethodUsed'
        ];

        for (const portfolioName of portfolioNames) {
            for (const columnName of valueColumns) {
                table.setColumn(`${portfolioName}_${columnName}`);
            }
        }

        // Add risk scores to table

        for (let rowIndex = 0; rowIndex < sortedPortfolios.length; rowIndex++) {
            const portfolio = sortedPortfolios[rowIndex];
            const riskScoreValues = [
                portfolio.effectiveDate,
                portfolio.riskScore,
                portfolio.alignmentScore,
                portfolio.rSquared,
                portfolio.retainedWeightProxied,
                portfolio.scoringMethodUsed
            ];

            for (let columnIndex = 0; columnIndex < riskScoreValues.length; columnIndex++) {
                const column = `${portfolio.name}_${valueColumns[columnIndex]}`;
                const value = riskScoreValues[columnIndex];
                table.setCell(column, Number(rowIndex), value);
            }
        }

        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }

        return true;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default RiskScoreConverter;
