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

export type FieldMappingEntry = {
    pattern: RegExp;
    superSector: string[];
    primarySector: string[];
    secondarySector: string[];
    suffixes: string[];
    column: string;
    [key: string]: any;
};

export type FieldsMapping = {
    fixdInc: FieldMappingEntry;
    fixedInc: FieldMappingEntry;
    surveyedFixedInc: FieldMappingEntry;
};

/* *
 *
 *  Namespace
 *
 * */

namespace FixedIncomeSectorsBreakdownJSON {

    export interface Response extends InvestmentResponse {
        morningstarFixedIncomeSectorsBreakdown: MorningstarFixedIncomeSectorsBreakdownItem;
    }

    export interface MorningstarFixedIncomeSectorsBreakdownItem {
        [key: string]: number | string;
    }
}

export default FixedIncomeSectorsBreakdownJSON;
