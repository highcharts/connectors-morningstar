import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayDataFromBothAPIs, ['postmanEnvironment', 'postmanEnvironmentDWS']);

const loadingLabel = document.getElementById('loading-label');

async function displayDataFromBothAPIs (postmanJSON) {

    // The Morningstar.SecurityDetailsConnector
    const connector = new HighchartsConnectors.Morningstar.SecurityDetailsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironment']
        },
        security: {
            id: 'F0GBR050DD',
            idType: 'MSID'
        },
        converters: ['TrailingPerformance']
    });

    // The MorningstarDWS.InvestmentsConnector
    const dwsConnector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
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

    // Load data from the Morningstar connector
    await connector.load();

    // Load data from the MorningstarDWS connector
    await dwsConnector.load();

    // Get data table from the MorningstarDWS's EquitySectorsBreakdown
    const dwsDataTable = dwsConnector.getTable('EqSuperSectors');

    // Set global options for charts
    Highcharts.setOptions({
        chart: {
            type: 'column'
        },
        xAxis: {
            type: 'category'
        }
    });

    // Display data from the Morningstar API
    Highcharts.chart('container', {
        title: {
            text: '[Morningstar API] Aviva Investors UK Listed Equity Unconstrained Fund 2 GBP Acc'
        },
        subtitle: {
            text: connector.metadata.performanceId
        },
        series: [{
            name: 'F0GBR050DD',
            dataTable: connector.getTable('TrailingPerformance'),
            dataMapping: {
                name: 'Nav_DayEnd_TimePeriod',
                y: 'Nav_DayEnd_Value'
            }
        }]
    });

    // Display data from the MorningstarDWS API
    Highcharts.chart('container-dws', {
        dataTable: dwsDataTable,
        title: {
            text: '[Morningstar DWS API] Equity Super Sectors Breakdown'
        },
        subtitle: {
            text: dwsDataTable.metadata.performanceId
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
        },
        series: [{
            name: 'Equity Super Sectors Long Rescaled',
            dataMapping: {
                y: 'PercLongRescaled'
            }
        }, {
            name: 'Equity Super Sectors Long',
            dataMapping: {
                y: 'PercLong'
            }
        }, {
            name: 'Equity Super Sectors Net',
            dataMapping: {
                y: 'PercNet'
            }
        }]
    });

    loadingLabel.style.display = 'none';
}
