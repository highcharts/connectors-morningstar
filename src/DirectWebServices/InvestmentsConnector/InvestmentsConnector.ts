/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


'use strict';


/* *
*
*  Imports
*
* */


import DWSConnector from '../DWSConnector';
import {
    createRequests,
    initConverter,
    pickConverters
} from '../Shared/SharedDWSInvestments';

import type { InvestmentsConverterType, InvestmentsOptions } from './InvestmentsOptions';

/* *
 *
 *  Class
 *
 * */


export class InvestmentsConnector extends DWSConnector {

    /**
     *
     * Static Properties
     *
     */

    protected static readonly defaultOptions: InvestmentsOptions = {
        id: 'morningstar-investments-connector',
        type: 'MorningstarInvestmentsConnector'
    };

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options: InvestmentsOptions
    ) {
        const convertersToUse = pickConverters(options.converters);

        options = {
            ...InvestmentsConnector.defaultOptions,
            ...options,
            dataTables: convertersToUse
        };

        super(options);
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: InvestmentsOptions;

    /* *
     *
     *  Functions
     *
     * */

    public override async load (): Promise<any> {
        const { converters, security } = this.options;

        if (!converters) {
            // eslint-disable-next-line no-console
            throw new Error('No converters object found.');
        }

        if (!security?.id) {
            // eslint-disable-next-line no-console
            throw new Error('No security ID found.');
        }

        this.requests = createRequests(this.dataTables, converters, security);

        await super.load();

        for (const responseObject of this.responses) {
            const [type, response] =
                Object.entries(responseObject)[0] as [InvestmentsConverterType, Response];

            const json: unknown = await response?.json();
            const converter = initConverter(type);

            converter.parse({ json });

            this.dataTables[type].setColumns(converter.getTable().getColumns());

            this.metadata.rawResponses.push({ type, json });
        }
    }
}

/* *
 *
 *  Default Export
 *
 * */


export default InvestmentsConnector;
