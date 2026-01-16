import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayCountryAndRegionExposure, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayCountryAndRegionExposure (postmanJSON) {

    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
        },
        security: {
            id: '0P00000FIA'
        },
        converters: {
            CountryAndRegionExposure: {}
        }
    });

    await connector.load();

    const regionEquityTable = connector.getTable('RegionEquity'),
        data = regionEquityTable.getRows(void 0, void 0, ['Region', 'PercNet']);

    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Region Equity (Net)'
        },
        series: [{
            name: 'Region Equity (Net)',
            data
        }]
    });

    loadingLabel.style.display = 'none';
}
