/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Eskil Gjerde Sviggum
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type { MorningstarSecurityOptions } from './MorningstarOptions';
import LocalizationOptions from './LocalizationOptions';


/* *
 *
 *  Class
 *
 * */


/**
 * Extended URL to provide additional functionanility.
 */
export class MorningstarURL extends URL {


    /* *
     *
     *  Functions
     *
     * */


    /**
     * Sets the parameter with the given date.
     *
     * @param name
     * Parameter name to set.
     *
     * @param date
     * JavaScript timestamp or date string.
     *
     * @return
     * The modified search parameters as reference.
     */
    public setDate (
        name: ('endDate'|'startDate'),
        date: (number|string)
    ): void {
        const dateTime = (
            typeof date === 'number' ?
                new Date(date) :
                new Date(Date.parse(date))
        );

        this.searchParams.set(name, dateTime.toISOString().substring(0, 10));

    }


    /**
     * Sets `languageId` based on given localization options.
     *
     * @param options
     * Localization options to set.
     *
     * @return
     * The modified search parameters as reference.
     */
    public setLocalizationOptions (
        options: LocalizationOptions
    ): void {

        this.searchParams.set(
            'languageId', (
                options.language.toLowerCase() +
                '-' +
                options.country.toUpperCase()
            )
        );

    }


    /**
     * Sets `id` and `idType` based on given security options.
     *
     * @param securities
     * Securities options to set.
     *
     * @return
     * The modified search parameters as reference.
     */
    public setSecuritiesOptions (
        securities: Array<MorningstarSecurityOptions>
    ): void {
        const searchParams = this.searchParams;

        let id: string = searchParams.get('id') || '';
        let idType: string = searchParams.get('idType') || '';

        for (const security of securities) {
            id = (id ? `${id}|${security.id}` : security.id);
            idType = (idType ? `${idType}|${security.idType}` : security.idType);
        }

        searchParams.set('id', id);
        searchParams.set('idType', idType);

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarURL;
