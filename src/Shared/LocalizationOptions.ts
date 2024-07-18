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

    country: string;

    currency: Currency;

    language: string;

}


/* *
 *
 *  Default Export
 *
 * */

export default LocalizationOptions;
