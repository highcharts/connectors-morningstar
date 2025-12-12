import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayHypoGrowth);

const loadingLabel = document.getElementById('loading-label');

async function displayHypoGrowth (postmanJSON) {

    const connector = new HighchartsConnectors.Morningstar.HypoPerformanceConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironment']
        },
        viewId: 'Growth',
        requestSettings: {
            outputCurrency: 'USD',
            outputReturnsFrequency: 'Monthly',
            assetClassGroupConfigs: {
                assetClassGroupConfig: [
                    {
                        Id: 'ACG-USBROAD'
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
                startDate: '2020-01-01',
                endDate: '2025-01-31',
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

    await connector.load();

    Highcharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Portfolio Hypothetical Growth'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%b %Y'
            }
        },
        yAxis: {
            title: {
                text: 'Holding (USD)'
            }
        },
        tooltip: {
            valueSuffix: 'USD'
        },
        series: [{
            name: 'Portfolio',
            data: connector.dataTables.Growth.getRows(
                void 0,
                void 0,
                ['Date', 'Value']
            ).slice(0, -1) // A known issue with trailing 0's in the data
        }, {
            name: 'Benchmark',
            data: connector.dataTables.Growth.getRows(
                void 0,
                void 0,
                ['Date', 'Value_Benchmark']
            ).slice(0, -1) // A known issue with trailing 0's in the data
        }, {
            name: 'Net Invested',
            data: connector.dataTables.Growth.getRows(
                void 0,
                void 0,
                ['Date', 'Value_NetAmountInvested']
            ).slice(0, -1) // A known issue with trailing 0's in the data
        }]
    });

    loadingLabel.style.display = 'none';
}
