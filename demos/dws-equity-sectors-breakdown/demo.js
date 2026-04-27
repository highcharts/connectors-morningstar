import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayEquitySectorsBreakdown, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayEquitySectorsBreakdown (postmanJSON) {
    // Configure the connector
    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
        },
        security: {
            id: '0P00000FIA'
        },
        converters: {
            EquitySectorsBreakdown: {}
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
            text: `Performance ID: ${connector.metadata.EquitySectorsBreakdown.performanceId}`
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            labels: {
                format: '{value}%'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: '%'
        },
        plotOptions: {
            series: {
                dataMapping: {
                    name: 'Type'
                }
            }
        }
    });

    // Set categories
    const type = 'Type',
        longRescaled = 'PercLongRescaled',
        long = 'PercLong',
        net = 'PercNet';

    // Get data table
    const superSectorsTable = connector.getTable('EqSuperSectors');

    // Create chart
    Highcharts.chart('container-super-sectors', {
        dataTable: superSectorsTable,
        title: {
            text: 'Equity Super Sectors Breakdown'
        },
        series: [{
            name: 'Equity Super Sectors Long Rescaled',
            dataMapping: {
                y: longRescaled
            }
        }, {
            name: 'Equity Super Sectors Long',
            dataMapping: {
                y: long
            }
        }, {
            name: 'Equity Super Sectors Net',
            dataMapping: {
                y: net
            }
        }]
    });

    // Get data table
    const sectorsTable = connector.getTable('EqSectors');

    // Create chart
    Highcharts.chart('container-sectors', {
        dataTable: sectorsTable,
        title: {
            text: 'Equity Sectors Breakdown'
        },
        series: [{
            name: 'Equity Sectors Long Rescaled',
            dataMapping: {
                y: longRescaled
            }
        }, {
            name: 'Equity Sectors Long',
            dataMapping: {
                y: long
            }
        }, {
            name: 'Equity Sectors Net',
            dataMapping: {
                y: net
            }
        }]
    });

    // Get data table
    const industriesTable = connector.getTable('EqIndustries');

    // Create chart
    Highcharts.chart('container-industries', {
        dataTable: industriesTable,
        title: {
            text: 'Equity Industries Breakdown'
        },
        series: [{
            name: 'Equity Industries Long Rescaled',
            dataMapping: {
                y: longRescaled
            }
        }, {
            name: 'Equity Industries Long',
            dataMapping: {
                y: long
            }
        }, {
            name: 'Equity Industries Net',
            dataMapping: {
                y: net
            }
        }]
    });

    loadingLabel.style.display = 'none';
}
