import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayAssetAllocations);

const loadingLabel = document.getElementById('loading-label');

async function displayAssetAllocations (postmanJSON) {
    const securityId = 'US4642898674';

    const connector = new HighchartsConnectors.Morningstar.SecurityDetailsConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            id: securityId,
            idType: 'ISIN'
        },
        converter: {
            type: 'AssetAllocations'
        }
    });

    await connector.load();

    const typeMapping = {
        '1': 'Stocks',
        '2': 'Bonds',
        '3': 'Cash',
        '4': 'Other Instruments',
        '99': 'Unclassified'
    };

    const chartData = connector.table.getRowObjects().map(item => ({
        name: typeMapping[item.AssetAllocations_Type],
        y: item.AssetAllocations_MorningstarEUR3_N
    }));

    Highcharts.chart('container', {
        title: {
            text: 'iShares Core Growth Allocation ETF (AOR) Asset Allocation'
        },
        subtitle: {
            text: 'Type: MorningstarEUR3 | Sale Position: Net (N)'
        },
        series: [{
            type: 'pie',
            name: 'VTI Asset Allocation',
            data: chartData
        }]
    });

    loadingLabel.style.display = 'none';
}