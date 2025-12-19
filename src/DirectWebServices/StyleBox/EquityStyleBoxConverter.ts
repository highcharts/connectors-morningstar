/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Dalek
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import MorningstarConverter from '../../Shared/MorningstarConverter';
import { DataTable } from '../../Shared/External';
import { STYLE_BOX_VALUES } from '../../Shared/Utilities';

import type { EquityStyleBoxConverterOptions, EquityStyleBoxConverterMetadata } from './EquityStyleBoxOptions';

/* *
 *
 *  Class
 *
 * */

export class EquityStyleBoxConverter extends MorningstarConverter {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options?: EquityStyleBoxConverterOptions
    ) {
        super(options);

        // Create main data tables
        this.tables = [
            new DataTable({ id: 'StockStyle' }),
            new DataTable({ id: 'TimeSeries' })
        ];

        this.metadata = {
            columns: {}
        };
    }

    /* *
     *
     *  Properties
     *
     */

    public readonly metadata: EquityStyleBoxConverterMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override parse (
        options: EquityStyleBoxConverterOptions
    ): void {
        const tables = this.tables,
            metadata = this.metadata,
            userOptions = { ...this.options, ...options },
            json = userOptions.json,
            id = json.identifiers.performanceId,
            stockStyle = json.stockStyle;

        // Prepare classic style box with initial values
        const styleBoxValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        if (stockStyle) {
            const stockTable = tables[0],
                timeTable = tables[1],
                styleBoxRecord = stockStyle[0];

            // Set the classic style box x and y placement
            stockTable.setColumn('Style', STYLE_BOX_VALUES.X);
            stockTable.setColumn('Size', STYLE_BOX_VALUES.Y);

            // Check which one should be set to 100%
            styleBoxValues[styleBoxRecord.styleBox.code - 1] = 100;

            // Set the classic style box for the latest value
            stockTable.setColumn('Value', styleBoxValues);

            // Save specific values for the reference in StockTable metadata
            const { styleBox, growthScore, valueScore, regionId } = styleBoxRecord;
            stockTable.metadata = {
                performanceId: id,
                effectiveDate: styleBoxRecord.effectiveDate,
                sizeScore: styleBoxRecord.sizeScore,
                styleScore: styleBoxRecord.styleScore,
                styleBoxValue: styleBox.value,
                styleBoxCode: styleBox.code
            };

            if (growthScore) {
                stockTable.metadata.growthScore = growthScore;
            }

            if (valueScore) {
                stockTable.metadata.valueScore = valueScore;
            }

            if (regionId) {
                stockTable.metadata.regionIdValue = regionId.value;
                stockTable.metadata.regionIdCode = regionId.code;
            }

            let index = 0;
            for (const value of Object.values(stockStyle)) {
                const { growthScore, valueScore, regionId } = value;

                // Save date
                timeTable.setCell('Date', index, value.effectiveDate);

                // Save Style Box Value
                timeTable.setCell('StyleBox', index, value.styleBox.value);

                // Save Style Box Code
                timeTable.setCell('StyleBoxCode', index, value.styleBox.code);

                // Save Style Score
                timeTable.setCell('StyleScore', index, value.styleScore);

                // Save Size Score
                timeTable.setCell('SizeScore', index, value.sizeScore);

                // Save Growth Score
                if (growthScore) {
                    timeTable.setCell('GrowthScore', index, growthScore);
                }

                // Save Value Score
                if (valueScore) {
                    timeTable.setCell('ValueScore', index, valueScore);
                }

                // Save Region Value
                if (regionId) {
                    timeTable.setCell('Region', index, regionId.value);
                }

                index++;
            }

            // Time series metadata
            timeTable.metadata = {
                performanceId: id
            };

            // Converter metadata
            metadata.performanceId = id;

            if (json.metadata.messages?.length) {
                metadata.messages = json.metadata.messages;
            }
        }
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default EquityStyleBoxConverter;
