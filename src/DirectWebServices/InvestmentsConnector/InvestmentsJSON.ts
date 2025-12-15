/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
 *  Interfaces
 *
 * */

export interface InvestmentResponse {
    identifiers: {
        performanceId: string;
    };
    metadata: {
        requestId: string;
        time: string;
        messages?: Array<Message>;
    };
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
