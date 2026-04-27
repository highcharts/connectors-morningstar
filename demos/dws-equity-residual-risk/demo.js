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
                minPointLength: 2,
                dataMapping: {
                    name: 'Type'
                }
            }
        }
    });

    // Get daily data table
    const riskDailyTable = connector.getTable('RiskDaily');

    // Create chart
    Highcharts.chart('container-daily-alpha', {
        dataTable: riskDailyTable,
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
            dataMapping: {
                name: 'Type',
                y: 'Alpha'
            }
        }, {
            name: 'Non Dividend Alpha',
            dataMapping: {
                name: 'Type',
                y: 'NonDividendAlpha'
            }
        }]
    });

    // Create chart
    Highcharts.chart('container-daily-beta', {
        dataTable: riskDailyTable,
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
            dataMapping: {
                y: 'Beta'
            }
        }, {
            name: 'Non Dividend Beta',
            dataMapping: {
                y: 'NonDividendBeta'
            }
        }]
    });

    // Create chart
    Highcharts.chart('container-daily-rsquare', {
        dataTable: riskDailyTable,
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
            dataMapping: {
                y: 'RSquare'
            }
        }, {
            name: 'Non Dividend RSquare',
            dataMapping: {
                y: 'NonDividendRSquare'
            }
        }]
    });

    // Get monthly data table
    const riskMonthlyTable = connector.getTable('RiskMonthly');

    // Create chart
    Highcharts.chart('container-monthly-alpha', {
        dataTable: riskMonthlyTable,
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
            dataMapping: {
                y: 'Alpha'
            }
        }, {
            name: 'Non Dividend Alpha',
            dataMapping: {
                y: 'NonDividendAlpha'
            }
        }]
    });

    // Create chart
    Highcharts.chart('container-monthly-beta', {
        dataTable: riskMonthlyTable,
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
            dataMapping: {
                y: 'Beta'
            }
        }, {
            name: 'Non Dividend Beta',
            dataMapping: {
                y: 'NonDividendBeta'
            }
        }]
    });

    // Create chart
    Highcharts.chart('container-monthly-rsquare', {
        dataTable: riskMonthlyTable,
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
            dataMapping: {
                y: 'RSquare'
            }
        }, {
            name: 'Non Dividend RSquare',
            dataMapping: {
                y: 'NonDividendRSquare'
            }
        }]
    });

    loadingLabel.style.display = 'none';
}
