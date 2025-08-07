import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayPerformance);

const loadingLabel = document.getElementById('loading-label');

async function displayPerformance (postmanJSON) {
    const connector = new HighchartsConnectors.Morningstar.PerformanceConnector({
        postman: {
            environmentJSON: postmanJSON
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

    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Portfolio Calendar Year Returns'
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
        series: [{
            name: 'Portfolio',
            data: connector.dataTables.TrailingReturns.getRows(
                void 0,
                void 0,
                ['Id', 'Value']
            )
        }, {
            name: 'Benchmark',
            data: connector.dataTables.TrailingReturns.getRows(
                void 0,
                void 0,
                ['Id', 'Value_Benchmark']
            )
        }]
    });

    loadingLabel.style.display = 'none';
}
