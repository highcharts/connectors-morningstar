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

/* *
 *
 *  Namespace
 *
 * */

namespace SectorsBreakdownJSON {

    export interface Response extends InvestmentResponse {
        morningstarEquitySectorsBreakdown: MorningstarEquitySectorsBreakdownItem;
    }

    export interface MorningstarEquitySectorsBreakdownItem {
        [key: string]: number | string;
    }
}

export default SectorsBreakdownJSON;
