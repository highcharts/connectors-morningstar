import { SecurityDetailsConverterOptions } from '../SecurityDetails/SecurityDetailsOptions';
import type {
    MorningstarOptions,
    MorningstarSecurityOptions
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
    converter?: SecurityDetailsConverterOptions
}
