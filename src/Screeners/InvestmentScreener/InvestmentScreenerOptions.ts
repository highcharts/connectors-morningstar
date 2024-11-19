import type {
    MorningstarConverterOptions,
    MorningstarMetadata,
    MorningstarOptions
} from '../../Shared/MorningstarOptions';
export interface InvestmentScreenerOptions extends MorningstarOptions {
    applyTrackRecordExtension?: boolean;
    countryId?: string;
    currencyId?: string;
    filterDataPoints?: string[];
    filters?: InvestmentScreenerFilter[];
    ignoreRestructure?: boolean;
    page?: number;
    pageSize?: number;
    securityDataPoints?: SecurityDataPointType[];
    sortOrder?: string;
    term?: string;
    universeIds: string[];
}

export interface InvestmentScreenerFilter {
    dataPointId: string;
    comparatorCode: ComparatorCode;
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
