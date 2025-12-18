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
            FixedIncomeSectorsBreakdown: {}
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

    const brkType = 'Fixed_Income_Breakdown_Type',
        brkLong = 'Fixed_Income_Breakdown_CalcLongFiperc',
        brkShort = 'Fixed_Income_Breakdown_CalcShortFiperc',
        brkNet = 'Fixed_Income_Breakdown_CalcNetFiperc';

    const superSectorsBrkTable = connector.getTable('IncBrkSuperSectors');
    Highcharts.chart('container-brk-super-sectors', {
        title: {
            text: 'Fixed Income Super Sectors Breakdown'
        },
        subtitle: {
            text: superSectorsBrkTable.metadata.performanceId
        },
        series: [{
            name: 'Fixed Income Breakdown Super Sectors Long',
            data: superSectorsBrkTable.getRows(
                void 0,
                void 0,
                [brkType, brkLong]
            )
        }, {
            name: 'Fixed Income Breakdown Super Sectors Short',
            data: superSectorsBrkTable.getRows(
                void 0,
                void 0,
                [brkType, brkShort]
            )
        }, {
            name: 'Fixed Income Breakdown Super Sectors Net',
            data: superSectorsBrkTable.getRows(
                void 0,
                void 0,
                [brkType, brkNet]
            )
        }]
    });

    const primarySectorsBrkTable = connector.getTable('IncBrkPrimarySectors');
    Highcharts.chart('container-brk-primary-sectors', {
        title: {
            text: 'Fixed Income Primary Sectors Breakdown'
        },
        subtitle: {
            text: primarySectorsBrkTable.metadata.performanceId
        },
        series: [{
            name: 'Fixed Income Breakdown Primary Sectors Long',
            data: primarySectorsBrkTable.getRows(
                void 0,
                void 0,
                [brkType, brkLong]
            )
        }, {
            name: 'Fixed Income Breakdown Primary Sectors Short',
            data: primarySectorsBrkTable.getRows(
                void 0,
                void 0,
                [brkType, brkShort]
            )
        }, {
            name: 'Fixed Income Breakdown Primary Sectors Net',
            data: primarySectorsBrkTable.getRows(
                void 0,
                void 0,
                [brkType, brkNet]
            )
        }]
    });

    const secondarySectorsBrkTable = connector.getTable('IncBrkSecondarySectors');
    Highcharts.chart('container-brk-secondary-sectors', {
        title: {
            text: 'Fixed Income Secondary Sectors Breakdown'
        },
        subtitle: {
            text: secondarySectorsBrkTable.metadata.performanceId
        },
        series: [{
            name: 'Fixed Income Breakdown Secondary Sectors Long',
            data: secondarySectorsBrkTable.getRows(
                void 0,
                void 0,
                [brkType, brkLong]
            )
        }, {
            name: 'Fixed Income Breakdown Secondary Sectors Short',
            data: secondarySectorsBrkTable.getRows(
                void 0,
                void 0,
                [brkType, brkShort]
            )
        }, {
            name: 'Fixed Income Breakdown Secondary Sectors Net',
            data: secondarySectorsBrkTable.getRows(
                void 0,
                void 0,
                [brkType, brkNet]
            )
        }]
    });

    const type = 'Fixed_Income_Type',
        longRescaled = 'Fixed_Income_PercLongRescaled',
        long = 'Fixed_Income_PercLong',
        short = 'Fixed_Income_PercShort',
        net = 'Fixed_Income_PercNet';

    const superSectorsTable = connector.getTable('IncSuperSectors');
    Highcharts.chart('container-super-sectors', {
        title: {
            text: 'Fixed Income Super Sectors'
        },
        subtitle: {
            text: superSectorsTable.metadata.performanceId
        },
        series: [{
            name: 'Fixed Income Super Sectors Long Rescaled',
            data: superSectorsTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Fixed Income Super Sectors Long',
            data: superSectorsTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Fixed Income Super Sectors Short',
            data: superSectorsTable.getRows(
                void 0,
                void 0,
                [type, short]
            )
        }, {
            name: 'Fixed Income Super Sectors Net',
            data: superSectorsTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    const primarySectorsTable = connector.getTable('IncPrimarySectors');
    Highcharts.chart('container-primary-sectors', {
        title: {
            text: 'Fixed Income Primary Sectors'
        },
        subtitle: {
            text: primarySectorsTable.metadata.performanceId
        },
        series: [{
            name: 'Fixed Income Primary Sectors Long Rescaled',
            data: primarySectorsTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Fixed Income Primary Sectors Long',
            data: primarySectorsTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Fixed Income Primary Sectors Short',
            data: primarySectorsTable.getRows(
                void 0,
                void 0,
                [type, short]
            )
        }, {
            name: 'Fixed Income Primary Sectors Net',
            data: primarySectorsTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    const secondarySectorsTable = connector.getTable('IncSecondarySectors');
    Highcharts.chart('container-secondary-sectors', {
        title: {
            text: 'Fixed Income Secondary Sectors'
        },
        subtitle: {
            text: secondarySectorsTable.metadata.performanceId
        },
        series: [{
            name: 'Fixed Income Secondary Sectors Long Rescaled',
            data: secondarySectorsTable.getRows(
                void 0,
                void 0,
                [type, longRescaled]
            )
        }, {
            name: 'Fixed Income Secondary Sectors Long',
            data: secondarySectorsTable.getRows(
                void 0,
                void 0,
                [type, long]
            )
        }, {
            name: 'Fixed Income Secondary Sectors Short',
            data: secondarySectorsTable.getRows(
                void 0,
                void 0,
                [type, short]
            )
        }, {
            name: 'Fixed Income Secondary Sectors Net',
            data: secondarySectorsTable.getRows(
                void 0,
                void 0,
                [type, net]
            )
        }]
    });

    loadingLabel.style.display = 'none';
}
