import type LocalizationOptions from '../Shared/LocalizationOptions';
import MorningstarOptions, { MorningstarConverterOptions, MorningstarSecurityOptions } from "../Shared/MorningstarOptions";
import RNANewsJSON from './RNANewsJSON';

export interface RNANewsOptions extends RNANewsConverterOptions, MorningstarOptions {

    /**
   * Security to retrieve.
   */
    security?: MorningstarSecurityOptions;

    /**
   * The start date of the time series.
   * Should be either a UNIX timestamp,
   * or a string formatted as `yyyy-MM-dd`.
   */
    startDate?: number | string;

    /**
   * The end date of the time series.
   * Should be either a UNIX timestamp,
   * or a string formatted as `yyyy-MM-dd`.
   */
    endDate?: number | string;

    /**
   * The maximum number of announcements to load.
   */
    maxStories?: number;

    /**
   * Localization options.
   */
    localization?: LocalizationOptions;

}

export interface RNANewsConverterOptions extends MorningstarConverterOptions {
    json?: RNANewsJSON.Response
}

/* *
 *
 *  Default Export
 *
 * */

export default RNANewsOptions;