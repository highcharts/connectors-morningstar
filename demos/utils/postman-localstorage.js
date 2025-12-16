const shared =
    HighchartsConnectors.Morningstar?.Shared ||
    HighchartsConnectors.MorningstarDWS?.Shared;

async function getPostmanJSON (htmlInputFile) {
    let fileJSON;
    const parsedJSONs = {};

    for (const file of htmlInputFile.files) {
        try {
            fileJSON = JSON.parse(await file.text());
            if (shared.isPostmanEnvironmentJSON(fileJSON)) {
                parsedJSONs[
                    fileJSON.name.includes('DWS') ? 'postmanEnvironmentDWS' : 'postmanEnvironment'
                ] = fileJSON;
            }
        } catch (error) {
            throw new Error('Incorrect postman environment file: ' + error);
        }
    }

    return parsedJSONs;
}

export function getPostmanFile (initializeChart, postmanKeys = 'postmanEnvironment') {
    document.addEventListener('DOMContentLoaded', async () => {
        // Make sure it is an array
        if (!Array.isArray(postmanKeys)) {
            postmanKeys = [postmanKeys];
        }

        const parsedPostmans = {},
            postmanMessage = document.getElementById('postman-message'),
            loadingLabel = document.getElementById('loading-label');

        // Check for both Postman environments in the local storage
        postmanKeys.forEach((key) => {
            parsedPostmans[key] = JSON.parse(localStorage.getItem(key));
            if (!shared.isPostmanEnvironmentJSON(parsedPostmans[key])) {
                delete parsedPostmans[key];
            }
        });

        try {
            // If found both Postmans, init chart
            if (Object.keys(parsedPostmans).length === postmanKeys.length) {
                postmanMessage.style.display = 'none';
                loadingLabel.style.display = 'block';

                await initializeChart(parsedPostmans);
            } else {
                postmanKeys.forEach((key) => {
                    localStorage.removeItem(key);
                });
                Object.keys(parsedPostmans).length = 0;
                postmanMessage.style.display = 'block';

                document.getElementById('postman-json').addEventListener(
                    'change',
                    async (e) => {
                        const parsedPostmans = await getPostmanJSON(e.target);

                        if (!parsedPostmans) {
                            loadingLabel.textContent =
                                'Provided files are not a Postman Environment Configurations.';
                            loadingLabel.style.display = 'block';

                            return;
                        }

                        if (Object.keys(parsedPostmans).length !== postmanKeys.length) {
                            loadingLabel.textContent =
                                'Number of provided Postman Environment Configurations ' +
                                'does not match. Provide Postman Environment for both, ' +
                                'Morningstar and Morningstar DWS API.';
                            loadingLabel.style.display = 'block';

                            return;
                        }

                        for (const [key, value] of Object.entries(parsedPostmans)) {
                            localStorage.setItem(key, JSON.stringify(value));
                        }

                        postmanMessage.style.display = 'none';
                        loadingLabel.style.display = 'block';
                        loadingLabel.textContent = 'Loading data…';

                        await initializeChart(parsedPostmans);
                    }
                );
            }
        } catch (error) {
            postmanKeys.forEach((key) => {
                localStorage.removeItem(key);
            });
            postmanMessage.style.display = 'block';
            throw new Error('Incorrect postman environment file(s): ' + error);
        }
    });
}