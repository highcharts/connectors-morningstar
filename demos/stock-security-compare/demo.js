
async function displaySecurityDetails (postmanJSON) {
    const ids = ['F0GBR050DD', 'F00000Q5PZ'],
        idNames = {
            'F0GBR050DD': 'Aviva Investors UK Listed Equity Unconstrained Fund 2',
            'F00000Q5PZ': 'Mirae Asset Global Discovery Fund'
        }


    const connector = new HighchartsConnectors.Morningstar.SecurityCompareConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            ids,
            idType: 'msid'
        }
    });

    await connector.load();

    Highcharts.chart('container', {
        title: {
            text: 'Comparing multiple securities (Trailing performance)'
        },
        series: ids.map(id => ({
            type: 'column',
            name: idNames[id],
            data: connector.table.getRowObjects().map(obj => [
                obj['TrailingPerformance_TimePeriod_' + id],
                obj['TrailingPerformance_Value_' + id]
            ])
        })),
        xAxis: {
            type: 'category'
        }
    });
}

async function handleSelectEnvironment (evt) {
    const target = evt.target;
    const postmanJSON = await getPostmanJSON(target);

    target.parentNode.style.display = 'none';

    displaySecurityDetails(postmanJSON);
}

document.getElementById('postman-json')
    .addEventListener('change', handleSelectEnvironment);

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

    return fileJSON;
}
