/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Dalek
 *
 * */

'use strict';

/* *
 *
 *  Namespace
 *
 * */

export namespace SectorsBreakdown {

    /* *
    *
    *  Interfaces
    *
    * */

    export interface InvestmentResponse {
        identifiers: {
            performanceId: string;
        };
        metadata: InvestmentMetadata;
    }

    export interface InvestmentMetadata {
        requestId: string;
        time: string;
        messages?: Array<Message>;
    }

    export interface Message {
        type: string;
        investments?: Array<InvestmentMessage>;
    }

    export interface InvestmentMessage {
        id?: string;
        idType?: string;
        status?: string;
        datapointId?: Array<string>;
        errorCode?: string;
    }

    /* *
     *
     *  Constants
     *
     * */

    export const superSectors = [
        'Cyclical',
        'Defensive',
        'Sensitive'
    ];

    export const sectors = [
        'BasicMaterials',
        'ConsumerCyclical',
        'FinancialServices',
        'RealEstate',
        'ConsumerDefensive',
        'Healthcare',
        'Utilities',
        'Communication Services',
        'Energy',
        'Industrials',
        'Technology'
    ];

    export const sectorTypes = [
        'SuperSector',
        'PrimarySector',
        'SecondarySector',
        'SecondrySector'
    ];

    export const suffixes = [
        'PercLong',
        'PercLongRescaled',
        'PercShort',
        'PercNet'
    ];

    export const suffixesFiperc = [
        'CalcLongFiperc',
        'CalcNetFiperc',
        'CalcShortFiperc'
    ];

}

/* *
 *
 *  Default Export
 *
 * */

export default SectorsBreakdown;
