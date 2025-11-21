import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {

    const connector = new HighchartsConnectors.Morningstar.RegionExposureConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            id: '0P0000XTUQ',
            idType: 'performanceId'
        }
    });

    await connector.load();

    const dataTable = connector.getTable();

    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Region Exposure'
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
            name: 'Equity Percentage Long Rescaled',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Region', 'Equity_PercLongRescaled']
            )
        }, {
            name: 'Fixed Income Long Rescaled',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Region', 'FixedIncome_PercLongRescaled']
            )
        }, {
            name: 'Revenue Exposure',
            data: dataTable.getRows(
                void 0,
                void 0,
                ['Region', 'RevenueExposure_Perc']
            )
        }]
    });

    loadingLabel.style.display = 'none';
}
