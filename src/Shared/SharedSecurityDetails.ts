/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


/* *
 *
 * Imports
 *
 * */

import {
    AssetAllocationsConverter,
    TrailingPerformanceConverter,
    RegionalExposureConverter,
    GlobalStockSectorBreakdownConverter,
    CountryExposureConverter,
    PortfolioHoldingsConverter,
    MarketCapConverter,
    IndustryBreakdownConverter,
    IndustryGroupBreakdownConverter,
    BondStatisticsConverter,
    MetaConverter,
    StyleBoxBreakdownConverter,
    BondStyleBoxBreakdownConverter,
    CreditQualityBreakdownConverter,
    HistoricalPerformanceSeriesConverter
} from './Converters';
import {
    SecurityDetailsConverterOptions,
    SecurityDetailsConverterType
} from '../SecurityDetails/SecurityDetailsOptions';
import MorningstarConverter from './MorningstarConverter';
import SecurityDetailsJSON from '../SecurityDetails/SecurityDetailsJSON';
import * as External from './External';

/* *
 *
 * Constants
 *
 * */

const DATA_TABLES: { key: SecurityDetailsConverterType }[] = [
    { key: 'AssetAllocations' },
    { key: 'BondStatistics' },
    { key: 'BondStyleBoxBreakdown' },
    { key: 'CountryExposure' },
    { key: 'CreditQualityBreakdown' },
    { key: 'GlobalStockSectorBreakdown' },
    { key: 'HistoricalPerformanceSeries' },
    { key: 'IndustryBreakdown' },
    { key: 'IndustryGroupBreakdown' },
    { key: 'MarketCap' },
    { key: 'Meta' },
    { key: 'PortfolioHoldings' },
    { key: 'RegionalExposure' },
    { key: 'StyleBoxBreakdown' },
    { key: 'TrailingPerformance' }
];


/* *
 *
 * Interfaces
 *
 * */

export interface SecurityDetailsConverter extends MorningstarConverter {
    parse(options: SecurityDetailsConverterOptions): void;
}

/* *
 *
 * Functions
 *
 * */

export function initConverter (
    converter?: SecurityDetailsConverterOptions,
    hasMultiple?: boolean
): SecurityDetailsConverter {

    switch (converter?.type) {
        case 'TrailingPerformance':
        default:
            return new TrailingPerformanceConverter({
                ...converter,
                hasMultiple
            });

        case 'AssetAllocations':
            return new AssetAllocationsConverter({
                ...converter,
                hasMultiple
            });

        case 'RegionalExposure':
            return new RegionalExposureConverter({
                ...converter,
                hasMultiple
            });

        case 'GlobalStockSectorBreakdown':
            return new GlobalStockSectorBreakdownConverter({
                ...converter,
                hasMultiple
            });

        case 'CountryExposure':
            return new CountryExposureConverter({
                ...converter,
                hasMultiple
            });

        case 'PortfolioHoldings':
            return new PortfolioHoldingsConverter({
                ...converter,
                hasMultiple
            });

        case 'MarketCap':
            return new MarketCapConverter({
                ...converter,
                hasMultiple
            });

        case 'IndustryBreakdown':
            return new IndustryBreakdownConverter({
                ...converter,
                hasMultiple
            });

        case 'IndustryGroupBreakdown':
            return new IndustryGroupBreakdownConverter({
                ...converter,
                hasMultiple
            });

        case 'CreditQualityBreakdown':
            return new CreditQualityBreakdownConverter({
                ...converter,
                hasMultiple
            });

        case 'BondStatistics':
            return new BondStatisticsConverter({
                ...converter,
                hasMultiple
            });

        case 'Meta':
            return new MetaConverter({
                ...converter,
                hasMultiple
            });

        case 'StyleBoxBreakdown':
            return new StyleBoxBreakdownConverter({
                ...converter,
                hasMultiple
            });
        case 'BondStyleBoxBreakdown':
            return new BondStyleBoxBreakdownConverter({
                ...converter,
                hasMultiple
            });
        case 'HistoricalPerformanceSeries':
            return new HistoricalPerformanceSeriesConverter({
                ...converter,
                hasMultiple
            });

    }
}


export const getBreakdown = (
    id: string,
    breakdown: SecurityDetailsJSON.GenericBreakdownType[],
    table: External.DataTable,
    hasMultiple: boolean
) => {
    if (!breakdown || breakdown.length === 0) {
        return;
    }

    const columnStrPostfix = hasMultiple ? `_${id}` : '',
        colStrType = 'Type' + columnStrPostfix,
        notClassifiedStr = 'NotClassified' + columnStrPostfix;

    table.setColumn(colStrType);
    table.setColumn(notClassifiedStr);

    for (let i = 0; i < breakdown.length; i++) {
        const { SalePosition, NotClassified, BreakdownValues } = breakdown[i],
            colStrAsset = SalePosition + columnStrPostfix;

        table.setColumn(colStrAsset);
        // Populate NotClassified for all assets.
        table.setCell(notClassifiedStr, i, NotClassified);

        for (let j = 0; j < BreakdownValues.length; j++) {
            const { Type, Value } = BreakdownValues[j];

            table.setCell(colStrType, j, Type);
            table.setCell(colStrAsset, j, Value);
        }
    }
};

export const pickConverters = (
    converter?: SecurityDetailsConverterOptions,
    converters?: SecurityDetailsConverterType[]
): Array<{ key: SecurityDetailsConverterType }> => {
    // Create multi data table based on user-selected converters,
    // otherwise use all available.

    if (converters?.length) {
        const matchingTables = DATA_TABLES.filter(dt => converters.includes(dt.key));
        return matchingTables.length ? matchingTables : DATA_TABLES;
    }
    if (converter?.type) return [{ key: converter.type }]; // Backwards compatibility

    return DATA_TABLES;
};
