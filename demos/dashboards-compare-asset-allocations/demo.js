
const typeMapping = {
    '1': 'Stocks',
    '2': 'Bonds',
    '3': 'Cash',
    '4': 'Other Instruments',
    '99': 'Unclassified'
};

// For formatter helpers
Highcharts.Templating.helpers.typeMapping = value => typeMapping[value];

async function displaySecurityDetails (postmanJSON) {

    const ids = ['F000015CH2', 'F0000143IP'],
        idNames = {
            'F000015CH2': 
                'Schroder International Selection Fund Global Emerging Market Opportunities',
            'F0000143IP': 'Fidelity Funds - Asia Pacific Opportunities Fund I-Acc-USD'
        };

    const commonTooltip = `
    <span>
        {typeMapping point.name}
    </span>
    <br/>
    <b>
        <span style="font-size: 1.1em;">
            {point.y:.2f}%
        </span>
    </b>`;

    Dashboards.board('container', {
        dataPool: { // Fetch data with the Morningstar connector
            connectors: [{
                id: 'asset-allocations',
                type: 'MorningstarSecurityCompare',
                options: {
                    postman: {
                        environmentJSON: postmanJSON
                    },
                    converter: {
                        type: 'AssetAllocations'
                    },
                    security: {
                        ids,
                        idType: 'MSID'
                    }
                }
            }]
        },
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
                connector: {
                    id: 'asset-allocations',
                    columnAssignment: [{
                        seriesId: ids[0],
                        data: [
                            'AssetAllocations_Type_' + ids[0], 
                            'AssetAllocations_MorningstarEUR3_N_' + ids[0]
                        ]
                    }]
                },
                renderTo: 'dashboard-col-0',
                type: 'Highcharts',
                sync: {
                    highlight: true
                },
                chartOptions: {
                    chart: {
                        animation: false,
                        type: 'pie'
                    },
                    title: {
                        text: idNames[ids[0]]
                    },
                    tooltip: {
                        animation: 0,
                        format: commonTooltip
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                format: '{typeMapping point.name}'
                            }
                        }
                    }
                }
            },
            {
                connector: {
                    id: 'asset-allocations',
                    columnAssignment: [{
                        seriesId: ids[1],
                        data: [
                            'AssetAllocations_Type_' + ids[1], 
                            'AssetAllocations_MorningstarEUR3_N_' + ids[1]
                        ]
                    }]
                },
                renderTo: 'dashboard-col-1',
                type: 'Highcharts',
                sync: {
                    highlight: true
                },
                chartOptions: {
                    chart: {
                        animation: false,
                        type: 'pie'
                    },
                    title: {
                        text: idNames[ids[1]]
                    },
                    tooltip: {
                        animation: 0,
                        format: commonTooltip
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                format: '{typeMapping point.name}'
                            }
                        }
                    }
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
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }

    return fileJSON;
}
