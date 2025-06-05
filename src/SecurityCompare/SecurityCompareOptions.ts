import {
    SecurityDetailsConverterType
} from '../SecurityDetails/SecurityDetailsOptions';
import type {
    MorningstarOptions,
    MorningstarSecurityOptions,
    MorningstarMetadata
} from '../Shared/MorningstarOptions';

interface SecurityCompareSecurity extends Omit <MorningstarSecurityOptions, 'id'> {
    /**
     * Security identifiers.
     */
    ids: Array<string>
}

export interface SecurityCompareOptions extends MorningstarOptions {
    /**
     * Security to retrieve.
     */
    security: SecurityCompareSecurity,
    /**
     * Unique identifier of a view.
     * Set of fields representing a data set or scenario.
     * Defines the data points to return in the response.
     *
     * @default 'MFsnapshot'
     */
    viewIds?: string,
    /**
     * Converter options.
     */
    converters?: SecurityDetailsConverterType[]
}

export interface SecurityDetailsMetadata extends MorningstarMetadata {
    id?: string;
    isin?: string;
    ids?: string[];
    isins?: string[];
    domicile?: string;
    currency?: string;
    returnType?: string;
    type?: string;
    currencyId?: string;
    date?: string;
}
