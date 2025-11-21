import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {

    const connector = new HighchartsConnectors.Morningstar.AssetAllocationBreakdownConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            id: '0P00000FIA',
            idType: 'performanceId'
        }
    });

    await connector.load();

    Highcharts.chart('general', {

        title: {
            text: 'General'
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: connector.dataTables[0].getColumn('General_Type')
        },
        series: [{
            name: 'Long',
            data: connector.dataTables[0].getColumn('Basic_Long')
        }, {
            name: 'Long Rescaled',
            data: connector.dataTables[0].getColumn('Basic_LongRescaled')
        }, {
            name: 'Net',
            data: connector.dataTables[0].getColumn('Basic_Net')
        }]

    });

    Highcharts.chart('canada', {

        title: {
            text: 'Canada'
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: connector.dataTables[0].getColumn('Can_Type')
        },
        series: [{
            name: 'Long',
            data: connector.dataTables[0].getColumn('Can_Long')
        }, {
            name: 'Long Rescaled',
            data: connector.dataTables[0].getColumn('Can_LongRescaled')
        }, {
            name: 'Net',
            data: connector.dataTables[0].getColumn('Can_Net')
        }]

    });

    Highcharts.chart('us', {

        title: {
            text: 'US'
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: connector.dataTables[0].getColumn('General_Type')
        },
        series: [{
            name: 'Long',
            data: connector.dataTables[0].getColumn('Us_Long')
        }, {
            name: 'Long Rescaled',
            data: connector.dataTables[0].getColumn('Us_LongRescaled')
        }, {
            name: 'Net',
            data: connector.dataTables[0].getColumn('Us_Net')
        }]

    });

    Highcharts.chart('nonus', {

        title: {
            text: 'NonUS'
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: connector.dataTables[0].getColumn('General_Type')
        },
        series: [{
            name: 'Long',
            data: connector.dataTables[0].getColumn('NonUs_Long')
        }, {
            name: 'Long Rescaled',
            data: connector.dataTables[0].getColumn('NonUs_LongRescaled')
        }, {
            name: 'Net',
            data: connector.dataTables[0].getColumn('NonUs_Net')
        }]

    });

    loadingLabel.style.display = 'none';
}
