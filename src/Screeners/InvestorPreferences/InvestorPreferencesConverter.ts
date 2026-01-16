/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Jedrzej Ruta
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type {
    InvestorPreferencesConverterOptions,
    InvestorPreferencesMetadata
} from './InvestorPreferencesOptions';
import type { DataTable } from '@highcharts/dashboards/dashboards';

import MorningstarConverter from '../../Shared/MorningstarConverter';
import InvestorPreferencesJSON from './InvestorPreferencesJSON';

/* *
 *
 *  Class
 *
 * */

export class InvestorPreferencesConverter extends MorningstarConverter {
    public constructor (options?: InvestorPreferencesConverterOptions) {
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

    public readonly metadata: InvestorPreferencesMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public parse (options: InvestorPreferencesConverterOptions): void {
        const metadata = this.metadata;
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        if (!InvestorPreferencesJSON.isInvestorPreferencesResponse(json)) {
            throw new Error('Invalid data');
        }
        table.deleteColumns();
        const rows = json.rows;
        if (rows.length > 0) {
            const row = rows[0];
            for (const element of Object.keys(row)) {
                table.setColumn(`InvestorPreferences_${element}`);
            }

            for (let i = 0; i < rows.length; i++) {
                for (const [key, val] of Object.entries(rows[i])) {
                    table.setCell(
                        `InvestorPreferences_${key}`,
                        i,
                        val as DataTable.CellType
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

export default InvestorPreferencesConverter;
