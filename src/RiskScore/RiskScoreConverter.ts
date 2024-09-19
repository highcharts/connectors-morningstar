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

        const portfolioNames = json.riskScores.map(riskScore => riskScore.portfolio.name);

        // Reset table

        table.deleteColumns();

        const valueColumns = [
            'RiskScore', 
            'AlignmentScore', 
            'RSquared', 
            'RetainedWeightProxied', 
            'ScoringMethodUsed', 
            'EffectiveDate'
        ];

        for (const portfolioName of portfolioNames) {
            for (const columnName of valueColumns) {
                table.setColumn(`${portfolioName}_${columnName}`);
            }
        }

        // Add risk scores to table

        for (let rowIndex = 0; rowIndex < json.riskScores.length; rowIndex++) {
            const riskScore = json.riskScores[rowIndex];
            const portfolio = riskScore.portfolio;
            const riskScoreValues = [
                portfolio.riskScore,
                portfolio.alignmentScore,
                portfolio.rSquared,
                portfolio.retainedWeightProxied,
                portfolio.scoringMethodUsed,
                portfolio.effectiveDate
            ];
            for (let columnIndex = 0; columnIndex < riskScoreValues.length; columnIndex++) {
                const column = `${portfolio.name}_${valueColumns[columnIndex]}`;
                const value = riskScoreValues[columnIndex];
                table.setCell(column, Number(rowIndex), value);
            }
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
