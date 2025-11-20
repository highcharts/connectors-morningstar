import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {

    const connector = new HighchartsConnectors.Morningstar.FakeConnector({
        postman: {
            environmentJSON: postmanJSON
        }
    });

    await connector.load();

    loadingLabel.style.display = 'none';
}
