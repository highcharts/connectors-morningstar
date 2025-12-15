import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayXRayUS);

const loadingLabel = document.getElementById('loading-label');

async function displayXRayUS (postmanJSON) {
    const connector = new HighchartsConnectors.Morningstar.XRayUSConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironment']
        },
        viewId: 'All',
        configId: 'Default',
        requestSettings: {
            outputCurrency: 'USD',
            outputReturnsFrequency: 'MonthEnd',
            ReturnDataSections: ['CorrelationMatrix', 'RollingReturns'],
            assetClassGroupConfigs: {
                assetClassGroupConfig: [
                    {
                        id: 'ACG-USBROAD'
                    }
                ]
            },
            includeGrossNetReturns: true
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
            type: 'heatmap'
        },
        title: {
            text: 'XRay US Equity Style - Example Portfolio',
            align: 'left'
        },
        subtitle: {
            text: 'Stock Style',
            align: 'left'
        },
        colorAxis: {
            dataClasses: [
                { from: 49, color: '#014ce5', name: '50+' },
                { from: 24, to: 49, color: '#487cea', name: '25-49' },
                { from: 9, to: 24, color: '#acc2f3', name: '10-24' },
                { from: 0, to: 9, color: '#fafafa', name: '0-9' }
            ]
        },
        xAxis: {
            categories: ['Value', 'Blend', 'Growth'],
            lineWidth: 0,
            title: {
                text: 'Style'
            },
            gridLineWidth: 0,
            opposite: true,
            labels: {
                style: {
                    fontSize: '1rem',
                    color: '#6e7481'
                }
            }
        },
        yAxis: {
            categories: ['Small', 'Medium', 'Large'],
            gridLineWidth: 0,
            title: {
                text: 'Size'
            },
            labels: {
                rotation: -90,
                style: {
                    fontSize: '1rem',
                    color: '#6e7481'
                }
            }
        },
        legend: {
            layout: 'vertical',
            verticalAlign: 'top',
            align: 'right',
            y: 75,
            symbolRadius: 0,
            itemMarginTop: 9,
            itemMarginBottom: 9
        },
        tooltip: {
            pointFormat: `
                <b> {series.yAxis.categories.(point.y)}
                    {series.xAxis.categories.(point.x)}
                </b>: {point.value}%`
        },
        series: [{
            name: 'Portfolio Weight',
            borderWidth: 1,
            borderColor: '#e5e7e9',
            keys: ['Type', 'value', 'x', 'y'],
            data: connector.dataTables.EquityStyle.getRows(
                void 0, void 0, ['Type', 'Value', 'Style', 'Size']
            ),
            dataLabels: {
                enabled: true,
                format: '{value:.0f}%',
                style: {
                    fontSize: '1rem',
                    textOutline: 'none'
                }
            }
        }]
    });

    loadingLabel.style.display = 'none';
}
