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

    const dataTable = connector.getTable('StockStyle'),
        data = dataTable.getRows(0, 9).map((row) => {
            row.push(dataTable.metadata['effectiveDate']);
            row.push(dataTable.metadata['growthScore']);
            row.push(dataTable.metadata['sizeScore']);
            row.push(dataTable.metadata['styleScore']);
            row.push(dataTable.metadata['valueScore']);

            return row;
        });

    Highcharts.chart('container', {
        chart: {
            type: 'heatmap'
        },
        title: {
            text: 'Equity Style Box',
            align: 'left'
        },
        subtitle: {
            text: `Stock Style (${dataTable.metadata.performanceId})`,
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
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: `
                Effective Date: <b>{point.effectiveDate}</b><br/>
                Weight: <b>{point.value:.0f}%</b><br/>
                Growth Score: <b>{point.growthScore:.2f}</b><br/>
                Size Score: <b>{point.sizeScore:.2f}</b><br/>
                Style Score: <b>{point.styleScore:.2f}</b><br/>
                Value Score: <b>{point.valueScore:.2f}</b>`
        },
        series: [{
            name: 'Equity Style Box',
            borderWidth: 1,
            borderColor: '#e5e7e9',
            keys: [
                'x',
                'y',
                'value',
                'effectiveDate',
                'growthScore',
                'sizeScore',
                'styleScore',
                'valueScore'
            ],
            data,
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
