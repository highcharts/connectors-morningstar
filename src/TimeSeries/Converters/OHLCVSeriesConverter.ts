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


import TimeSeriesConverter, { FetchMultipleBehaviour } from '../TimeSeriesConverter';
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
    Value: [open: number, high: number, low: number, close: number, value: number];
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

    public override securitiesFetchBehaviour: FetchMultipleBehaviour = 'iterate';

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

        if (!TimeSeriesJSON.isMultipleSeriesOHLCVSeriesResponse(json)) {
            throw new Error('Invalid data');
        }

        // Cumulate OHLCV items by date

        const securityIds: Array<string> = [];
        const sortedOHLCVItems: Array<OHLCV> = [];

        for (const security of json) {

            if (!security.value) {
                continue;
            }

            securityIds.push(security.id);

            for (const ohlcvItem of security.value) {
                sortedOHLCVItems.push({
                    Id: security.id,
                    Date: ohlcvItem[0],
                    Value: [ohlcvItem[1], ohlcvItem[2], ohlcvItem[3], ohlcvItem[4], ohlcvItem[5]]
                });
            }

        }

        // Sort OHLCV items by date

        sortedOHLCVItems.sort((a, b) => (
            a.Date === b.Date ?
                0 :
                a.Date < b.Date ? -1 : 1
        ));

        // Reset table

        table.deleteColumns();

        ['Id', 'Date', 'Open', 'High', 'Low', 'Close', 'Value']
            .forEach(columnName => table.setColumn(columnName));

        // Add OHLCV items to table

        for (const ohlcvItem of sortedOHLCVItems) {
            table.setRow(
                [ohlcvItem.Id, ohlcvItem.Date, ...ohlcvItem.Value]
            );
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
