/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import {
    SecurityDetailsConverterOptions,
    SecurityCompareMetadata
} from '../../SecurityDetails/SecurityDetailsOptions';
import SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import SecurityCompareConverter from '../SecurityCompareConverter';

/* *
 *
 *  Class
 *
 * */


export class TrailingPerformanceConverter extends SecurityCompareConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: SecurityDetailsConverterOptions
    ) {
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


    public readonly metadata: SecurityCompareMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: SecurityDetailsConverterOptions
    ): void {
        const metadata = this.metadata,
            ids = [],
            isins = [],
            table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            json = userOptions.json;

        // Validate JSON
        if (!SecurityDetailsJSON.isSecurityCompareResponse(json)) {
            throw new Error('Invalid data');
        }
        
        // Prepare table

        table.deleteColumns();

        if (!json.length) {
            return;
        }

        // Update table
        for (let i = 0; i < json.length; i++) {
            const securityCompare = json[i],
                id = securityCompare.Id,
                isin = securityCompare.Isin,
                timePeriodColumnStr = `TrailingPerformance_TimePeriod_${id}`,
                valueColumnStr = `TrailingPerformance_Value_${id}`;

            table.setColumn(timePeriodColumnStr);
            table.setColumn(valueColumnStr);

            ids.push(id);
            isins.push(isin);

            const trailingPerformanceReturn = securityCompare.TrailingPerformance[0].Return;

            for (let j = 0, iEnd = trailingPerformanceReturn.length; j < iEnd; ++j) {
                table.setCell(
                    timePeriodColumnStr,
                    j,
                    trailingPerformanceReturn[j].TimePeriod
                );
                table.setCell(
                    valueColumnStr,
                    j,
                    trailingPerformanceReturn[j].Value
                );
            }
        }

        metadata.ids = ids;
        metadata.isins = isins;

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default TrailingPerformanceConverter;
