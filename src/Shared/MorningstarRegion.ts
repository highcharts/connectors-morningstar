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
 *  Namespace
 *
 * */


export namespace MorningstarRegion {


    /* *
     *
     *  Declarations
     *
     * */


    export type Name = ('Americas'|'APAC'|'EMEA');
    type RegexGroups = {
        lang: string;
        region?: string;
    };


    /* *
     *
     *  Constants
     *
     * */


    const countriesAmericas = [
        'AG', 'AI', 'AR', 'AW', 'BB', 'BL', 'BM', 'BO', 'BQ', 'BR', 'BS', 'BZ', 'CA', 'CL', 'CO',
        'CR', 'CU', 'CW', 'DM', 'DO', 'EC', 'FK', 'GD', 'GF', 'GP', 'GS', 'GT', 'GY', 'HN', 'HT',
        'JM', 'KN', 'KY', 'LC', 'MF', 'MQ', 'MS', 'MX', 'NI', 'PA', 'PE', 'PM', 'PR', 'PY', 'SR',
        'SV', 'UM', 'US', 'UY', 'VC', 'VE', 'VG', 'VI'
    ];


    const countriesEMEA = [
        'AD', 'AE', 'AL', 'AM', 'AO', 'AT', 'AX', 'BA', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BW',
        'BY', 'CD', 'CF', 'CG', 'CH', 'CI', 'CM', 'CV', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DZ', 'EE',
        'EG', 'EH', 'ER', 'ES', 'ET', 'EU', 'FI', 'FO', 'FR', 'GA', 'GB', 'GE', 'GG', 'GH', 'GI',
        'GL', 'GM', 'GN', 'GQ', 'GR', 'GW', 'HR', 'HU', 'IE', 'IL', 'IM', 'IQ', 'IR', 'IS', 'IT',
        'JE', 'JO', 'KE', 'KW', 'LB', 'LI', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD',
        'ME', 'MG', 'MK', 'ML', 'MR', 'MT', 'MW', 'MZ', 'NA', 'NE', 'NG', 'NL', 'NO', 'OM', 'PL',
        'PS', 'PT', 'QA', 'RO', 'RS', 'RW', 'SA', 'SC', 'SD', 'SE', 'SI', 'SJ', 'SK', 'SL', 'SM',
        'SN', 'SO', 'SS', 'ST', 'SX', 'SY', 'SZ', 'TD', 'TF', 'TG', 'TN', 'TR', 'TZ', 'UA', 'UG',
        'VA', 'YE', 'ZA', 'ZM', 'ZW'
    ];


    export const baseURLs: Record<Name, string> = {
        Americas: 'https://www.us-api.morningstar.com/',
        APAC: 'https://www.apac-api.morningstar.com/',
        EMEA: 'https://www.emea-api.morningstar.com/'
    };


    /* *
     *
     *  Functions
     *
     * */


    export function detect (): Name {
        const regex =
            /^(?<lang>[\w]{2})(?:-(?<region>[\w]{2})(?:-[\w]{2,8})*|-[\w]{3,}(?:-[\w]{2,8})*)?$/u;
        const match = window.navigator.language.toUpperCase().match(regex);

        if (!match) return 'Americas';

        const { lang, region } = match.groups as RegexGroups;
        const country = region ?? lang;

        if (country) {
            if (countriesAmericas.includes(country)) {
                return 'Americas';
            }
            if (countriesEMEA.includes(country)) {
                return 'EMEA';
            }
            return 'APAC';
        }

        return 'Americas';
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarRegion;
