/* *
 *
 *  (c) 2009-2026 Highsoft AS
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

import { InvestmentResponse } from '../InvestmentsConnector/InvestmentsJSON';

/* *
 *
 *  Interfaces
 *
 * */

export interface TimeSeriesResponse extends Pick<InvestmentResponse, 'metadata'> {
    investments: Array<TimeSeriesInvestment>;
}

interface TimeSeriesInvestment {
    identifiers: {
        performanceId?: string;
        isin?: string;
        securityId?: string;
        cusip?: string;
        sedol?: string;
        tradingSymbol?: string;
    };
    timeSeries: Array<TimeSeriesJSON>;
    metadata?: {
        exchangeCountry?: string;
        domicile?: string;
        baseCurrency?: string;
    }
}

interface TimeSeriesJSON {
    categories: Array<string>;
    data: Array<TimeSeriesData>;
    dataPoint: string;
    performanceType?: string;
}

interface TimeSeriesData {
    date: string;
    value: number;
}
