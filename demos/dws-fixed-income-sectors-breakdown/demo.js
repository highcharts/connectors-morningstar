import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayFixedIncomeSectorsBreakdown, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayFixedIncomeSectorsBreakdown (postmanJSON) {

    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
        },
        security: {
            id: '0P00002QN3'
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

    const dataTable = connector.getTable('FixedIncomeSectorsBreakdown');

    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Fixed Income Sectors Breakdown'
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
            name: 'Super Sector Fixed Income Long',
            data: dataTable.getRows(
                void 0,
                void 0,
                [
                    'SuperSector_Fixed_Inc_Type_0P00002QN3',
                    'SuperSector_Fixed_Inc_PercLong_0P00002QN3'
                ]
            ).filter(item => !item.every(v => v === undefined))
        }, {
            name: 'Super Sector Fixed Income Long Rescaled',
            data: dataTable.getRows(
                void 0,
                void 0,
                [
                    'SuperSector_Fixed_Inc_Type_0P00002QN3',
                    'SuperSector_Fixed_Inc_PercLongRescaled_0P00002QN3'
                ]
            ).filter(item => !item.every(v => v === undefined))
        }, {
            name: 'Super Sector Fixed Income Net',
            data: dataTable.getRows(
                void 0,
                void 0,
                [
                    'SuperSector_Fixed_Inc_Type_0P00002QN3',
                    'SuperSector_Fixed_Inc_PercNet_0P00002QN3'
                ]
            ).filter(item => !item.every(v => v === undefined))
        }]
    });

    loadingLabel.style.display = 'none';
}
