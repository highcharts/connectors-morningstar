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

export function getPostmanFile (initializeChart) {
    document.addEventListener('DOMContentLoaded', async () => {
        const parsedPostman = JSON.parse(localStorage.getItem('postmanEnvironment')),
            postmanMessage = document.getElementById('postman-message'),
            loadingLabel = document.getElementById('loading-label');

        try {
            if (HighchartsConnectors.Morningstar.Shared.isPostmanEnvironmentJSON(parsedPostman)) {
                postmanMessage.style.display = 'none';
                loadingLabel.style.display = 'block';

                initializeChart(parsedPostman);
            } else {
                localStorage.removeItem('postmanEnvironment');

                const fileInput = document.getElementById('postman-json');
                postmanMessage.style.display = 'block';

                fileInput.addEventListener('change', async function (evt) {
                    const target = evt.target;
                    const postmanJSON = await getPostmanJSON(target);

                    if (!postmanJSON) {
                        loadingLabel.textContent =
                            'The provided file is not a Postman Environment Configuration.';
                        loadingLabel.style.display = 'block';

                        return;
                    }

                    localStorage.setItem('postmanEnvironment', JSON.stringify(postmanJSON));

                    postmanMessage.style.display = 'none';
                    loadingLabel.style.display = 'block';
                    loadingLabel.textContent = 'Loading data…';

                    initializeChart(postmanJSON);
                });
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Incorrect postman environment file: ', error);
            localStorage.removeItem('postmanEnvironment');
            postmanMessage.style.display = 'block';
        }
    });
}