/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
    SecurityCompareConverterOptions,
    SecurityCompareMetadata
} from '../SecurityCompareOptions';
import SecurityCompareJSON from '../SecurityCompareJSON';
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
        options?: SecurityCompareConverterOptions
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
        options: SecurityCompareConverterOptions
    ): void {
        const metadata = this.metadata;
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON
        if (!SecurityCompareJSON.isSecurityCompareResponse(json)) {
            throw new Error('Invalid data');
        }
        
        // Prepare table

        table.deleteColumns();

        // Add trailing performance to table

        if (json.length) {
            let timePeriodColumnStr,
                valueColumnStr;
            const metaIds = [],
                metaIsins = [];
            // Update table
            for (let i = 0; i < json.length; i++) {
                const securityCompare = json[i],
                    id = securityCompare.Id,
                    isin = securityCompare.Isin;
                timePeriodColumnStr = `TrailingPerformance_TimePeriod_${id}`;
                valueColumnStr = `TrailingPerformance_Value_${id}`;
                table.setColumn(timePeriodColumnStr);
                table.setColumn(valueColumnStr);

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
                metaIds.push(id);
                metaIsins.push(isin);
            }

            metadata.ids = metaIds;
            metadata.isins = metaIsins;
        }

    }
}


/* *
 *
 *  Default Export
 *
 * */


export default TrailingPerformanceConverter;
