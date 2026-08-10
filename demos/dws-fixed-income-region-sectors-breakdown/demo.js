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

    // Set categories
    const type = 'Fixed_Income_Type',
        longRescaled = 'Fixed_Income_PercLongRescaled',
        long = 'Fixed_Income_PercLong',
        short = 'Fixed_Income_PercShort',
        net = 'Fixed_Income_PercNet';

    // Create charts for each region sector type
    [
        'IncGovernmentPerRegionSuperSectors',
        'IncTreasuryPerRegionSecondarySectors',
        'IncInflationPerRegionSecondarySectors',
        'IncAgencyPerRegionSecondarySectors'
    ].forEach((tableName) => {
        // Get data table
        const dataTable = connector.getTable(tableName),
            sectorName = tableName.match(/[A-Z][a-z]*/gu),
            containerId = 'container-' + tableName
                .replace(/([a-z0-9])([A-Z])/gu, '$1-$2')
                .toLowerCase(),
            seriesName =
                `Fixed Income ${sectorName[1]} Per Region ${sectorName[4]} ${sectorName[5]}`;

        // Create chart
        Highcharts.chart(containerId, {
            title: {
                text: seriesName
            },
            series: [{
                name: `${seriesName} Long Rescaled`,
                data: dataTable.getRows(
                    void 0,
                    void 0,
                    [type, longRescaled]
                )
            }, {
                name: `${seriesName} Long`,
                data: dataTable.getRows(
                    void 0,
                    void 0,
                    [type, long]
                )
            }, {
                name: `${seriesName} Short`,
                data: dataTable.getRows(
                    void 0,
                    void 0,
                    [type, short]
                )
            }, {
                name: `${seriesName} Net`,
                data: dataTable.getRows(
                    void 0,
                    void 0,
                    [type, net]
                )
            }]
        });
    });

    loadingLabel.style.display = 'none';
}
