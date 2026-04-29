import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayFixedIncomeSectorsBreakdown, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayFixedIncomeSectorsBreakdown (postmanJSON) {
    // Configure the connector
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

    // Load data
    await connector.load();

    // Set categories
    const brkType = 'Fixed_Income_Breakdown_Type',
        brkLong = 'Fixed_Income_Breakdown_CalcLongFiperc',
        brkShort = 'Fixed_Income_Breakdown_CalcShortFiperc',
        brkNet = 'Fixed_Income_Breakdown_CalcNetFiperc';

    // Set global options
    Highcharts.setOptions({
        chart: {
            type: 'column'
        },
        subtitle: {
            text: `Performance ID: ${connector.metadata.FixedIncomeSectorsBreakdown.performanceId}`
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
                    name: brkType
                }
            }
        }
    });

    // Create chart
    Highcharts.chart('container-brk-super-sectors', {
        dataTable: connector.getTable('IncBrkSuperSectors'),
        title: {
            text: 'Fixed Income Super Sectors Breakdown'
        },
        series: [{
            name: 'Fixed Income Breakdown Super Sectors Long',
            dataMapping: {
                y: brkLong
            }
        }, {
            name: 'Fixed Income Breakdown Super Sectors Short',
            dataMapping: {
                y: brkShort
            }
        }, {
            name: 'Fixed Income Breakdown Super Sectors Net',
            dataMapping: {
                y: brkNet
            }
        }]
    });

    // Create chart
    Highcharts.chart('container-brk-primary-sectors', {
        dataTable: connector.getTable('IncBrkPrimarySectors'),
        title: {
            text: 'Fixed Income Primary Sectors Breakdown'
        },
        series: [{
            name: 'Fixed Income Breakdown Primary Sectors Long',
            dataMapping: {
                y: brkLong
            }
        }, {
            name: 'Fixed Income Breakdown Primary Sectors Short',
            dataMapping: {
                y: brkShort
            }
        }, {
            name: 'Fixed Income Breakdown Primary Sectors Net',
            dataMapping: {
                y: brkNet
            }
        }]
    });

    // Create chart
    Highcharts.chart('container-brk-secondary-sectors', {
        dataTable: connector.getTable('IncBrkSecondarySectors'),
        title: {
            text: 'Fixed Income Secondary Sectors Breakdown'
        },
        series: [{
            name: 'Fixed Income Breakdown Secondary Sectors Long',
            dataMapping: {
                y: brkLong
            }
        }, {
            name: 'Fixed Income Breakdown Secondary Sectors Short',
            dataMapping: {
                y: brkShort
            }
        }, {
            name: 'Fixed Income Breakdown Secondary Sectors Net',
            dataMapping: {
                y: brkNet
            }
        }]
    });

    // Set categories
    const type = 'Fixed_Income_Type',
        longRescaled = 'Fixed_Income_PercLongRescaled',
        long = 'Fixed_Income_PercLong',
        short = 'Fixed_Income_PercShort',
        net = 'Fixed_Income_PercNet';

    // Create chart
    Highcharts.chart('container-super-sectors', {
        dataTable: connector.getTable('IncSuperSectors'),
        plotOptions: {
            series: {
                dataMapping: {
                    name: type
                }
            }
        },
        title: {
            text: 'Fixed Income Super Sectors'
        },
        series: [{
            name: 'Fixed Income Super Sectors Long Rescaled',
            dataMapping: {
                y: longRescaled
            }
        }, {
            name: 'Fixed Income Super Sectors Long',
            dataMapping: {
                y: long
            }
        }, {
            name: 'Fixed Income Super Sectors Short',
            dataMapping: {
                y: short
            }
        }, {
            name: 'Fixed Income Super Sectors Net',
            dataMapping: {
                y: net
            }
        }]
    });

    // Create chart
    Highcharts.chart('container-primary-sectors', {
        dataTable: connector.getTable('IncPrimarySectors'),
        plotOptions: {
            series: {
                dataMapping: {
                    name: type
                }
            }
        },
        title: {
            text: 'Fixed Income Primary Sectors'
        },
        series: [{
            name: 'Fixed Income Primary Sectors Long Rescaled',
            dataMapping: {
                y: longRescaled
            }
        }, {
            name: 'Fixed Income Primary Sectors Long',
            dataMapping: {
                y: long
            }
        }, {
            name: 'Fixed Income Primary Sectors Short',
            dataMapping: {
                y: short
            }
        }, {
            name: 'Fixed Income Primary Sectors Net',
            dataMapping: {
                y: net
            }
        }]
    });

    // Create chart
    Highcharts.chart('container-secondary-sectors', {
        dataTable: connector.getTable('IncSecondarySectors'),
        plotOptions: {
            series: {
                dataMapping: {
                    name: type
                }
            }
        },
        title: {
            text: 'Fixed Income Secondary Sectors'
        },
        series: [{
            name: 'Fixed Income Secondary Sectors Long Rescaled',
            dataMapping: {
                y: longRescaled
            }
        }, {
            name: 'Fixed Income Secondary Sectors Long',
            dataMapping: {
                y: long
            }
        }, {
            name: 'Fixed Income Secondary Sectors Short',
            dataMapping: {
                y: short
            }
        }, {
            name: 'Fixed Income Secondary Sectors Net',
            dataMapping: {
                y: net
            }
        }]
    });

    loadingLabel.style.display = 'none';
}
