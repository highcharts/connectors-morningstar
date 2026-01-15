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
        }],
        category: 'performance',
        dataPoint: 'growth',
        startDate: '2024-10-30',
        endDate: '2025-10-30',
        currencyId: 'EUR'
    });

    await growthConnector.load();

    Highcharts.stockChart('container', {
        title: {
            text: 'Capital Group Global Equity Fund (LUX) B'
        },
        subtitle: {
            text: 'Growth of 10000 EUR invested at the beginning of the year'
        },
        series: [{
            type: 'area',
            data: growthConnector.getTable().getRows(),
            fillColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, 'rgba(255, 255, 255, 0)']
                ]
            }
        }]
    });

    loadingLabel.style.display = 'none';
}
