/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
import { RiskScoreConverterOptions, RiskScoreMetadata, RiskScoreMetadataMessage } from './RiskScoreOptions';


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
        this.metadata = {
            columns: {},
            messages: []
        };
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

    /**
     * Metadata from the previous load.
     */
    public readonly metadata: RiskScoreMetadata;

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
        const messages: RiskScoreMetadataMessage[] = [];

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
                messages.push(...riskScorePortfolio.metadata.messages);
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

        this.metadata.messages = messages;

        return true;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default RiskScoreConverter;
