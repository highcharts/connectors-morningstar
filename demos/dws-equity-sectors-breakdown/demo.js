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
            }
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

    const type = 'Type_0P00000FIA',
        longRescaled = 'PercLongRescaled_0P00000FIA',
        long = 'PercLong_0P00000FIA',
        net = 'PercNet_0P00000FIA';

    const superSectorTable = connector.getTable('EqSuperSector');
    Highcharts.chart('container-super-sector', {
        title: {
            text: 'Equity Super Sectors Breakdown'
        },
        subtitle: {
            text: superSectorTable.metadata.performanceId
        },
        series: [{
            name: 'Equity Super Sector Long Rescaled',
            data: superSectorTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Equity Super Sector Long',
            data: superSectorTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Equity Super Sector Net',
            data: superSectorTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    const sectorTable = connector.getTable('EqSector');
    Highcharts.chart('container-sector', {
        title: {
            text: 'Equity Sectors Breakdown'
        },
        subtitle: {
            text: sectorTable.metadata.performanceId
        },
        series: [{
            name: 'Equity Sector Long Rescaled',
            data: sectorTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Equity Sector Long',
            data: sectorTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Equity Sector Net',
            data: sectorTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    const industryTable = connector.getTable('EqIndustry');
    Highcharts.chart('container-industry', {
        title: {
            text: 'Equity Industries Breakdown'
        },
        subtitle: {
            text: industryTable.metadata.performanceId
        },
        series: [{
            name: 'Equity Industries Long Rescaled',
            data: industryTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Equity Industries Long',
            data: industryTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Equity Industries Net',
            data: industryTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    loadingLabel.style.display = 'none';
}
