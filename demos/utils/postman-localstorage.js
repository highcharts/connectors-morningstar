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
}