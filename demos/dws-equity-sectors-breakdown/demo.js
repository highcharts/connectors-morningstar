import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayEquitySectorsBreakdown, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayEquitySectorsBreakdown (postmanJSON) {

    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
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

    await connector.load();

    const dataTable = connector.getTable('EquitySectorsBreakdown');

    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Equity Sectors Breakdown'
        },
        subtitle: {
            text: connector.metadata.performanceId
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
            data: dataTable.getRows(
                void 0,
                void 0,
                ['SuperSector_Type_0P00000FIA', 'SuperSector_PercLong_0P00000FIA']
            ).filter(item => !item.every(v => v === undefined))
        }, {
            name: 'Equity Super Sector Long Rescaled',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['SuperSector_Type_0P00000FIA', 'SuperSector_PercLongRescaled_0P00000FIA']
            ).filter(item => !item.every(v => v === undefined))
        }, {
            name: 'Equity Super Sector Net',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['SuperSector_Type_0P00000FIA', 'SuperSector_PercNet_0P00000FIA']
            ).filter(item => !item.every(v => v === undefined))
        }]
    });

    loadingLabel.style.display = 'none';
}
