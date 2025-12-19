import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {

    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
        },
        security: {
            id: '0P00000FIA'
        },
        converters: {
            RegionExposure: {},
            EquitySectorsBreakdown: {},
            FixedIncomeSectorsBreakdown: {}
        }
    });

    await connector.load();

    // eslint-disable-next-line no-console
    console.log(connector.dataTables);

    loadingLabel.style.display = 'none';
}
