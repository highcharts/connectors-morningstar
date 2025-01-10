async function displaySecurityDetails (postmanJSON) {
    const ids = ['F0GBR050DD', 'F00000Q5PZ'];

    const connector = new HighchartsConnectors.Morningstar.SecurityCompareConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            ids,
            idType: 'msid'
        },
        _viewIds: 'CompareAdditional',
        _converter: {
            type: 'AssetAllocations'
        }
    });

    await connector.load();
}

async function handleSelectEnvironment (evt) {
    const target = evt.target;
    const postmanJSON = await getPostmanJSON(target);

    target.parentNode.style.display = 'none';

    // @todo Add Chart demo
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
