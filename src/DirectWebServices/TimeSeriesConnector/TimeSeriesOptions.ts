/* *
 *
 *  (c) 2009-2026 Highsoft AS
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

import { DataConnectorMetadata } from '../../Shared/External';
/* *
 *
 *  Imports
 *
 * */

import type { MorningstarConverterOptions, MorningstarOptions, MorningstarSecurityOptions } from '../../Shared/MorningstarOptions';

/* *
 *
 *  API Options
 *
 *
 * */

export interface DWSTimeSeriesConverterMetadata extends DataConnectorMetadata {
    rawResponse: Array<unknown>;
}

export interface DWSTimeSeriesConverterOptions extends MorningstarConverterOptions {

}

export interface TimeSeriesConnectorOptions extends MorningstarOptions {

    /**
     * Category of time series to retrieve the data from.
     */
    category: TimeSeriesCategory;

    /**
     * Endpoint to call from given category.
     */
    dataPoint: string;

    /**
     * Security IDs to retrieve time series for. Up to 25 securities can be
     * requested in a single query.
     */
    ids: Pick<MorningstarSecurityOptions, 'id' | 'idType'>[];

    /**
     * Filters results by the base currency of each investment. Accepts a
     * comma-separated list of 3-character ISO 4217 currency codes. Values
     * must align with `ids`. Use empty entries to skip (omit trailing
     * commas after the last non-empty value). Example: `,USD,,USD`.
     */
    baseCurrency?: string;

    /**
     * Filters results by domicile (3-character ISO 3166-1 codes). Values
     * must align with `ids`. Use empty entries to skip. Example: `,USA,,GBR`.
     */
    domicile?: string;

    /**
     * Filters results by exchange country (3-character ISO 3166-1 codes).
     * Values must align with `ids`. Use empty entries to skip. Example:
     * `,CAN,CAN`.
     */
    exchangeCountry?: string;

    /**
     * Filters results by exchange ID. See the Data Dictionary for accepted
     * values. Values must align with `ids`. Use empty entries to skip.
     * Example: `EX$$$$XMEX`.
     */
    exchangeId?: string;

    /**
     * Specifies the time interval between data points.
     *
     * @default 'daily'
     */
    frequency?: string;

    /**
     * Start date of the time series in `yyyy-MM-dd` format.
     */
    startDate?: string;

    /**
     * End date of the time series in `yyyy-MM-dd` format.
     */
    endDate?: string;

    /**
     * Specifies the size of the time window for the data range.
     * When `timePeriod` & `timePeriodUnit` are set, they are prioritized
     * over `startDate` & `endDate` params.
     */
    timePeriod?: number;

    /**
     * Specifies the `timePeriod` unit. When `timePeriod` & `timePeriodUnit` are
     * set, they are prioritized over `startDate` & `endDate` params.
     */
    timePeriodUnit?: 'months'|'days'|'years';

    /**
     * If `true`, adjusts the start date to the latest inception date among
     * the requested investments so that all returned series align on a
     * common earliest date.
     * @default false
     */
    applyEarliestCommonDate?: boolean;

    /**
     * If `true`, applies the Track Record Extension logic to extend the
     * performance of an investment by copying historical performance from a
     * qualified older investment.
     * @default false
     */
    applyTrackRecordExtension?: boolean;

    /**
     * If `true`, considers the Morningstar or custom restructure date when
     * determining the start of the performance period. Only applies when
     * `applyEarliestCommonDate` is `true`.
     * @default false
     */
    applyRestructureDate?: boolean;

    /**
     * If `true`, sets the time range from inception (or the maximum
     * supported lookback) to the end date. Overrides `timePeriod`/`timePeriodUnit`
     * and `startDate`/`endDate`.
     * @default false
     */
    sinceInception?: boolean;

    /**
     * Specifies the currency in which to return data. Example values:
     * `AUD, BAS, BND, BRL, CAD, CHF, ...`. See the API docs / Data Dictionary
     * for the full list of accepted currency codes.
     */
    currencyId?: string;
}

type TimeSeriesCategory =
    'corporate-actions' |
    'fees-expenses' |
    'fund-sustainability' |
    'fund-research' |
    'performance' |
    'portfolio-analytics' |
    'portfolio-holdings' |
    'reference';
