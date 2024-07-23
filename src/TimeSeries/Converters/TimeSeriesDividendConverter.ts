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
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import MorningstarConverter from '../../Shared/MorningstarConverter';
import { TimeSeriesDividendOptions } from '../TimeSeriesOptions';
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


export class TimeSeriesDividendConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor(
        options?: TimeSeriesDividendOptions
    ) {
        super(options);

        this.options = options as Required<TimeSeriesDividendOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<TimeSeriesDividendOptions>;

    /* *
     *
     *  Functions
     *
     * */


    public parse(
        options: TimeSeriesDividendOptions
    ): void {
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!TimeSeriesJSON.isResponse(json)) {
            throw new Error('Invalid data');
        }

        // Cumulate security dividends by date

        const securityIds: Array<string> = [];
        const sortedDividends: Array<Dividend> = [];

        for (const security of json.TimeSeries.Security) {

            if (!security.DividendSeries) {
                continue;
            }

            securityIds.push(security.Id);

            for (const history of security.DividendSeries) {
                for (const detail of history.HistoryDetail) {
                    sortedDividends.push({
                        CurrencyId: detail.Value.CurrencyId,
                        EndDate: Date.parse(detail.EndDate),
                        Id: security.Id,
                        Value: parseFloat(detail.Value.value)
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
            table.setColumn(`${securityId}_CID`);
        }

        // Add dividends to table

        let currentTableDate: number = 0;
        let currentTableIndex: number = 0;

        for (const dividend of sortedDividends) {
            if (currentTableDate !== dividend.EndDate) {
                currentTableDate = dividend.EndDate;
                table.setCell('Date', ++currentTableIndex, currentTableDate);
            }
            table.setCell(dividend.Id, currentTableIndex, dividend.Value);
            table.setCell(`${dividend.Id}_CID`, currentTableIndex, dividend.CurrencyId);
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesDividendConverter;
