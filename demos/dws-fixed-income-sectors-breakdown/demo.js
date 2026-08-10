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
        }
    });

    // Create charts for each sector breakdown type
    [
        'IncBrkSuperSectors',
        'IncBrkPrimarySectors',
        'IncBrkSecondarySectors'
    ].forEach((tableName) => {
        // Get data table
        const dataTable = connector.getTable(tableName),
            sectorName = tableName.match(/[A-Z][a-z]*/gu),
            containerId = 'container-' + tableName
                .replace(/([a-z0-9])([A-Z])/gu, '$1-$2')
                .toLowerCase(),
            name = `Fixed Income ${sectorName[2]} ${sectorName[3]} Breakdown`;

        // Create chart
        Highcharts.chart(containerId, {
            dataTable,
            title: {
                text: name
            },
            plotOptions: {
                series: {
                    dataMapping: {
                        name: brkType
                    }
                }
            },
            series: [{
                name: `${name} Long`,
                dataMapping: {
                    y: brkLong
                }
            }, {
                name: `${name} Short`,
                dataMapping: {
                    y: brkShort
                }
            }, {
                name: `${name} Net`,
                dataMapping: {
                    y: brkNet
                }
            }]
        });
    });

    // Set categories
    const type = 'Fixed_Income_Type',
        longRescaled = 'Fixed_Income_PercLongRescaled',
        long = 'Fixed_Income_PercLong',
        short = 'Fixed_Income_PercShort',
        net = 'Fixed_Income_PercNet';

    // Create charts for each sector type
    [
        'IncSuperSectors',
        'IncPrimarySectors',
        'IncSecondarySectors'
    ].forEach((tableName) => {
        // Get data table
        const dataTable = connector.getTable(tableName),
            sectorName = tableName.match(/[A-Z][a-z]*/gu),
            containerId = 'container-' + tableName
                .replace(/([a-z0-9])([A-Z])/gu, '$1-$2')
                .toLowerCase(),
            name = `Fixed Income ${sectorName[1]} ${sectorName[2]}`;

        // Create chart
        Highcharts.chart(containerId, {
            dataTable,
            title: {
                text: name
            },
            plotOptions: {
                series: {
                    dataMapping: {
                        name: type
                    }
                }
            },
            series: [{
                name: `${name} Long Rescaled`,
                dataMapping: {
                    y: longRescaled
                }
            }, {
                name: `${name} Long`,
                dataMapping: {
                    y: long
                }
            }, {
                name: `${name} Short`,
                dataMapping: {
                    y: short
                }
            }, {
                name: `${name} Net`,
                dataMapping: {
                    y: net
                }
            }]
        });
    });

    loadingLabel.style.display = 'none';
}
