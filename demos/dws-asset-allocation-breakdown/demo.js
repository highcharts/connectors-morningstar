import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayAssetAllocationBreakdown, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayAssetAllocationBreakdown (postmanJSON) {

    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironmentDWS']
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

    // Set global options for charts
    Highcharts.setOptions({
        chart: {
            type: 'column'
        },
        xAxis: {
            type: 'category'
        },
        plotOptions: {
            series: {
                dataMapping: {
                    name: 'Type'
                }
            }
        }
    });

    Highcharts.chart('general', {
        dataTable: generalTable,
        title: {
            text: 'General'
        },
        series: [{
            name: 'Long',
            dataMapping: {
                y: 'Long'
            }
        }, {
            name: 'Long Rescaled',
            dataMapping: {
                y: 'LongRescaled'
            }
        }, {
            name: 'Net',
            dataMapping: {
                y: 'Net'
            }
        }, {
            name: 'Short',
            dataMapping: {
                y: 'Short'
            }
        }]

    });

    Highcharts.chart('canada', {
        dataTable: canadaTable,
        title: {
            text: 'Canada'
        },
        series: [{
            name: 'Long',
            dataMapping: {
                y: 'Long'
            }
        }, {
            name: 'Long Rescaled',
            dataMapping: {
                y: 'LongRescaled'
            }
        }, {
            name: 'Net',
            dataMapping: {
                y: 'Net'
            }
        }]

    });

    Highcharts.chart('us', {
        dataTable: generalTable,
        title: {
            text: 'US'
        },
        series: [{
            name: 'Long',
            dataMapping: {
                y: 'Us_Long'
            }
        }, {
            name: 'Long Rescaled',
            dataMapping: {
                y: 'Us_LongRescaled'
            }
        }, {
            name: 'Net',
            dataMapping: {
                y: 'Us_Net'
            }
        }]

    });

    Highcharts.chart('nonus', {
        dataTable: generalTable,
        title: {
            text: 'NonUS'
        },
        series: [{
            name: 'Long',
            dataMapping: {
                y: 'NonUs_Long'
            }
        }, {
            name: 'Long Rescaled',
            dataMapping: {
                y: 'NonUs_LongRescaled'
            }
        }, {
            name: 'Net',
            dataMapping: {
                y: 'NonUs_Net'
            }
        }]

    });

    Highcharts.chart('underlying', {
        title: {
            text: 'Underlying Instruments'
        },
        series: [{
            name: 'Underlying Instruments',
            dataTable: underlyingTable,
            dataMapping: {
                y: 'UnderlyingInstruments'
            }
        }]

    });

    loadingLabel.style.display = 'none';
}
