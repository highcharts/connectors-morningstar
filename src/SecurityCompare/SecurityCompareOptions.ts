import {
    SecurityDetailsConverterOptions,
    SecurityDetailsConverterType
} from '../SecurityDetails/SecurityDetailsOptions';
import type {
    MorningstarOptions,
    MorningstarSecurityOptions,
    MorningstarMetadata
} from '../Shared/MorningstarOptions';
import type SecurityDetailsJSON from '../SecurityDetails/SecurityDetailsJSON';

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
    /**
     * Backward compatibility option for the old converter type.
     */
    converter?: SecurityDetailsConverterOptions;
}
export interface SecurityCompareMetadata extends MorningstarMetadata {
    ids?: string[];
    isins?: string[];
    json: SecurityDetailsJSON.SecurityDetailsResponse;
}
