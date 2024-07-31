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
 *  Declarations
 *
 * */


export type Currency = ('AUD'|'CAD'|'CNY'|'EUR'|'GBP'|'INR'|'JPY'|'USD');


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
     * The currency to use.
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
