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

    const dataTable = connector.getTable('TrailingReturns');

    dataTable.setColumn(
        'Name',
        dataTable.getColumn('Id').map(id => periods[id] || id)
    );

    Highcharts.chart('container', {
        dataTable,
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
                dataMapping: {
                    name: 'Name',
                    y: 'Value'
                }
            },
            {
                name: 'Benchmark',
                dataMapping: {
                    name: 'Name',
                    y: 'Value_Benchmark'
                }
            }
        ]
    });

    loadingLabel.style.display = 'none';
}
