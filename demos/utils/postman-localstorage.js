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
            console.error('Incorrect postman environment file: ', error);
        }
    }

    return fileJSON;
}

export function getPostmanFile (initializeChart, useDWS = false) {
    document.addEventListener('DOMContentLoaded', async () => {
        const localStorageKey = useDWS ? 'postmanEnvironmentDWS' : 'postmanEnvironment',
            parsedPostman = JSON.parse(localStorage.getItem(localStorageKey)),
            fileInput = document.getElementById('postman-json'),
            postmanMessage = document.getElementById('postman-message'),
            loadingLabel = document.getElementById('loading-label');

        try {
            if (HighchartsConnectors.Morningstar.Shared.isPostmanEnvironmentJSON(parsedPostman)) {
                postmanMessage.style.display = 'none';
                loadingLabel.style.display = 'block';

                await initializeChart(parsedPostman);
            } else {
                localStorage.removeItem(localStorageKey);
                postmanMessage.style.display = 'block';

                fileInput.addEventListener('change', async function (e) {
                    const postmanJSON = await getPostmanJSON(e.target);

                    if (!postmanJSON) {
                        loadingLabel.textContent =
                            'The provided file is not a Postman Environment Configuration.';
                        loadingLabel.style.display = 'block';

                        return;
                    }

                    localStorage.setItem(localStorageKey, JSON.stringify(postmanJSON));

                    postmanMessage.style.display = 'none';
                    loadingLabel.style.display = 'block';
                    loadingLabel.textContent = 'Loading data…';

                    await initializeChart(postmanJSON);
                });
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Incorrect postman environment file: ', error);
            localStorage.removeItem(localStorageKey);
            postmanMessage.style.display = 'block';
        }
    });
}