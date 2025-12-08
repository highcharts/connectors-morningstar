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
            EquitySectorsBreakdown: {
                // extra converter options here
            },
            FixedIncomeSectorsBreakdown: {
                // extra converter options here
            },
            NestedTablesConverter: {
                // extra converter options here
            }
        }
    });

    await connector.load();

    // eslint-disable-next-line no-console
    console.log(connector.dataTables);

    loadingLabel.style.display = 'none';
}
