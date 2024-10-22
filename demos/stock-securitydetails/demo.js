async function displaySecurityDetails (postmanJSON) {
    const securityId = 'F0GBR050DD';

    const connector = new Connectors.Morningstar.SecurityDetailsConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            id: securityId,
            idType: 'MSID'
        }
    });

    await connector.load();

    Highcharts.chart('container', {
        title: {
            text: 'Aviva Investors UK Listed Equity Unconstrained Fund 2 GBP Acc'
        },
        series: [{
            type: 'column',
            name: 'F0GBR050DD',
            data: connector.table.getRowObjects().map(obj => [
                obj.SecurityDetails_TrailingPerformance_TimePeriod,
                obj.SecurityDetails_TrailingPerformance_Value
            ])
        }],
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
            if (Connectors.Morningstar.isPostmanEnvironmentJSON(fileJSON)) {
                break;
            }
        } catch (error) {
            // fail silently
        }
    }

    return fileJSON;
}
