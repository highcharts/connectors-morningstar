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
            data: connector.dataTables.TrailingPerformance.getRows(
                void 0,
                void 0,
                ['Nav_DayEnd_TimePeriod', 'Nav_DayEnd_Value']
            )
        }],
        xAxis: {
            type: 'category'
        }
    });

    loadingLabel.style.display = 'none';
}
