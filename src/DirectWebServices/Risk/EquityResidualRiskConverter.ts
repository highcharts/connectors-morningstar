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
import { EquityResidualRisk } from './EquityResidualRiskOptions';

import type {
    EquityResidualRiskConverterOptions,
    EquityResidualRiskConverterMetadata
} from './EquityResidualRiskOptions';

/* *
 *
 *  Class
 *
 * */

export class EquityResidualRiskConverter extends MorningstarConverter {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options?: EquityResidualRiskConverterOptions
    ) {
        super(options);

        // Create main data tables
        this.tables = [
            new DataTable({ id: 'RiskDaily' }),
            new DataTable({ id: 'RiskMonthly' })
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

    public readonly metadata: EquityResidualRiskConverterMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override parse (
        options: EquityResidualRiskConverterOptions
    ): void {
        const tables = this.tables,
            metadata = this.metadata,
            userOptions = { ...this.options, ...options },
            json = userOptions.json,
            id = json.identifiers.performanceId,
            monthlyRiskData = {
                ...json.dividendResidualRiskAndReturnSensitivity,
                ...json.nonDividendResidualRiskAndReturnSensitivity
            },
            dailyRiskData = {
                ...json.dailyDividendResidualRiskAndReturnSensitivity[0],
                ...json.dailyNonDividendResidualRiskAndReturnSensitivity[0]
            };

        function setRisk (
            riskData: { [key: string]: number | string; },
            table: DataTable,
            timeUnits: string[]
        ): void {
            if (riskData) {
                const { asOfDate, compareIndexId } = riskData;

                timeUnits.forEach((unit, index) => {
                    // Month type value
                    table.setCell('Type', index, unit);

                    EquityResidualRisk.riskMetrics.forEach((metric) => {
                        // Get the value of a metric
                        let data = riskData[`${metric.charAt(0).toLowerCase() + metric.slice(1)}${unit}`];
                        if (data !== undefined) {
                            table.setCell(metric, index, data);
                        }

                        // Get the value of a metric for non-dividend
                        data = riskData[`nonDividend${metric}${unit}`];
                        if (data !== undefined) {
                            table.setCell(`NonDividend${metric}`, index, data);
                        }
                    });
                });

                // Set metadata for risk related table
                table.metadata = {
                    performanceId: id
                };

                if (asOfDate) {
                    table.metadata.asOfDate = asOfDate;
                }

                if (compareIndexId) {
                    table.metadata.compareIndexId = compareIndexId;
                }
            }
        }

        // Set Daily Risk
        setRisk(dailyRiskData, tables[0], EquityResidualRisk.days);

        // Set Monthly Risk
        setRisk(monthlyRiskData, tables[1], EquityResidualRisk.months);

        // Converter metadata
        metadata.performanceId = id;

        if (json.metadata.messages?.length) {
            metadata.messages = json.metadata.messages;
        }
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default EquityResidualRiskConverter;
