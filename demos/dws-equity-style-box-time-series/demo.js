import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayEquitySectorsBreakdown, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayEquitySectorsBreakdown (postmanJSON) {

    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
        },
        security: {
            id: '0P00006W6Q'
        },
        converters: {
            EquityStyleBox: {
                startDate: '2025-01-01',
                endDate: '2025-12-01'
            }
        }
    });

    await connector.load();

    const dataTable = connector.getTable('TimeSeries')

    // eslint-disable-next-line no-undef
    Grid.grid('container', {
        dataTable: {
            columns: {
                Date: dataTable.getColumn('Date'),
                'Style Box': dataTable.getColumn('StyleBox'),
                'Growth Score': dataTable.getColumn('GrowthScore'),
                'Size Score': dataTable.getColumn('SizeScore'),
                'Style Score': dataTable.getColumn('StyleScore'),
                'Value Score': dataTable.getColumn('ValueScore'),
                'Region': dataTable.getColumn('Region')
            }
        }
    });

    loadingLabel.style.display = 'none';
}
