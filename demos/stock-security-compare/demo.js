import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {
    const ids = ['F0GBR050DD', 'F00000Q5PZ'],
        idNames = {
            'F0GBR050DD': 'Aviva Investors UK Listed Equity Unconstrained Fund 2 GBP Acc',
            'F00000Q5PZ': 'Mirae Asset Global Discovery Fund - ' +
                'ESG Asia Great Consumer Equity Fund A EUR Capitalization'
        }


    const connector = new HighchartsConnectors.Morningstar.SecurityCompareConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            ids,
            idType: 'MSID'
        }
    });

    await connector.load();

    Highcharts.chart('container', {
        title: {
            text: 'Comparing multiple securities (Trailing performance)'
        },
        series: ids.map(id => ({
            type: 'column',
            name: idNames[id],
            data: connector.dataTables.TrailingPerformance.getRowObjects().map(obj => [
                obj['TrailingPerformance_TimePeriod_' + id],
                obj['TrailingPerformance_Value_' + id]
            ])
        })),
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