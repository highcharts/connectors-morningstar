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
} from '../../SecurityDetails/SecurityDetailsOptions';
import SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';

/* *
 *
 *  Class
 *
 * */


export class TrailingPerformanceConverter extends MorningstarConverter {


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
            columns: {},
            ...(options && options.hasMultiple && { ids: [] }),
            ...(options && options.hasMultiple && { isins: [] })
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
            security = userOptions.json as SecurityDetailsJSON.SecurityDetailsResponse,
            hasMultiple = options.hasMultiple;


        // Create table
        const id = security.Id,
            isin = security.Isin,
            timePeriodColumnStr = 'TrailingPerformance_TimePeriod' + (hasMultiple ? `_${id}` : ''),
            valueColumnStr = 'TrailingPerformance_Value' + (hasMultiple ? `_${id}` : '');

        table.setColumn(timePeriodColumnStr);
        table.setColumn(valueColumnStr);

        ids.push(id);
        isins.push(isin);

        const trailingPerformanceReturn = security.TrailingPerformance[0].Return;

        for (let i = 0, iEnd = trailingPerformanceReturn.length; i < iEnd; ++i) {
            table.setCell(
                timePeriodColumnStr,
                i,
                trailingPerformanceReturn[i].TimePeriod
            );
            table.setCell(
                valueColumnStr,
                i,
                trailingPerformanceReturn[i].Value
            );
        }

        // Update metadata
        if (hasMultiple){
            metadata.ids?.push(id);
            metadata.isins?.push(isin);
        } else {
            metadata.id = id;
            metadata.isin = isin;
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default TrailingPerformanceConverter;
