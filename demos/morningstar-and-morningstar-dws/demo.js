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
            EquitySectorsBreakdown: {
                // extra converter options here
            },
            FixedIncomeSectorsBreakdown: {
                // extra converter options here
            }
        }
    });

    // Load data from the Morningstar connector
    await connector.load();

    // Load data from the MorningstarDWS connector
    await dwsConnector.load();

    // Get data from the Morningstar's TrailingPerformance
    const dataTable = connector.dataTables['TrailingPerformance'];

    // Get data from the MorningstarDWS's EquitySectorsBreakdown
    const dwsDataTable = dwsConnector.getTable('EquitySectorsBreakdown');

    // Display data from the Morningstar API
    Highcharts.chart('container', {
        title: {
            text: '[Morningstar API] Aviva Investors UK Listed Equity Unconstrained Fund 2 GBP Acc'
        },
        subtitle: {
            text: connector.metadata.performanceId
        },
        xAxis: {
            type: 'category'
        },
        series: [{
            type: 'column',
            name: 'F0GBR050DD',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Nav_DayEnd_TimePeriod', 'Nav_DayEnd_Value']
            )
        }]
    });

    // Display data from the MorningstarDWS API
    Highcharts.chart('container-dws', {
        chart: {
            type: 'column'
        },
        title: {
            text: '[Morningstar DWS API] Equity Sectors Breakdown'
        },
        subtitle: {
            text: dwsConnector.metadata.performanceId
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
        series: [{
            name: 'Equity Super Sector Long',
            data: dwsDataTable.getRows(
                void 0,
                void 0,
                ['SuperSector_Type_0P00000FIA', 'SuperSector_PercLong_0P00000FIA']
            ).filter(item => !item.every(v => v === undefined))
        }, {
            name: 'Equity Super Sector Long Rescaled',
            data: dwsDataTable.getRows(
                void 0,
                void 0,
                ['SuperSector_Type_0P00000FIA', 'SuperSector_PercLongRescaled_0P00000FIA']
            ).filter(item => !item.every(v => v === undefined))
        }, {
            name: 'Equity Super Sector Net',
            data: dwsDataTable.getRows(
                void 0,
                void 0,
                ['SuperSector_Type_0P00000FIA', 'SuperSector_PercNet_0P00000FIA']
            ).filter(item => !item.every(v => v === undefined))
        }]
    });

    loadingLabel.style.display = 'none';
}
