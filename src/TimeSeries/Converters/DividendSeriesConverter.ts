/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import TimeSeriesConverter from '../TimeSeriesConverter';
import { DividendSeriesOptions } from '../TimeSeriesOptions';
import TimeSeriesJSON from '../TimeSeriesJSON';


/* *
 *
 *  Declarations
 *
 * */


interface Dividend {
    CurrencyId: string;
    Id: string;
    EndDate: number;
    Value: number;
}


/* *
 *
 *  Class
 *
 * */


export class DividendSeriesConverter extends TimeSeriesConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: DividendSeriesOptions = { type: 'Dividend' }
    ) {
        super(options);

        this.options = options as Required<DividendSeriesOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<DividendSeriesOptions>;

    public override path: string = 'timeseries/dividend';


    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: DividendSeriesOptions
    ): void {
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const includeCurrency = userOptions.includeCurrency;
        const json = userOptions.json;

        // Validate JSON

        if (!TimeSeriesJSON.isTimeSeriesResponse(json)) {
            throw new Error('Invalid data');
        }

        // Cumulate security dividends by date

        const securityIds: Array<string> = [];
        const sortedDividends: Array<Dividend> = [];

        for (const security of json.Security) {

            if (!security.DividendSeries) {
                continue;
            }

            securityIds.push(security.Id);

            for (const history of security.DividendSeries) {
                for (const detail of history.HistoryDetail) {
                    sortedDividends.push({
                        CurrencyId: detail.Value[0].CurrencyId,
                        EndDate: Date.parse(detail.EndDate),
                        Id: security.Id,
                        Value: parseFloat(detail.Value[0].value)
                    });
                }
            }

        }

        // Sort dividends by date

        sortedDividends.sort((a, b) => (
            a.EndDate === b.EndDate ?
                0 :
                a.EndDate < b.EndDate ? -1 : 1
        ));

        // Reset table

        table.deleteColumns();
        table.setColumn('Date');

        for (const securityId of securityIds) {
            table.setColumn(securityId);
            if (includeCurrency) {
                table.setColumn(`${securityId}_Currency`);
            }
        }

        // Add dividends to table

        let currentTableDate: number = 0;
        let currentTableIndex: number = -1;

        for (const dividend of sortedDividends) {
            if (currentTableDate !== dividend.EndDate) {
                currentTableDate = dividend.EndDate;
                table.setCell('Date', ++currentTableIndex, currentTableDate);
            }
            table.setCell(dividend.Id, currentTableIndex, dividend.Value);
            if (includeCurrency) {
                table.setCell(`${dividend.Id}_Currency`, currentTableIndex, dividend.CurrencyId);
            }
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default DividendSeriesConverter;
