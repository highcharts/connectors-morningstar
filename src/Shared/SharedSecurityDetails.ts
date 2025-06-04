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
    MetaConverter
} from './Converters';
import {
    SecurityDetailsConverterOptions
} from '../SecurityDetails/SecurityDetailsOptions';
import MorningstarConverter from './MorningstarConverter';
import SecurityDetailsJSON from '../SecurityDetails/SecurityDetailsJSON';
import * as External from './External';


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

    }
}


export const getBreakdown = (
    id: string,
    breakdown: SecurityDetailsJSON.GenericBreakdownType[],
    table: External.DataTable,
    colName: string,
    hasMultiple: boolean
) => {

    const colStrType = `${colName}_Type` + (hasMultiple ? `_${id}` : ''),
        notClassifiedStr = `${colName}_NotClassified` + (hasMultiple ? `_${id}` : ''),
        assetStr = `${colName}_Assets` + (hasMultiple ? `_${id}` : '');

    table.setColumn(colStrType);
    table.setColumn(assetStr);
    table.setColumn(notClassifiedStr);

    // Early return if no breakdown.
    if (!breakdown || breakdown.length === 0) {
        return;
    }

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
