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
            EquitySectorsBreakdown: {}
        }
    });

    await connector.load();

    Highcharts.setOptions({
        chart: {
            type: 'column'
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
        }
    });

    const type = 'Type',
        longRescaled = 'PercLongRescaled',
        long = 'PercLong',
        net = 'PercNet';

    const superSectorsTable = connector.getTable('EqSuperSectors');
    Highcharts.chart('container-super-sectors', {
        title: {
            text: 'Equity Super Sectors Breakdown'
        },
        subtitle: {
            text: superSectorsTable.metadata.performanceId
        },
        series: [{
            name: 'Equity Super Sectors Long Rescaled',
            data: superSectorsTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Equity Super Sectors Long',
            data: superSectorsTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Equity Super Sectors Net',
            data: superSectorsTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    const sectorsTable = connector.getTable('EqSectors');
    Highcharts.chart('container-sectors', {
        title: {
            text: 'Equity Sectors Breakdown'
        },
        subtitle: {
            text: sectorsTable.metadata.performanceId
        },
        series: [{
            name: 'Equity Sectors Long Rescaled',
            data: sectorsTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Equity Sectors Long',
            data: sectorsTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Equity Sectors Net',
            data: sectorsTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    const industriesTable = connector.getTable('EqIndustries');
    Highcharts.chart('container-industries', {
        title: {
            text: 'Equity Industries Breakdown'
        },
        subtitle: {
            text: industriesTable.metadata.performanceId
        },
        series: [{
            name: 'Equity Industries Long Rescaled',
            data: industriesTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Equity Industries Long',
            data: industriesTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Equity Industries Net',
            data: industriesTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    loadingLabel.style.display = 'none';
}
