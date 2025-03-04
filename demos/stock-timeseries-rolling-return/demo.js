document.getElementById('postman-json').addEventListener(
    'change',
    async function (evt) {
        const target = evt.target;
        const postmanJSON = await getPostmanJSON(target);

        if (!postmanJSON) {
            return;
        }

        target.parentNode.style.display = 'none';

        const rollingReturnConnector = new HighchartsConnectors.Morningstar.TimeSeriesConnector({
            postman: {
                environmentJSON: postmanJSON
            },
            securities: [{
                id: 'US0378331005',
                idType: 'ISIN'
            }],
            series: {
                type: 'RollingReturn',
                rollingPeriod: 15
            },
            startDate: '2020-01-01',
            endDate: '2020-12-31',
            currencyId: 'EUR'
        });

        await rollingReturnConnector.load();

        Highcharts.stockChart('container', {
            title: {
                text: 'Apple Share Rolling Return for 2020'
            },
            subtitle: {
                text: 'Performance measured over a 15-day rolling window'
            },
            yAxis: {
                labels: {
                    format: '{value}%'
                }
            },
            tooltip: {
                valueDecimals: 2,
                valueSuffix: '%'
            },
            series: [{
                name: 'AAPL',
                data: rollingReturnConnector.table.getRows(0)
            }]
        });
    });

async function getPostmanJSON (htmlInputFile) {
    let file;
    let fileJSON;

    for (file of htmlInputFile.files) {
        try {
            fileJSON = JSON.parse(await file.text());
            if (HighchartsConnectors.Morningstar.Shared.isPostmanEnvironmentJSON(fileJSON)) {
                break;
            }
        } catch (error) {
            // fail silently
        }
    }

    return fileJSON
}
