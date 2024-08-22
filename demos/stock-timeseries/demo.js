document.getElementById('postman-json').addEventListener(
    'change',
    async function (evt) {
        const target = evt.target;
        const postmanJSON = await getPostmanJSON(target);

        if (!postmanJSON) {
            return;
        }

        target.parentNode.style.display = 'none';

        const priceConnector = new Connectors.Morningstar.TimeSeriesConnector({
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
                data: priceConnector.table.getRows(0, undefined),
                fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, 'rgba(255, 255, 255, 0)']
                    ]
                }
            }]
        });
    });

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

    return fileJSON
}
