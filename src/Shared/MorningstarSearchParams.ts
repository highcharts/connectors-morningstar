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


export class MorningstarSearchParams extends URLSearchParams {


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
    public setDate(
        name: ('endDate'|'startDate'),
        date: (number|string)
    ): MorningstarSearchParams {
        const dateTime = (
            typeof date === 'number' ?
                new Date(date) :
                new Date(Date.parse(date))
        );

        this.set(name, dateTime.toISOString().substring(0, 10));

        return this;
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
    public setLocalizationOptions(
        options: LocalizationOptions
    ): MorningstarSearchParams {

        this.set(
            'languageId', (
                options.language.toLowerCase() +
                '-' +
                options.country.toUpperCase()
            )
        );

        return this;
    }


    /**
     * Sets `id` and `idType` based on given security options.
     *
     * @param options
     * Security options to set.
     *
     * @return
     * The modified search parameters as reference.
     */
    public setSecurityOptions(
        options: Array<MorningstarSecurityOptions>
    ): MorningstarSearchParams {
        let id: string = this.get('id') || '';
        let idType: string = this.get('idType') || '';

        for (const security of options) {
            id = (id ? `${id}|${security.id}` : security.id);
            idType = (idType ? `${idType}|${security.idType}` : security.idType);
        }

        this.set('id', id);
        this.set('idType', idType);

        return this;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarSearchParams;
