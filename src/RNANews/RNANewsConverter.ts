/* *
 *
 *  (c) 2009-2025 Highsoft AS
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

import MorningstarConverter from '../Shared/MorningstarConverter';
import DataConverterUtils from '@highcharts/dashboards/es-modules/Data/Converters/DataConverterUtils';
import RNANewsJSON from './RNANewsJSON';
import { RNANewsConverterOptions } from './RNANewsOptions';
import DataTable from '@highcharts/dashboards/es-modules/Data/DataTable';


/* *
 *
 *  Class
 *
 * */


/**
 * Handles parsing and transformation of RNA news to a table.
 *
 * @private
 */
export class RNANewsConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    /**
     * Constructs an instance of the RNANewsConverter.
     *
     * @param {RNANewsConverterOptions} [options]
     * Options for the converter.
     */
    constructor (
        options: RNANewsConverterOptions = {}
    ) {
        super(options);

        this.columns = [];
        this.header = [];
        this.options = options as Required<RNANewsConverterOptions>;
    }

    /* *
     *
     *  Properties
     *
     * */

    private columns: (string | number)[][];
    private header: string[];

    /**
     * Options for the DataConverter.
     */
    public override readonly options: Required<RNANewsConverterOptions>;

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Initiates the parsing of the RNANews
     *
     * @param {RNANewsConverterOptions} [options]
     * Options for the parser
     *
     */
    public parse (
        options: RNANewsConverterOptions
    ): (boolean|undefined) {

        this.header = ['Day', 'Title', 'Source', 'Type'];
        this.columns = [];

        if (!options.json) {
            return false;
        }

        // Validate JSON

        if (!RNANewsJSON.isResponse(options.json)) {
            throw new Error('Invalid data');
        }

        // Transform rows
        const rows: RNANewsJSON.RNANewsItem[] = [];
        for (const dailyNews of options.json) {
            const day = Number(dailyNews.day);
            const rowsForDay = dailyNews.items.map(
                (newsItem): RNANewsJSON.RNANewsItem => {
                    const [, title, source, type] = newsItem;
                    return [day, title, source, type];
                });
            rows.push(...rowsForDay);
        }

        // Transpose rows into columns.
        const columns: Array<string | number>[] = [];
        for (let column = 0; column < this.header.length; column++) {
            const columnFields: Array<string | number> = [];
            for (let row = 0; row < rows.length; row++) {
                columnFields.push(rows[row][column]);
            }
            columns.push(columnFields);
        }

        this.columns = columns;

        return true;
    }

    /**
     * Handles converting the parsed data to a table.
     *
     * @return {DataTable.ColumnCollection}
     * Table from the parsed RNANews
     */
    public getTableColumns (): DataTable.ColumnCollection {
        return DataConverterUtils.getColumnsCollection(this.columns, this.header);
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default RNANewsConverter;
