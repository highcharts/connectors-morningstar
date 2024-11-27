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
    SecurityDetailsMetadata
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
        const metadata = this.metadata;
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!SecurityDetailsJSON.isSecurityDetailsResponse(json)) {
            throw new Error('Invalid data');
        }

        // Prepare table

        table.deleteColumns();
        table.setColumn('SecurityDetails_TrailingPerformance_TimePeriod');
        table.setColumn('SecurityDetails_TrailingPerformance_Value');

        // Add trailing performance to table

        if (json.length) {

            // Update table

            const securityDetails = json[0];
            const trailingPerformanceReturn = securityDetails.TrailingPerformance[0].Return;

            for (let i = 0, iEnd = trailingPerformanceReturn.length; i < iEnd; ++i) {
                table.setCell(
                    'SecurityDetails_TrailingPerformance_TimePeriod',
                    i,
                    trailingPerformanceReturn[i].TimePeriod
                );
                table.setCell(
                    'SecurityDetails_TrailingPerformance_Value',
                    i,
                    trailingPerformanceReturn[i].Value
                );
            }

            // Update meta data

            metadata.id = securityDetails.Id;
            metadata.isin = securityDetails.Isin;
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default SecurityDetailsConverter;
