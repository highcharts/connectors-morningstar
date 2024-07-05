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


import MorningstarConnector from '../Shared/MorningstarConnector';
import TimeSeriesConverter from './TimeSeriesConverter';
import TimeSeriesOptions from './TimeSeriesOptions';


/* *
 *
 *  Class
 *
 * */


class TimeSeriesConnector extends MorningstarConnector {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options: TimeSeriesOptions
    ) {
        super(options);

        this.converter = new TimeSeriesConverter(options.converter);
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: TimeSeriesConverter;


}


/* *
 *
 *  Default Export
 *
 * */


export default TimeSeriesConnector;
