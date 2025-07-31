import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayXRayUS);

const loadingLabel = document.getElementById('loading-label');

async function displayXRayUS (postmanJSON) {
    const connector = new HighchartsConnectors.Morningstar.XRayUSConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        viewId: 'Snapshot',
        configId: 'Default',
        requestSettings: {
            outputCurrency: 'USD',
            outputReturnsFrequency: 'MonthEnd',
            assetClassGroupConfigs: {
                assetClassGroupConfig: [
                    {
                        id: 'ACG-USBROAD'
                    }
                ]
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
            type: 'column'
        },
        title: {
            text: 'Calendar Year Returns'
        },
        series: [{
            name: 'Actual Returns',
            data: connector.dataTables.TrailingPerformance.getRows(
                void 0,
                void 0,
                ['Nav_DayEnd_TimePeriod', 'Nav_DayEnd_Value']
            )
        }, {
            name: 'Benchmark Returns',
            data: connector.dataTables.TrailingPerformance.getRows(
                void 0,
                void 0,
                ['Nav_DayEnd_TimePeriod', 'Benchmark_Value']
            )
        }],
        xAxis: {
            type: 'category',
            title: {
                text: 'Time Period'
            }
        },
        yAxis: {
            title: {
                text: 'Returns (%)'
            }
        }
    });

    loadingLabel.style.display = 'none';
}
