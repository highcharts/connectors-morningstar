import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {

    const connector = new HighchartsConnectors.Morningstar.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            id: '0P00000FIA',
            idType: 'performanceId'
        },
        converters: {
            AssetAllocationBreakdown: {
                
            }
        }
    });

    await connector.load();

    const generalTable = connector.dataTables.GeneralAssetAlloc,
        canadaTable = connector.dataTables.CanadianAssetAlloc,
        underlyingTable = connector.dataTables.UnderlyingAssetAlloc;

    Highcharts.chart('general', {

        title: {
            text: 'General'
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: generalTable.getColumn('General_Type')
        },
        series: [{
            name: 'Long',
            data: generalTable.getColumn('Basic_Long')
        }, {
            name: 'Long Rescaled',
            data: generalTable.getColumn('Basic_LongRescaled')
        }, {
            name: 'Net',
            data: generalTable.getColumn('Basic_Net')
        }, {
            name: 'Short',
            data: generalTable.getColumn('Basic_Short')
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
            categories: canadaTable.getColumn('Can_Type')
        },
        series: [{
            name: 'Long',
            data: canadaTable.getColumn('Can_Long')
        }, {
            name: 'Long Rescaled',
            data: canadaTable.getColumn('Can_LongRescaled')
        }, {
            name: 'Net',
            data: canadaTable.getColumn('Can_Net')
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
            categories: generalTable.getColumn('General_Type')
        },
        series: [{
            name: 'Long',
            data: generalTable.getColumn('Us_Long')
        }, {
            name: 'Long Rescaled',
            data: generalTable.getColumn('Us_LongRescaled')
        }, {
            name: 'Net',
            data: generalTable.getColumn('Us_Net')
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
            categories: generalTable.getColumn('General_Type')
        },
        series: [{
            name: 'Long',
            data: generalTable.getColumn('NonUs_Long')
        }, {
            name: 'Long Rescaled',
            data: generalTable.getColumn('NonUs_LongRescaled')
        }, {
            name: 'Net',
            data: generalTable.getColumn('NonUs_Net')
        }]

    });

    Highcharts.chart('underlying', {

        title: {
            text: 'Underlying Instruments'
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: underlyingTable.getColumn('Underlying_Type')
        },
        series: [{
            name: 'Underlying Instruments',
            data: underlyingTable.getColumn('UnderlyingInstruments')
        }]

    });

    loadingLabel.style.display = 'none';
}
