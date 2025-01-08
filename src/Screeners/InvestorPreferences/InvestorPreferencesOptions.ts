/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
 *  Imports
 *
 * */

import type {
    MorningstarConverterOptions,
    MorningstarMetadata,
    MorningstarOptions
} from '../../Shared/MorningstarOptions';


/* *
 *
 *  API Options
 *
 * */


export interface InvestorPreferencesConverterOptions extends MorningstarConverterOptions {

    // Nothing to add yet.

}


export interface InvestorPreferencesOptions extends MorningstarOptions {
    /**
     *
     * When true, returns are calculated using extended performance/Track Record
     * Extension."
     *
     */
    applyTrackRecordExtension?: boolean;
    /**
     *
     * A list of calculated data points that is used to determinate whether
     * a security matches investor preferences.
     *
     */
    calculatedDataPoints?: Array<CalculatedDataPoint>;

    //converter?: InvestorPreferencesConverterOptions;
    /**
     *
     * ISO alpha-3 country code.
     *
     */
    countryId?: string;
    /**
     *
     * ISO alpha-3 currency code.
     * The currency to be used for calculated data points such as performance
     * returns. To return list of securities with a specific base currency,
     * you must pass the following filter in the request:
     * CURRENCY:EQ:{currency code}. For example: Currency:EQ:EUR. See the
     * Filters section for more information.
     *
     */
    currencyId?: string;
    /**
     *
     * A list of filter data points. Custom data points can be configured. See
     * Filters for information about how to get a list of filter data points.
     *
     */
    filterDataPoints?: string[];
    /**
     *
     * A list of criteria a security must meet to be included in the results.
     *
     */
    filters?: InvestorPreferencesFilter[];
     /**
     *
     * When true, returns will not be calculated using the restructure date.
     *
     */
    ignoreRestructure?: boolean;
    /**
     *
     * ISO culture codes.
     * If not provided, defaults to the language defined in the settings.
     *
     */
    languageId?: string;
    /**
     *
     * The number of output pages.
     *
     */
    page?: number;
    /**
     *
     *  The number of rows per page.
     *
     */
    pageSize?: number;
    /**
     *
     * A list of security data points to return in the response.
     *
     */
    securityDataPoints?: Array<string>;
    /**
     *
     * Data points to sort on and the order in which results are sorted
     *
     */
    sortOrder?: string;
    /**
     *
     * Search string to use to search for securities by name, identifiers, or
     * symbols. Can be used with filter to run a combined search.
     *
     */
    term?: string;
    /**
     *
     * A list of investment universe identifiers to query. Values may end with
     * `:1` to signify that a custom universe is not only client funds.
     *
     */
    universeIds: Array<string>;
};

export interface CalculatedDataPoint {
    /**
     *
     * Name of the calculated data point. This data point is returned
     * in the response.
     *
     */
    name: string;
    /**
     *
     *  Object containing the conditions that a security must meet to align
     *  with an investor’s preferences.
     *
     */
    condition: CalculatedDataPointCondition;
};

export interface CalculatedDataPointCondition {
    /**
     *
     * Array of fields objects that define the criteria to use when searching
     * for securities. A security must meet all the criteria defined in the
     * `and` object to be considered aligned with an investor’s preferences.
     *
    */
    and: Array<CalculatedDataPointConditionField>;
    /**
     *
     * Array of fields objects that define the criteria to use when searching
     * for securities. A security must meet at least one of the criteria
     * defined in the `or` object to be considered aligned with
     * an investor’s preferences.
     *
     */
    or: Array<CalculatedDataPointConditionField>;
};

export interface CalculatedDataPointConditionField {
    /** Data point that condition is applied to. */
    name: string;
    /** Conditional operator to use. */
    op: ConditionalOperator;
    /** Value to base condition calculation on.	*/
    value: string|number;
};

export type ConditionalOperator = (
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
);

export interface InvestorPreferencesFilter {
    /** The data point to filter on. */
    dataPointId: string;
    /** The comparator to use. */
    comparatorCode: ComparatorCode;
    /** The value to compare against. */
    value: any;
}

export type ComparatorCode = (
    | 'IN'
    | 'NIN'
    | 'EQ'
    | 'NE'
    | 'GT'
    | 'GTN'
    | 'GTE'
    | 'GTEN'
    | 'LT'
    | 'LTN'
    | 'LTE'
    | 'LTEN'
    | 'CONTAINS'
    | 'BTW'
    | 'STARTSWITH'
);

export interface InvestorPreferencesMetadata extends MorningstarMetadata {
    page?: number;
    total?: number;
    pageSize?: number;
    calculatedDataPointNames?: string[];
};


/* *
 *
 *  Default Export
 *
 * */


export default InvestorPreferencesOptions;
