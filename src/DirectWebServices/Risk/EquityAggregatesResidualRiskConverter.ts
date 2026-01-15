/* *
 *
 *  (c) 2009-2026 Highsoft AS
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
import { EquityAggregatesResidualRisk } from './EquityAggregatesResidualRiskOptions';

import type {
    EquityAggregatesResidualRiskConverterOptions,
    EquityAggregatesResidualRiskConverterMetadata
} from './EquityAggregatesResidualRiskOptions';

/* *
 *
 *  Class
 *
 * */

export class EquityAggregatesResidualRiskConverter extends MorningstarConverter {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options?: EquityAggregatesResidualRiskConverterOptions
    ) {
        super(options);

        // Create main data tables
        this.tables = [
            new DataTable({ id: 'AggregatesRiskMonthly' })
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

    public readonly metadata: EquityAggregatesResidualRiskConverterMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override parse (
        options: EquityAggregatesResidualRiskConverterOptions
    ): void {
        const table = this.tables[0],
            metadata = this.metadata,
            userOptions = { ...this.options, ...options },
            json = userOptions.json,
            id = json.identifiers.performanceId,
            riskData = json.aggregationResidualRiskAndReturnSensitivity[0];

        if (riskData) {
            const { periodEndDate, numberOfCompanies } = riskData;

            EquityAggregatesResidualRisk.months.forEach((month, index) => {
                // Month type value
                table.setCell('Type', index, month);

                EquityAggregatesResidualRisk.riskMetrics.forEach((metric) => {
                    // For dividend
                    let category = `${metric.toLocaleLowerCase()}${month}`;

                    // Get the value of a metric
                    let data = riskData[`${category}Value`];
                    if (data !== undefined) {
                        table.setCell(metric, index, data);
                    }

                    // Get the number of companies for a metric
                    data = riskData[`${category}NumberOfEligibleCompanies`];
                    if (data !== undefined) {
                        table.setCell(`${metric}Companies`, index, data);
                    }

                    // For non-dividend
                    category = `${metric}${month}`;

                    // Get the value of a metric for non-dividend
                    data = riskData[`nonDividend${category}Value`];
                    if (data !== undefined) {
                        table.setCell(`NonDividend${metric}`, index, data);
                    }

                    // Get the number of companies of a metric for non-dividend
                    data = riskData[`nonDividend${category}NumberOfEligibleCompanies`];
                    if (data !== undefined) {
                        table.setCell(`NonDividend${metric}Companies`, index, data);
                    }
                });
            });

            // Set metadata for risk related table
            table.metadata = {
                performanceId: id
            };

            if (periodEndDate) {
                table.metadata.periodEndDate = periodEndDate;
            }

            if (numberOfCompanies) {
                table.metadata.numberOfCompanies = numberOfCompanies;
            }

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

export default EquityAggregatesResidualRiskConverter;
