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
            FixedIncomeSectorsBreakdown: {
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

    const type = 'Fixed_Inc_Type_0P00002QN3',
        longRescaled = 'Fixed_Inc_PercLongRescaled_0P00002QN3',
        long = 'Fixed_Inc_PercLong_0P00002QN3',
        net = 'Fixed_Inc_PercNet_0P00002QN3';

    const superSectorTable = connector.getTable('IncSuperSector');
    Highcharts.chart('container-super-sector', {
        title: {
            text: 'Fixed Income Super Sectors Breakdown'
        },
        subtitle: {
            text: superSectorTable.metadata.performanceId
        },
        series: [{
            name: 'Fixed Income Super Sectors Long Rescaled',
            data: superSectorTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Fixed Income Super Sectors Long',
            data: superSectorTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Fixed Income Super Sectors Net',
            data: superSectorTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    const primarySectorTable = connector.getTable('IncPrimarySector');
    Highcharts.chart('container-primary-sector', {
        title: {
            text: 'Fixed Income Primary Sectors Breakdown'
        },
        subtitle: {
            text: primarySectorTable.metadata.performanceId
        },
        series: [{
            name: 'Fixed Income Primary Sectors Long Rescaled',
            data: primarySectorTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Fixed Income Primary Sectors Long',
            data: primarySectorTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Fixed Income Primary Sectors Net',
            data: primarySectorTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    const secondarySectorTable = connector.getTable('IncSecondarySector');
    Highcharts.chart('container-secondary-sector', {
        title: {
            text: 'Fixed Income Secondary Sectors Breakdown'
        },
        subtitle: {
            text: secondarySectorTable.metadata.performanceId
        },
        series: [{
            name: 'Fixed Income Secondary Sectors Long Rescaled',
            data: secondarySectorTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Fixed Income Secondary Sectors Long',
            data: secondarySectorTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Fixed Income Secondary Sectors Net',
            data: secondarySectorTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    loadingLabel.style.display = 'none';
}
