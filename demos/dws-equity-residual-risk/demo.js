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
        colors: ['#274FE0', '#E1E1E6'],
        subtitle: {
            text: `Performance ID: ${connector.metadata.EquityResidualRisk.performanceId}`
        },
        tooltip: {
            shared: true
        },
        xAxis: {
            type: 'category'
        },
        plotOptions: {
            series: {
                minPointLength: 2
            }
        }
    });

    // Get daily data table
    const riskDailyTable = connector.getTable('RiskDaily');

    // Create chart
    Highcharts.chart('container-daily-alpha', {
        title: {
            text: 'Daily Values - Alpha'
        },
        yAxis: {
            title: {
                text: 'Daily - Alpha (Value)'
            }
        },
        series: [{
            name: 'Alpha',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'Alpha']
            )
        }, {
            name: 'Non Dividend Alpha',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendAlpha']
            )
        }]
    });

    // Create chart
    Highcharts.chart('container-daily-beta', {
        title: {
            text: 'Daily Values - Beta'
        },
        yAxis: {
            title: {
                text: 'Daily - Beta (Value)'
            }
        },
        series: [{
            name: 'Beta',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'Beta']
            )
        }, {
            name: 'Non Dividend Beta',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendBeta']
            )
        }]
    });

    // Create chart
    Highcharts.chart('container-daily-rsquare', {
        title: {
            text: 'Daily Values - RSquare'
        },
        yAxis: {
            title: {
                text: 'Daily - RSquare (Percentage)'
            },
            labels: {
                format: '{value}%'
            }
        },
        series: [{
            name: 'RSquare',
            data: riskDailyTable.getRows(
                void 0,
                void 0,
                ['Type', 'RSquare']
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
    Highcharts.chart('container-monthly-alpha', {
        title: {
            text: 'Monthly Values - Alpha'
        },
        yAxis: {
            title: {
                text: 'Monthly - Alpha (Value)'
            }
        },
        series: [{
            name: 'Alpha',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'Alpha']
            )
        }, {
            name: 'Non Dividend Alpha',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendAlpha']
            )
        }]
    });

    // Create chart
    Highcharts.chart('container-monthly-beta', {
        title: {
            text: 'Monthly Values - Beta'
        },
        yAxis: {
            title: {
                text: 'Monthly - Beta (Value)'
            }
        },
        series: [{
            name: 'Beta',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'Beta']
            )
        }, {
            name: 'Non Dividend Beta',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'NonDividendBeta']
            )
        }]
    });

    // Create chart
    Highcharts.chart('container-monthly-rsquare', {
        title: {
            text: 'Monthly Values - RSquare'
        },
        yAxis: {
            title: {
                text: 'Monthly - RSquare (Percentage)'
            },
            labels: {
                format: '{value}%'
            }
        },
        series: [{
            name: 'RSquare',
            data: riskMonthlyTable.getRows(
                void 0,
                void 0,
                ['Type', 'RSquare']
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
