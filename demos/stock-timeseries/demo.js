document.addEventListener('DOMContentLoaded', async () => {
    const parsedPostman = JSON.parse(localStorage.getItem('postmanEnvironment')),
        postmanMessage = document.getElementById('postman-message');

    try {
        if (HighchartsConnectors.Morningstar.Shared.isPostmanEnvironmentJSON(parsedPostman)) {
            initializeChart(parsedPostman);
            postmanMessage.style.display = 'none';
        } else {
            localStorage.removeItem('postmanEnvironment');

            const fileInput = document.getElementById('postman-json');
            postmanMessage.style.display = 'block';

            fileInput.addEventListener('change', async function (evt) {
                const target = evt.target;
                const postmanJSON = await getPostmanJSON(target);

                if (!postmanJSON) {
                    return;
                }

                localStorage.setItem('postmanEnvironment', JSON.stringify(postmanJSON));

                initializeChart(postmanJSON);
                postmanMessage.style.display = 'none';
            });
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Incorrect postman environment file: ', error);
        localStorage.removeItem('postmanEnvironment');
        postmanMessage.style.display = 'block';
    }
});

async function getPostmanJSON (htmlInputFile) {
    let fileJSON;

    for (const file of htmlInputFile.files) {
        try {
            fileJSON = JSON.parse(await file.text());
            if (HighchartsConnectors.Morningstar.Shared.isPostmanEnvironmentJSON(fileJSON)) {
                break;
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('Incorrect postman environment file');
        }
    }

    return fileJSON;
}

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
}
