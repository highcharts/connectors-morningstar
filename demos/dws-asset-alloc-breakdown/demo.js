import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

async function displaySecurityDetails (postmanJSON) {

    const connector = new HighchartsConnectors.Morningstar.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            id: '0P00000FIA'
        },
        converters: {
            AssetAllocationBreakdown: {}
        }
    });

    await connector.load();

    const generalTable = connector.getTable('AssetAlloc'),
        canadaTable = connector.getTable('CanadianAssetAlloc'),
        underlyingTable = connector.getTable('UnderlyingAssetAlloc');

    Highcharts.chart('general', {

        title: {
            text: 'General'
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: generalTable.getColumn('Type')
        },
        series: [{
            name: 'Long',
            data: generalTable.getColumn('Long')
        }, {
            name: 'Long Rescaled',
            data: generalTable.getColumn('LongRescaled')
        }, {
            name: 'Net',
            data: generalTable.getColumn('Net')
        }, {
            name: 'Short',
            data: generalTable.getColumn('Short')
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
            categories: canadaTable.getColumn('Type')
        },
        series: [{
            name: 'Long',
            data: canadaTable.getColumn('Long')
        }, {
            name: 'Long Rescaled',
            data: canadaTable.getColumn('LongRescaled')
        }, {
            name: 'Net',
            data: canadaTable.getColumn('Net')
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
            categories: generalTable.getColumn('Type')
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
            categories: generalTable.getColumn('Type')
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
            categories: underlyingTable.getColumn('Type')
        },
        series: [{
            name: 'Underlying Instruments',
            data: underlyingTable.getColumn('UnderlyingInstruments')
        }]

    });

    loadingLabel.style.display = 'none';
}
