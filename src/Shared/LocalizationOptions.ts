/* *
 *
 *  (c) 2009-2026 Highsoft AS
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
 *  Declarations
 *
 * */


/**
 * Currency to use for value conversions. Use `BAS` for base currency.
 */
export type Currency = ('AUD'|'BAS'|'CAD'|'CNY'|'EUR'|'GBP'|'INR'|'JPY'|'USD');


export interface DateOptions {

    day: number;

    month: number;

    year: number;

}


export interface LocalizationOptions {

    /**
     * A two-letter ISO-3166-1 alpha-2 country code.
     * For example: US, JP
     */
    country: string;

    /**
     * ISO 4217 currency code to use for value conversions, or `BAS` for base
     * currency.
     *
     * @default "USD"
     */
    currency: Currency;

    /**
     * A two-letter ISO-639-1 alpha-2 language code.
     * For example: en, ja
     */
    language: string;

}


/* *
 *
 *  Default Export
 *
 * */

export default LocalizationOptions;
