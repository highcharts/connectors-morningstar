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


import InvestmentDetailsConnector from '../../InvestmentDetailsConnector';
import InvestmentDetailsOptions from '../../InvestmentDetailsOptions';


/* *
 *
 *  Class
 *
 * */


export class FakeConnector extends InvestmentDetailsConnector {
    public constructor (
        options: InvestmentDetailsOptions
    ) {
        super(options);

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: InvestmentDetailsOptions;

    /* *
     *
     *  Functions
     *
     * */

    public override async load (): Promise<any> {
        this.url = '/0P00000FIA/asset-Allocation-Breakdown';

        await super.load();

        const json = await this.response?.json() as unknown;

        // eslint-disable-next-line no-console
        console.log(json);
    }
}

/* *
 *
 *  Default Export
 *
 * */


export default FakeConnector;
