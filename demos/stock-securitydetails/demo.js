import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {
    const securityId = 'F0GBR050DD';

    const connector = new HighchartsConnectors.Morningstar.SecurityDetailsConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            id: securityId,
            idType: 'MSID'
        },
        converters: ['TrailingPerformance']
    });

    await connector.load();

    Highcharts.chart('container', {
        title: {
            text: 'Aviva Investors UK Listed Equity Unconstrained Fund 2 GBP Acc'
        },
        series: [{
            type: 'column',
            name: 'F0GBR050DD',
            data: connector.dataTables.TrailingPerformance.getRowObjects().map(obj => [
                obj.TimePeriod,
                obj.Value
            ])
        }],
        xAxis: {
            type: 'category'
        }
    });

    loadingLabel.style.display = 'none';
}
