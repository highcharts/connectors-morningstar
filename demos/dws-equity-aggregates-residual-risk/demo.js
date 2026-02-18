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
        colors: ['#274FE0', '#E1E1E6'],
        subtitle: {
            text: `Performance ID: ${connector.metadata.EquityAggregatesResidualRisk.performanceId}`
        },
        tooltip: {
            shared: true
        },
        xAxis: {
            type: 'category'
        }
    });

    // Get data table
    const dataTable = connector.getTable('EquityAggregatesResidualRisk');
    // TO DO: Uncomment alpha and beta series when query params are supported

    // Create chart
    Highcharts.chart('container-values-alpha', {
        title: {
            text: 'Monthly Values - Alpha'
        },
        yAxis: {
            title: {
                text: 'Monthly - Alpha (Value)'
            }
        },
        series: [
            // {
            //     name: 'Alpha',
            //     data: dataTable.getRows(
            //         void 0,
            //         void 0,
            //         ['Type', 'Alpha']
            //     )
            // },
            {
                name: 'Non Dividend Alpha',
                data: dataTable.getRows(
                    void 0,
                    void 0,
                    ['Type', 'NonDividendAlpha']
                )
            }
        ]
    });

    // Create chart
    Highcharts.chart('container-values-beta', {
        title: {
            text: 'Monthly Values - Beta'
        },
        yAxis: {
            title: {
                text: 'Monthly - Beta (Value)'
            }
        },
        series: [
            // {
            //     name: 'Beta',
            //     data: dataTable.getRows(
            //         void 0,
            //         void 0,
            //         ['Type', 'Beta']
            //     )
            // },
            {
                name: 'Non Dividend Beta',
                data: dataTable.getRows(
                    void 0,
                    void 0,
                    ['Type', 'NonDividendBeta']
                )
            }
        ]
    });

    // Create chart
    Highcharts.chart('container-companies-alpha', {
        title: {
            text: 'Monthly Companies - Alpha'
        },
        yAxis: {
            title: {
                text: 'Monthly - Alpha (Companies)'
            }
        },
        series: [
            // {
            //     name: 'Alpha Companies',
            //     data: dataTable.getRows(
            //         void 0,
            //         void 0,
            //         ['Type', 'AlphaCompanies']
            //     )
            // },
            {
                name: 'Non Dividend Alpha Companies',
                data: dataTable.getRows(
                    void 0,
                    void 0,
                    ['Type', 'NonDividendAlphaCompanies']
                )
            }
        ]
    });

    // Create chart
    Highcharts.chart('container-companies-beta', {
        title: {
            text: 'Monthly Companies - Beta'
        },
        yAxis: {
            title: {
                text: 'Monthly - Beta (Companies)'
            }
        },
        series: [
            // {
            //     name: 'Beta Companies',
            //     data: dataTable.getRows(
            //         void 0,
            //         void 0,
            //         ['Type', 'BetaCompanies']
            //     )
            // },
            {
                name: 'Non Dividend Beta Companies',
                data: dataTable.getRows(
                    void 0,
                    void 0,
                    ['Type', 'NonDividendBetaCompanies']
                )
            }
        ]
    });

    loadingLabel.style.display = 'none';
}
