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

        options = (options instanceof Array ? options : [options]);

        for (const security of options) {
            id = (id ? `${id}|${security.id}` : id);
            idType = (idType ? `${idType}|${security.idType}` : idType);
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
