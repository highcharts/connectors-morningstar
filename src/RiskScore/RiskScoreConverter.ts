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

        if (!options.json) {
            return false;
        }

        // Validate JSON

        if (!RiskScoreJSON.isResponse(options.json)) {
            throw new Error('Invalid data');
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
