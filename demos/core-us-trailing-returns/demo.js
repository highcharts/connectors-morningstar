import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayPerformance);

const loadingLabel = document.getElementById('loading-label');

async function displayPerformance (postmanJSON) {
    const connector = new HighchartsConnectors.Morningstar.PerformanceConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironment']
        },
        requestSettings: {
            outputCurrency: 'USD',
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
                        securityId: 'FOUSA05H5F',
                        type: 'FO',
                        weight: 50
                    },
                    {
                        securityId: 'FOUSA04BCR',
                        type: 'FO',
                        weight: 50
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

    const periods = {
        YearToDate: 'Year to Date',
        Month3: '3 Months',
        Month6: '6 Months',
        Year1: '1 Year',
        Year2: '2 Years',
        Year3: '3 Years',
        Year5: '5 Years',
        Year10: '10 Years',
        SinceInception: 'Since Inception'
    };

    const portfolioData = connector.dataTables.TrailingReturns.getRows(
        void 0,
        void 0,
        ['Id', 'Value']
    ).map(([period, value]) => [periods[period], value]);

    const benchmarkData = connector.dataTables.TrailingReturns.getRows(
        void 0,
        void 0,
        ['Id', 'Value_Benchmark']
    ).map(([period, value]) => [periods[period], value]);

    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Portfolio Trailing Returns'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Returns (%)'
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [
            {
                name: 'Portfolio',
                data: portfolioData
            },
            {
                name: 'Benchmark',
                data: benchmarkData
            }
        ]
    });

    loadingLabel.style.display = 'none';
}
