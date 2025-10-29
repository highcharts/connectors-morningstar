import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';

export async function HypoPerformanceConnectorLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.HypoPerformanceConnector({
        id: '',
        type: '',
        api: {
            ...api,
            url: 'https://www.us-api.morningstar.com/'
        },
        viewId: 'Growth',
        requestSettings: {
            outputCurrency: 'USD',
            outputReturnsFrequency: 'Monthly',
            assetClassGroupConfigs: {
                assetClassGroupConfig: [
                    {
                        id: 'ACG-USBROAD'
                    }
                ]
            },
            hypoCalculationSettings: {
                hypoType: 'Portfolio',
                filingStatus: 'NoTaxes',
                taxableIncome: 50000,
                payTaxes: 'OutOfPocket',
                federalIncomeTaxRate: 0,
                capitalGainTaxRate: 0,
                stateIncomeTaxRate: 0,
                dividendTaxRate: 0,
                illustrationTrailingTimePeriod: 'Customized',
                startDate: '1998-12-31T00:00:00.000Z',
                endDate: '1999-12-31T00:00:00.000Z',
                synchronizePortfolioStartDate: true,
                investmentDetailReturnsFrequency: 'Monthly',
                liquidateOnEndDate: true,
                subsequentInvestmentType: 'Invest',
                subsequentInvestmentAmount: 0,
                subsequentInvestmentWithdrawalFrequency: 'Monthly',
                assetBasedAnnualFee: 0,
                assetFeeFrequency: 'Annually',
                assetFeeType: 'Amount',
                payFees: 'OutOfPocketBeginning',
                payFeesUseCashFirst: true,
                frontLoadType: 'Standard',
                customFeeType: 'Amount',
                salesFeeAmount: 0,
                applySalesCharge: true,
                applyFeeForRebalance: false,
                entryExitFeeType: 'CustomEntry',
                rebalanceFrequency: 'None',
                rebalanceThreshold: 0,
                reinvestDividends: true,
                reinvestCapitalGains: true,
                portfolioAmountFee: 1000
            }
        },
        portfolios: [
            {
                name: 'TestPortfolio1',
                totalValue: 10000,
                currency: 'USD',
                holdings: [
                    {
                        securityId: 'F00000VCTT',
                        weight: 20
                    },
                    {
                        securityId: '0P00002NW8',
                        weight: 10
                    },
                    {
                        tradingSymbol: 'AAPL',
                        weight: 15
                    },
                    {
                        isin: 'US09251T1034',
                        weight: 35
                    },
                    {
                        cusip: '256219106',
                        weight: 20
                    }
                ],
                benchmark: {
                    type: 'Standard',
                    holdings: [
                        {
                            securityId: 'XIUSA04G92',
                            type: 'XI',
                            weight: 100
                        }
                    ]
                }
            }
        ]
    });

    Assert.ok(
        connector instanceof MC.HypoPerformanceConnector,
        'Connector should be instance of HypoPerformanceConnector class.'
    );

    await connector.load();

    const expectedGrowthData = [
        'Date',
        'Id',
        'Value',
        'Value_Benchmark',
        'Value_NetAmountInvested'
    ];
    const actualGrowthData = connector.dataTables.Growth.getColumnIds();

    Assert.deepStrictEqual(
        expectedGrowthData.sort(),
        actualGrowthData.sort(),
        'GrowthConverter should return expected column names.'
    );

    Assert.ok(connector.dataTables.Growth.getRowCount() > 0,
        'Growth converter should not return empty rows.'
    );
}
