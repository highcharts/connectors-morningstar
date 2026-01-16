import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayEquityAggregatesResidualRisk, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayEquityAggregatesResidualRisk (postmanJSON) {
    // Configure the connector
    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
        },
        security: {
            id: '0P00006W6Q'
        },
        converters: {
            EquityAggregatesResidualRisk: {}
        }
    });

    // Load data
    await connector.load();

    // Set global options
    Highcharts.setOptions({
        chart: {
            type: 'column'
        },
        subtitle: {
            text: `Performance ID: ${connector.metadata.EquityAggregatesResidualRisk.performanceId}`
        },
        xAxis: {
            type: 'category'
        },
        tooltip: {
            shared: true
        }
    });

    // Get data table
    const dataTable = connector.getTable('AggregatesRiskMonthly');

    // Create chart
    Highcharts.chart('container-values', {
        title: {
            text: 'Equity Aggregates Residual Risk Values'
        },
        series: [{
            name: 'Alpha',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Type', 'Alpha']
            )
        }, {
            name: 'Beta',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Type', 'Beta']
            )
        }, {
            name: 'Non Dividend Alpha',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendAlpha']
            )
        }, {
            name: 'Non Dividend Beta',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendBeta']
            )
        }]
    });

    // Create chart
    Highcharts.chart('container-companies', {
        title: {
            text: 'Equity Aggregates Residual Risk Number Of Companies'
        },
        series: [{
            name: 'Alpha Companies',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Type', 'AlphaCompanies']
            )
        }, {
            name: 'Beta Companies',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Type', 'BetaCompanies']
            )
        }, {
            name: 'Non Dividend Alpha Companies',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendAlphaCompanies']
            )
        }, {
            name: 'Non Dividend Beta Companies',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendBetaCompanies']
            )
        }]
    });

    loadingLabel.style.display = 'none';
}
