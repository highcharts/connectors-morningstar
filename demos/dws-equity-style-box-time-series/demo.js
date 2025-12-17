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

    const table = connector.getTable('TimeSeries');

    Highcharts.stockChart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Equity Style Box Time Series'
        },
        subtitle: {
            text: table.metadata.performanceId
        },
        tooltip: {
            shared: true
        },
        series: [{
            name: 'Equity Style Box Growth Score',
            data: table.getRows(
                void 0,
                void 0,
                ['Date', 'GrowthScore']
            )
        }, {
            name: 'Equity Style Box Size Score',
            data: table.getRows(
                void 0,
                void 0,
                ['Date', 'SizeScore']
            )
        }, {
            name: 'Equity Style Box Style Score',
            data: table.getRows(
                void 0,
                void 0,
                ['Date', 'StyleScore']
            )
        }, {
            name: 'Equity Style Box Value Score',
            data: table.getRows(
                void 0,
                void 0,
                ['Date', 'ValueScore']
            )
        }]
    });

    loadingLabel.style.display = 'none';
}
