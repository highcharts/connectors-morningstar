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
            const portfolio = riskScorePortfolio.portfolio as RiskScoreJSON.RiskScoreCalculated;

            const {
                name,
                externalId,
                effectiveDate,
                riskScore,
                alignmentScore,
                rSquared,
                retainedWeightProxied,
                scoringMethodUsed
            } = portfolio;

            sortedPortfolios.push({
                name,
                externalId,
                effectiveDate: Date.parse(effectiveDate) ?? '',
                riskScore,
                alignmentScore,
                rSquared,
                retainedWeightProxied,
                scoringMethodUsed
            });

            if (!RiskScoreJSON.isRiskScoreCalculated(portfolio)) {
                messages.push({
                    type: 'Warning',
                    message: 'Invalid RiskScore data for ' + name
                });
            }

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

        // Reset table

        table.deleteColumns();

        // Add risk scores to table
        let rowIndex = 0;
        for (const portfolio of sortedPortfolios) {
            const rows = [
                ['EffectiveDate', portfolio.effectiveDate],
                ['RiskScore', portfolio.riskScore],
                ['AlignmentScore', portfolio.alignmentScore],
                ['RSquared', portfolio.rSquared],
                ['RetainedWeightProxied', portfolio.retainedWeightProxied],
                ['ScoringMethodUsed', portfolio.scoringMethodUsed]
            ];

            rows.forEach(row => {
                table.setCell(`${portfolio.name}_${row[0]}`, rowIndex, row[1] ?? null);
            });

            rowIndex++;
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
