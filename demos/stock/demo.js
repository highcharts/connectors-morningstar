document.getElementById('postman-json').addEventListener(
    'change',
    async function (evt) {
        const target = evt.target;
        const postmanJSON = await getPostmanJSON(evt.target);

        if (!postmanJSON) {
            return;
        }

        target.parentNode.style.display = 'none';

        const dividendConnector = new MorningstarConnectors.TimeSeriesConnector({
            postman: {
                environmentJSON: postmanJSON
            },
            series: {
                type: 'Dividend'
            },
            securities: [{
                id: 'F0GBR06KY1',
                idType: 'MSID'
            }, {
                id: 'LU0011963245USD',
                idType: 'ISIN'
            }],
            startDate: '2020-01-01',
            endDate: '2024-12-31'
        });

        await dividendConnector.load();

        Highcharts.stockChart('container', {
            series: [{
                type: 'line',
                table: dividendConnector.dataTable
            }]
        });
    });

async function getPostmanJSON (htmlInputFile) {
    let file;
    let fileJSON;

    for (file of htmlInputFile.files) {
        try {
            fileJSON = JSON.parse(await file.text());
            if (MorningstarConnectors.isPostmanEnvironmentJSON(fileJSON)) {
                break;
            }
        } catch (error) {
            // fail silently
        }
    }

    return fileJSON
}
