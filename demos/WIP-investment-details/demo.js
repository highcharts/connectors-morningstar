import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {

    const connector = new HighchartsConnectors.Morningstar.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            id: '0P00000FIA'
        },
        converters: {
            MockAssetAlloc: {
                // extra converter options here
            },
            MockBasicDetails: {
                // extra converter options here
            }
        }
    });

    await connector.load();

    loadingLabel.style.display = 'none';
}
