import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayEquityResidualRisk, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayEquityResidualRisk (postmanJSON) {
    // Configure the connector
    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
        },
        security: {
            id: '0P00006W6Q'
        },
        converters: {
            EquityResidualRisk: {}
        }
    });

    // Load data
    await connector.load();

    // Set global options
    Highcharts.setOptions({
        chart: {
            type: 'column'
        },
        xAxis: {
            type: 'category'
        },
        tooltip: {
            shared: true
        }
    });

    // Get daily data table
    const riskDailyTable = connector.getTable('RiskDaily');

    // Create chart
    Highcharts.chart('container-daily', {
        title: {
            text: 'Equity Residual Risk Daily Values'
        },
        subtitle: {
            text: riskDailyTable.metadata.performanceId
        },
        series: [{
            name: 'Alpha',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'Alpha']
            )
        }, {
            name: 'Beta',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'Beta']
            )
        }, {
            name: 'RSquare',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'RSquare']
            )
        }, {
            name: 'Non Dividend Alpha',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendAlpha']
            )
        }, {
            name: 'Non Dividend Beta',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendBeta']
            )
        }, {
            name: 'Non Dividend RSquare',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendRSquare']
            )
        }]
    });

    // Get monthly data table
    const riskMonthlyTable = connector.getTable('RiskMonthly');

    // Create chart
    Highcharts.chart('container-monthly', {
        title: {
            text: 'Equity Residual Risk Monthly Values'
        },
        subtitle: {
            text: riskMonthlyTable.metadata.performanceId
        },
        series: [{
            name: 'Alpha',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'Alpha']
            )
        }, {
            name: 'Beta',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'Beta']
            )
        }, {
            name: 'RSquare',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'RSquare']
            )
        }, {
            name: 'Non Dividend Alpha',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendAlpha']
            )
        }, {
            name: 'Non Dividend Beta',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendBeta']
            )
        }, {
            name: 'Non Dividend RSquare',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendRSquare']
            )
        }]
    });

    loadingLabel.style.display = 'none';
}
