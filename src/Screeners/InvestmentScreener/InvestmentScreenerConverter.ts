/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Lysy
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type { InvestmentScreenerConverterOptions, InvestmentScreenerMetadata } from './InvestmentScreenerOptions';

import MorningstarConverter from '../../Shared/MorningstarConverter';
import InvestmentScreenerJSON from './InvestmentScreenerJSON';

/* *
 *
 *  Class
 *
 * */

export class InvestmentScreenerConverter extends MorningstarConverter {
    public constructor (options?: InvestmentScreenerConverterOptions) {
        super(options);

        this.metadata = {
            columns: {}
        };
    }
    /* *
     *
     *  Properties
     *
     * */

    public path: string;

    public readonly metadata: InvestmentScreenerMetadata;

    /* *
     *
     *  Functions
     *
     * */

    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    public parse (options: InvestmentScreenerConverterOptions): void {
        const metadata = this.metadata;
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!InvestmentScreenerJSON.isInvestmentScreenerResponse(json)) {
            throw new Error('Invalid data');
        }

        // Prepare table
        table.deleteColumns();
        const rows = json.rows;
        if (rows.length > 0) {
            const row = rows[0];
            for (const element of Object.keys(row)) {
                table.setColumn(`InvestmentScreeeer_${element}`);
            }

            for (let i = 0; i < rows.length; i++) {
                for (const [key, val] of Object.entries(rows[i])) {
                    table.setCell(
                        `InvestmentScreeeer_${key}`,
                        i,
                        `InvestmentScreeeer_${val}`
                    );
                }
            }
            metadata.page = json.page;
            metadata.total = json.total;
            metadata.pageSize = json.pageSize;
        }
    }
}

/* *
 *
 *  Default Export
 *
 * */

export default InvestmentScreenerConverter;
