import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayOHLCV);

const loadingLabel = document.getElementById('loading-label');

async function displayOHLCV (postmanJSON) {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 30));
    const securityId = 'XIUSA000O2';

    const ohlcvConnector = new HighchartsConnectors.Morningstar.TimeSeriesConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironment']
        },
        replaceZeroWithCloseValue: true,
        series: {
            type: 'OHLCV'
        },
        securities: [{
            id: securityId,
            idType: 'SECID'
        }],
        startDate: startDate.toISOString().substring(0, 10),
        endDate: endDate.toISOString().substring(0, 10),
        currencyId: 'EUR'
    });

    await ohlcvConnector.load();

    Highcharts.stockChart('container', {
        title: {
            text: 'NASDAQ Composite last 30 days'
        },
        series: [{
            type: 'ohlc',
            name: 'NASDAQ Composite (EUR)',
            data: ohlcvConnector.getTable().getRows(),
            keys: ['x', 'open', 'high', 'low', 'close']
        }]
    });

    loadingLabel.style.display = 'none';
}
