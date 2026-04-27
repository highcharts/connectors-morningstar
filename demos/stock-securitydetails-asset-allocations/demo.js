import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayAssetAllocations);

const loadingLabel = document.getElementById('loading-label');

async function displayAssetAllocations (postmanJSON) {
    const securityId = 'US4642898674';

    const connector = new HighchartsConnectors.Morningstar.SecurityDetailsConnector({
        postman: {
            environmentJSON: postmanJSON['postmanEnvironment']
        },
        security: {
            id: securityId,
            idType: 'ISIN'
        },
        converters: ['AssetAllocations']
    });

    await connector.load();

    const typeMapping = {
        '1': 'Stocks',
        '2': 'Bonds',
        '3': 'Cash',
        '4': 'Other Instruments',
        '99': 'Unclassified'
    };

    const dataTable = connector.getTable('AssetAllocations');

    dataTable.setColumn(
        'MorningstarEUR3_Name',
        dataTable.getColumn('MorningstarEUR3_Type').map(type => typeMapping[type] || type)
    );

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
            dataTable,
            dataMapping: {
                name: 'MorningstarEUR3_Name',
                y: 'MorningstarEUR3_N'
            }
        }]
    });

    loadingLabel.style.display = 'none';
}