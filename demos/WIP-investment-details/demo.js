import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails, true);

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
            CountryAndRegionExposure: {}
        }
    });

    await connector.load();

    // eslint-disable-next-line no-console
    console.log(connector.dataTables);

    loadingLabel.style.display = 'none';
}
