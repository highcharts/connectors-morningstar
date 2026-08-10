import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(initializeChart, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function initializeChart (postmanJSON) {
    const growthConnector = new HighchartsConnectors.MorningstarDWS.TimeSeriesConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
        },
        ids: [{
            id: '0P00000FIA',
            idType: 'performanceId'
        }, {
            id: '0P00002PB8',
            idType: 'performanceId'
        }],
        category: 'performance',
        dataPoint: 'growth',
        startDate: '2024-10-30',
        endDate: '2025-10-30',
        currencyId: 'EUR'
    });

    await growthConnector.load();

    Highcharts.stockChart('container', {
        dataTable: growthConnector.getTable(),
        title: {
            text: 'LUX and DODGX Growth'
        },
        subtitle: {
            text: 'Growth of initial 10000 EUR investment for one year'
        },
        series: [{
            name: 'Capital Group Global Equity Fund (LUX) B',
            dataMapping: {
                x: 'Date',
                y: 'Value_0P00000FIA'
            }
        }, {
            name: 'Dodge & Cox Stock Fund Class I (DODGX)',
            dataMapping: {
                x: 'Date',
                y: 'Value_0P00002PB8'
            }
        }]
    });

    loadingLabel.style.display = 'none';
}
