import type {
    MorningstarConverterOptions,
    MorningstarMetadata,
    MorningstarOptions
} from '../../Shared/MorningstarOptions';
export interface InvestmentScreenerOptions extends MorningstarOptions {
    applyTrackRecordExtension?: boolean;
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
     */
    currencyId?: string;
    /**
     *
     * A list of filter data points.
     * Multiple values must be separated by a pipe character ( | ) URL-encoded
     * as “%7C”. In a UI screening tool, these values define the filters that
     * are seen on the screen. Custom data points can be configured. See
     * Filters for information about how to get a list of filter data points.
     */
    filterDataPoints?: string[];
    /**
     *
     * A list of criteria a security must meet to be included in the results.
     */
    filters?: InvestmentScreenerFilter[];
    /**
     *
     * When true returns will not be calculated using the restructure date.
     *
     */
    ignoreRestructure?: boolean;
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
    securityDataPoints?: SecurityDataPointType[];
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
    universeIds: string[];
}

export interface InvestmentScreenerFilter {
    /** The data point to filter on. */
    dataPointId: string;
    /** The comparator to use. */
    comparatorCode: ComparatorCode;
    /** The value to compare against. */
    value: any;
}

export interface InvestmentScreenerMetadata extends MorningstarMetadata {
    page?: number;
    total?: number;
    pageSize?: number;
}

export interface InvestmentScreenerConverterOptions
    extends MorningstarConverterOptions {
    // Nothing to add yet
}

export type ComparatorCode =
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
    | 'STARTSWITH';

export type SecurityDataPointType = string;

export default InvestmentScreenerOptions;
