
async function displaySecurityDetails (postmanJSON) {
    const ids = ['F000015CH2', 'F0000143IP'],
        idNames = {
            'F000015CH2': 
                'Schroder International Selection Fund Global Emerging Market Opportunities',
            'F0000143IP': 'Fidelity Funds - Asia Pacific Opportunities Fund I-Acc-USD'
        }


    const connector = new HighchartsConnectors.Morningstar.SecurityCompareConnector({
        postman: {
            environmentJSON: postmanJSON
        },
        security: {
            ids,
            idType: 'MSID'
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

    const result = ids.map(id => 
        connector.table.getRowObjects()
            .map(item => ({
                name: typeMapping[item['AssetAllocations_Type_' + id]],
                y: item['AssetAllocations_MorningstarEUR3_N_' + id]
            }))
            .filter(entry => entry.y !== 0) // Filter out entries where y is 0
    );

    Dashboards.board('container', {
        gui: {
            layouts: [{
                id: 'layout-1',
                rows: [{
                    cells: [{
                        id: 'dashboard-col-0'
                    }, {
                        id: 'dashboard-col-1'
                    }]
                }]
            }]
        },
        components: [
            {
                renderTo: 'dashboard-col-0',
                type: 'Highcharts',
                chartOptions: {
                    chart: {
                        animation: false,
                        type: 'pie'
                    },
                    title: {
                        text: idNames[ids[0]]
                    },
                    series: [{
                        data: result[0]
                    }]
                }
            },
            {
                renderTo: 'dashboard-col-1',
                type: 'Highcharts',
                chartOptions: {
                    chart: {
                        animation: false,
                        type: 'pie'
                    },
                    title: {
                        text: idNames[ids[1]]
                    },
                    series: [{
                        data: result[1]
                    }]
                }
            }
        ]
    });

}

async function handleSelectEnvironment (evt) {
    const target = evt.target;
    const postmanJSON = await getPostmanJSON(target);

    target.parentNode.style.display = 'none';

    displaySecurityDetails(postmanJSON);
}

document.getElementById('postman-json')
    .addEventListener('change', handleSelectEnvironment);

async function getPostmanJSON (htmlInputFile) {
    let file;
    let fileJSON;

    for (file of htmlInputFile.files) {
        try {
            fileJSON = JSON.parse(await file.text());
            if (HighchartsConnectors.Morningstar.Shared.isPostmanEnvironmentJSON(fileJSON)) {
                break;
            }
        } catch (error) {
            // fail silently
        }
    }

    return fileJSON;
}
