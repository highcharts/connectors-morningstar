import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {

    const connector = new HighchartsConnectors.Morningstar.HypoPerformanceConnector({
        postman: {
            environmentJSON: postmanJSON
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
                illustrationTrailingTimePeriod: 'EarliestCommon',
                startDate: '1998-12-31T00:00:00.000Z',
                endDate: '2008-12-31T00:00:00.000Z',
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

    loadingLabel.style.display = 'none';
}
