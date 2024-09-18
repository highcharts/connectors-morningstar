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


/* *
 *
 *  Imports
 *
 * */

import { Currency } from '../Shared/LocalizationOptions';
import MorningstarOptions, { MorningstarConverterOptions, MorningstarHoldingValueOptions, MorningstarHoldingWeightOptions } from '../Shared/MorningstarOptions';


/* *
 *
 *  Declarations
 *
 * */


export interface RiskScoreConverterOptions extends MorningstarConverterOptions {

    // Nothing to add yet

}

export interface RiskScorePortfolio {
    /**
     * The name of the portfolio.
     * 
     * This value is used for the column names in the DataTable.
     */
    name: string;

    /**
     * List of holdings in your portfolio.
     * 
     * You specify the quantity of a holding using `weight` xor `value`. 
     * If `weight` is used, you must specify `totalValue`.
     */
    holdings: MorningstarHoldingWeightOptions[] | MorningstarHoldingValueOptions[];

    /**
     * Currency to use for value conversions. Use `BAS` for base currency.
     * 
     * FIXME: Required, pass BAS if not provided.
     */
    currency?: Currency;

    /**
     * A unique identifier of a portfolio.
     * 
     * Morningstar echoes this property in the response.
     */
    externalId?: string;

    /**
     * The total market value of a portfolio.
     * 
     * This field is required if the holdings are specified with `weight`
     */
    totalValue?: number;
}


export interface RiskScoreOptions extends MorningstarOptions {

    /**
     * Converter options.
     */
    converter?: RiskScoreConverterOptions;

    /**
     * The portfolios you would like to analyse for risk.
     * 
     * A maximum of two portfolios can be passed in the request.
     */
    portfolios?: [RiskScorePortfolio] | [RiskScorePortfolio, RiskScorePortfolio]

}


/* *
 *
 *  Default Export
 *
 * */


export default RiskScoreOptions;
