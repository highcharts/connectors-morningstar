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
    CreditQualityBreakdownConverter
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

    }
}


export const getBreakdown = (
    id: string,
    breakdown: SecurityDetailsJSON.GenericBreakdownType[],
    table: External.DataTable,
    colName: string,
    hasMultiple: boolean
) => {
    if (!breakdown || breakdown.length === 0) {
        return;
    }

    const colStrType = `${colName}_Type` + (hasMultiple ? `_${id}` : ''),
        notClassifiedStr = `${colName}_NotClassified` + (hasMultiple ? `_${id}` : ''),
        assetStr = `${colName}_Assets` + (hasMultiple ? `_${id}` : '');

    table.setColumn(colStrType);
    table.setColumn(assetStr);
    table.setColumn(notClassifiedStr);

    for (let i = 0; i < breakdown.length; i++) {
        const asset = breakdown[i];
        const colStrAsset =
            `${colName}_${asset.SalePosition}` + (hasMultiple ? `_${id}` : '');
        table.setColumn(colStrAsset);

        // Populate NotClassified for all assets.
        table.setCell(assetStr, i, asset.SalePosition);
        table.setCell(notClassifiedStr, i, asset.NotClassified);

        for (let j = 0; j < asset.BreakdownValues.length; j++) {
            table.setCell(
                colStrAsset,
                j,
                asset.BreakdownValues[j].Value
            );

            table.setCell(
                colStrType,
                j,
                asset.BreakdownValues[j].Type
            );
        }
    }
};

export const pickConverters = (
    converter?: SecurityDetailsConverterOptions,
    converters?: SecurityDetailsConverterType[]
): Array<{ key: SecurityDetailsConverterType }> => {
    let convertersToUse: Array<{ key: SecurityDetailsConverterType }>;

    // Create multi data table based on user-selected converters,
    // otherwise use all available.
    if (converters?.length) {
        convertersToUse = DATA_TABLES.filter(dt => converters.includes(dt.key));
    } else if (converter?.type) { // Backwards compatibility
        convertersToUse = [{ key: converter.type }];
    } else {
        convertersToUse = DATA_TABLES;
    }

    return convertersToUse;
};
