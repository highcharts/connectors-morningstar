async function displayOHLCV (postmanJSON) {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 30));
    const securityId = 'XIUSA000O2';

    const ohlcvConnector = new Connectors.Morningstar.TimeSeriesConnector({
        postman: {
            environmentJSON: postmanJSON
        },
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
            data: ohlcvConnector.table.getRows(0),
            keys: ['x', 'open', 'high', 'low', 'close']
        }]
    });
}

async function handleSelectEnvironment (evt) {
    const target = evt.target;
    const postmanJSON = await getPostmanJSON(target);

    target.parentNode.style.display = 'none';

    displayOHLCV(postmanJSON);
}

document.getElementById('postman-json')
    .addEventListener('change', handleSelectEnvironment);

async function getPostmanJSON (htmlInputFile) {
    let file;
    let fileJSON;

    for (file of htmlInputFile.files) {
        try {
            fileJSON = JSON.parse(await file.text());
            if (Connectors.Morningstar.isPostmanEnvironmentJSON(fileJSON)) {
                break;
            }
        } catch (error) {
            // fail silently
        }
    }

    return fileJSON;
}
