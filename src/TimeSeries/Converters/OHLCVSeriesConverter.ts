/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Eskil Gjerde Sviggum
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import TimeSeriesConverter from '../TimeSeriesConverter';
import { OHLCVSeriesOptions } from '../TimeSeriesOptions';
import TimeSeriesJSON from '../TimeSeriesJSON';
import MorningstarURL from '../../Shared/MorningstarURL';


/* *
 *
 *  Declarations
 *
 * */


interface OHLCV {
    Id: string;
    Date: number;
    Value: [open: number, high: number, low: number, close: number, volume: number];
}


/* *
 *
 *  Class
 *
 * */


export class OHLCVSeriesConverter extends TimeSeriesConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: OHLCVSeriesOptions = { type: 'OHLCV' }
    ) {
        super(options);

        this.options = options as Required<OHLCVSeriesOptions>;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly options: Required<OHLCVSeriesOptions>;

    public override path: string = 'timeseries/ohlcv';

    /* *
     *
     *  Functions
     *
     * */


    public parse (
        options: OHLCVSeriesOptions
    ): void {
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!TimeSeriesJSON.isCompactJSONOHLCVResponse(json)) {
            throw new Error('Invalid data');
        }

        // Cumulate OHLCV items by date

        const securityIds: Array<string> = userOptions.securities?.map(security => security.id) ?? [];
        const sortedOHLCVItems: Array<OHLCV> = [];

        for (const ohlcvItem of json) {
            const [date, /* Open */ , /* High */, /* Low */, close, volume] = ohlcvItem;
            let [/* Date */, open, high, low] = ohlcvItem;


            if (volume === 0 && userOptions.replaceZeroWithCloseValue) {
                open = close;
                high = close;
                low  = close;
            }

            sortedOHLCVItems.push({
                Id: securityIds[0],
                Date: date,
                Value: [open, high, low, close, volume]
            });
        }

        // Sort OHLCV items by date

        sortedOHLCVItems.sort((a, b) => (
            a.Date === b.Date ?
                0 :
                a.Date < b.Date ? -1 : 1
        ));

        // Reset table

        table.deleteColumns();

        const valueColumns = ['Open', 'High', 'Low', 'Close', 'Volume'];

        table.setColumn('Date');

        for (const securityId of securityIds) {
            for (const columnName of valueColumns) {
                table.setColumn(`${securityId}_${columnName}`);
            }
        }


        // Add OHLCV items to table

        let currentTableDate: number = 0;
        let currentTableIndex: number = -1;

        for (const ohlcvItem of sortedOHLCVItems) {
            if (currentTableDate !== ohlcvItem.Date) {
                currentTableDate = ohlcvItem.Date;
                table.setCell('Date', ++currentTableIndex, currentTableDate);
            }
            for (const i in ohlcvItem.Value) {
                const column = `${ohlcvItem.Id}_${valueColumns[i]}`;
                const value = ohlcvItem.Value[i];
                table.setCell(column, currentTableIndex, value);
            }
        }

    }

    public override decorateURL (url: MorningstarURL) {
        url.searchParams.set('outputType', 'compactjson');
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default OHLCVSeriesConverter;
