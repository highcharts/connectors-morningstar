import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {
    const ids = ['F0GBR050DD', 'F00000Q5PZ'],
        idNames = {
            'F0GBR050DD': 'Aviva Investors UK Listed Equity Unconstrained Fund 2 GBP Acc',
            'F00000Q5PZ': 'Mirae Asset Global Discovery Fund - ' +
                'ESG Asia Great Consumer Equity Fund A EUR Capitalization'
        };

    const connector = new HighchartsConnectors.Morningstar.SecurityCompareConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironment']
        },
        security: {
            ids,
            idType: 'MSID'
        }
    });

    await connector.load();

    Highcharts.chart('container', {
        dataTable: connector.getTable('TrailingPerformance'),
        chart: {
            type: 'column'
        },
        title: {
            text: 'Comparing multiple securities (Trailing performance)'
        },
        series: [{
            name: idNames[ids[0]],
            dataMapping: {
                name: 'Nav_DayEnd_TimePeriod_' + ids[0],
                y: 'Nav_DayEnd_Value_' + ids[0]
            }
        }, {
            name: idNames[ids[1]],
            dataMapping: {
                name: 'Nav_DayEnd_TimePeriod_' + ids[1],
                y: 'Nav_DayEnd_Value_' + ids[1]
            }
        }],
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Performance'
            },
            labels: {
                format: '{value}%'
            }
        },
        tooltip: {
            valueDecimals: 2,
            valueSuffix: '%'
        }
    });

    loadingLabel.style.display = 'none';
}