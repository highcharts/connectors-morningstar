import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(initializeChart);

const loadingLabel = document.getElementById('loading-label');

async function initializeChart (postmanJSON) {
    const priceConnector = new HighchartsConnectors.Morningstar.TimeSeriesConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        series: {
            type: 'Price'
        },
        securities: [{
            id: 'US0378331005',
            idType: 'ISIN'
        }],
        startDate: '2020-01-01',
        endDate: '2020-12-31',
        currencyId: 'EUR'
    });

    await priceConnector.load();

    Highcharts.stockChart('container', {
        title: {
            text: 'Apple Share Price in EUR for 2020'
        },
        series: [{
            type: 'area',
            data: priceConnector.getTable().getRows(),
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
