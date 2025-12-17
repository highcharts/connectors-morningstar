import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayEquitySectorsBreakdown, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayEquitySectorsBreakdown (postmanJSON) {

    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
        },
        security: {
            id: '0P00006W6Q'
        },
        converters: {
            EquityStyleBox: {}
        }
    });

    await connector.load();

    // eslint-disable-next-line no-unused-vars
    const table = connector.getTable('StockStyle');

    Highcharts.chart('container', {
        chart: {
            type: 'heatmap'
        },
        title: {
            text: 'Equity Style Box'
        },
        subtitle: {
            text: `Stock Style (${table.metadata.performanceId})`,
            align: 'left'
        },
        xAxis: {
            categories: ['Value', 'Blend', 'Growth'],
            lineWidth: 0,
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
                text: ''
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
        colorAxis: {
            dataClasses: [{
                from: 49,
                color: '#014ce5',
                name: '50+'
            }, {
                from: 24,
                to: 49,
                color: '#487cea',
                name: '25-49'
            }, {
                from: 9,
                to: 24,
                color: '#acc2f3',
                name: '10-24'
            }, {
                from: 0,
                to: 9,
                color: '#fafafa',
                name: '0-9'
            }]
        },
        tooltip: {
            // pointFormat:
            //     '<b> {series.yAxis.categories.(point.y)}
            //     {series.xAxis.categories.(point.x)}</b>: {point.value}%'
        },
        series: [{
            name: 'Portfolio Weight',
            borderWidth: 1,
            borderColor: '#e5e7e9',
            keys: ['x', 'y', 'value'],
            data: table.getRows(0, 9),
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
