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


import type {
    MorningstarAPIOptions,
    MorningstarPostmanOptions
} from './MorningstarOptions';

import PostmanEnvironment from './PostmanEnvironment';


/* *
 *
 *  Namespace
 *
 * */


export namespace MorningstarPostman {


    /* *
     *
     *  Functions
     *
     * */


    export async function getAPIOptions (
        options: MorningstarPostmanOptions = {}
    ): Promise<(MorningstarAPIOptions|undefined)> {

        if (options.environmentJSON) {
            return getAPIOptionsFromPostmanEnvironment(
                PostmanEnvironment.fromJSON(options.environmentJSON)
            );
        }
        if (options.environmentURL) {
            return getAPIOptionsFromPostmanEnvironment(
                await PostmanEnvironment.fromURL(options.environmentURL)
            );
        }

        return {};
    }


    function getAPIOptionsFromPostmanEnvironment (
        postmanEnvironment: PostmanEnvironment
    ): MorningstarAPIOptions {
        const apiOptions: MorningstarAPIOptions = {};

        const password = postmanEnvironment.getValueOf('Morningstar as a Service Password');
        const url = postmanEnvironment.getValueOf(/^Morningstar as a Service \(/u);
        const username = postmanEnvironment.getValueOf('Morningstar as a Service Username');

        if (password && username) {
            apiOptions.access = {
                password: password.value,
                username: username.value
            };
            if (url) {
                apiOptions.access.url = `https://${url.value}`;
            }
        }

        if (url) {
            apiOptions.url = url.value;

            if (apiOptions.url.startsWith('www.')) {
                apiOptions.url = `https://${apiOptions.url}`;
            }
        }

        return apiOptions;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MorningstarPostman;
