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
 *  - Pawel Lysy
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
    SecurityDetailsMetadata,
    SecurityCompareMetadata
} from '../SecurityDetailsOptions';
import SecurityDetailsJSON from '../SecurityDetailsJSON';
import SecurityDetailsConverter from '../SecurityDetailsConverter';

/* *
 *
 *  Class
 *
 * */


export class TrailingPerformanceConverter extends SecurityDetailsConverter {


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


    public readonly metadata: SecurityDetailsMetadata;


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
        let isCompare = false;

        // Validate JSON
        if (!SecurityDetailsJSON.isSecurityDetailsResponse(json)) {
            throw new Error('Invalid data');
        }
        
        // Prepare table

        table.deleteColumns();

        if (!json.length) {
            return;
        }

        if (json.length > 1) {
            isCompare = true;
        }

        // Update table
        for (let i = 0; i < json.length; i++) {
            const securityCompare = json[i],
                id = securityCompare.Id,
                isin = securityCompare.Isin,
                timePeriodColumnStr = 'TrailingPerformance_TimePeriod' + (isCompare? `_${id}` : ''),
                valueColumnStr = 'TrailingPerformance_Value' + (isCompare? `_${id}` : '');

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

        if (isCompare){
            (metadata as SecurityCompareMetadata).ids = ids;
            (metadata as SecurityCompareMetadata).isins = isins;
        } else {
            metadata.id = ids[0];
            metadata.isin = isins[0];
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default TrailingPerformanceConverter;
