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
    SecurityDetailsMetadata
} from '../../SecurityDetails/SecurityDetailsOptions';
import SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';
import { getBreakdown } from '../SharedSecurityDetails';

/* *
 *
 *  Class
 *
 * */


export class IndustryBreakdownConverter extends MorningstarConverter {


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
            ...(options?.hasMultiple && { ids: [] }),
            ...(options?.hasMultiple && { isins: [] })
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
            table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            security = userOptions.json as SecurityDetailsJSON.SecurityDetailsResponse,
            hasMultiple = options.hasMultiple;

        // Update table
        const id = security.Id,
            isin = security.Isin,
            industryBreakdown = security.Portfolios[0].IndustryBreakdown;

        getBreakdown(
            id,
            industryBreakdown,
            table,
            'IndustryBreakdown',
            !!hasMultiple
        );

        // Update meta data
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


export default IndustryBreakdownConverter;

