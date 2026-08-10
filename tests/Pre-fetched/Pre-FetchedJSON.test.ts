import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';
import * as MCDWS from '../../code/connectors-morningstar-dws.src';

export async function securityDetailsPreFetchedJSONLoad (): Promise<void> {
    const originalFetch = window.fetch;

    window.fetch = async (): Promise<Response> => {
        throw new Error('Network call should not happen when pre-fetched JSON is loaded.');
    };

    try {
        const connector = new MC.SecurityDetailsConnector({
            api: {
                json: [{
                    Currency: { Id: 'USD' },
                    Id: 'SECURITY_ID',
                    Isin: 'SECURITY_ISIN',
                    TrailingPerformance: [{
                        Return: [{
                            Date: '2026-01-01',
                            TimePeriod: '1M',
                            Value: 1.25
                        }],
                        ReturnType: 'Nav',
                        Type: 'DayEnd'
                    }]
                }]
            },
            converters: ['TrailingPerformance'],
            id: '',
            security: {
                id: 'F0GBR050DD',
                idType: 'MSID'
            },
            type: ''
        });

        await connector.load();

        Assert.strictEqual(connector.metadata.id, 'SECURITY_ID');

        Assert.ok(
            connector instanceof MC.SecurityDetailsConnector,
            'Connector should be instance of SecurityDetailsConnector class.'
        );

        Assert.deepStrictEqual(
            connector.dataTables.TrailingPerformance.getColumnIds(),
            ['Nav_DayEnd_TimePeriod', 'Nav_DayEnd_Date', 'Nav_DayEnd_Value'],
            'TrailingPerformance table should have expected columns.'
        );

        Assert.ok(
            connector.dataTables.TrailingPerformance.getRowCount() > 0,
            'TrailingPerformance table should not be empty.'
        );

        Assert.strictEqual(
            connector.dataTables.TrailingPerformance.getCell('Nav_DayEnd_Value', 0),
            1.25,
            'TrailingPerformance first value should match pre-fetched payload.'
        );
    } finally {
        window.fetch = originalFetch;
    }
}

export async function multiRequestTypePreFetchedJSONLoad (): Promise<void> {
    const originalFetch = window.fetch;

    window.fetch = async (): Promise<Response> => {
        throw new Error('Network call should not happen when pre-fetched JSON is loaded.');
    };

    try {
        const connector = new MCDWS.InvestmentsConnector({
            api: {
                json: {
                    AssetAllocationBreakdown: {
                        assetAllocationBreakdown: {
                            assetAllocCashPercLong: 4.49556,
                            assetAllocEquityPercLong: 95.50442,
                            canAssetAllocCanadianEquityPercLong: 2.01286,
                            underlyingInstrumentStockPercent: 95.50445
                        },
                        identifiers: {
                            performanceId: '0P00000FIA'
                        },
                        metadata: {}
                    },
                    CountryAndRegionExposure: {
                        countryAndRegionalExposureBreakdown: {
                            equityRegionAmericasPercLongRescaled: 55.728,
                            equityRegionNorthAmericaPercLongRescaled: 55.292,
                            equityCountryUnitedStatesPercLongRescaled: 53.18442
                        },
                        identifiers: {
                            performanceId: '0P00000FIA'
                        },
                        metadata: {}
                    },
                    EquityAggregatesResidualRisk: {
                        aggregationResidualRiskAndReturnSensitivity: [{
                            nonDividendAlpha36MonthValue: 0.42
                        }],
                        identifiers: {
                            performanceId: '0P00000FIA'
                        },
                        metadata: {}
                    }
                }
            },
            id: '',
            security: {
                id: '0P00000FIA'
            },
            converters: {
                AssetAllocationBreakdown: {},
                CountryAndRegionExposure: {},
                EquityAggregatesResidualRisk: {}
            },
            type: ''
        });

        await connector.load();

        Assert.ok(
            connector instanceof MCDWS.InvestmentsConnector,
            'Connector should be instance of InvestmentsConnector class.'
        );

        Assert.ok(
            connector.getTable('AssetAlloc').getRowCount() > 0,
            'AssetAlloc table should not be empty.'
        );
        Assert.ok(
            connector.getTable('RegionEquity').getRowCount() > 0,
            'RegionEquity table should not be empty.'
        );
        Assert.ok(
            connector.getTable('EquityAggregatesResidualRisk').getRowCount() > 0,
            'EquityAggregatesResidualRisk table should not be empty.'
        );

        Assert.strictEqual(
            connector.getTable('AssetAlloc').getCell('Long', 1),
            4.49556,
            'AssetAlloc cash long value should match pre-fetched payload.'
        );
    } finally {
        window.fetch = originalFetch;
    }
}
