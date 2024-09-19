const loadingLabel = document.getElementById('loading-label');

function displayRiskScore (postmanJSON) {
    Dashboards.board('container', {
        dataPool: {
            connectors: [{
                id: 'risk-score',
                type: 'MorningstarRiskScore',
                options: {
                    portfolios: [
                        {
                            name: 'TestPortfolio1',
                            currency: 'USD',
                            totalValue: 100,
                            holdings: [
                                {
                                    id: 'F00000VCTT',
                                    idType: 'SecurityID',
                                    weight: 50
                                },
                                {
                                    id: 'AAPL',
                                    idType: 'TradingSymbol',
                                    weight: 50
                                }
                            ]
                        }
                    ],
                    postman: {
                        environmentJSON: postmanJSON
                    }
                }
            }]
        },
        components: [
            {
                renderTo: 'dashboard-col-0',
                connector: {
                    id: 'risk-score'
                },
                type: 'DataGrid',
                title: 'RiskScore',
                dataGridOptions: {
                    editable: false
                    // columns: {
                    //     Day: {
                    //         cellFormatter: function () {
                    //             return new Date(this.value)
                    //                 .toISOString()
                    //                 .substring(0, 10);
                    //         }
                    //     }
                    // }
                }
            }
        ]
    });
    
    loadingLabel.style.display = 'none';
}

async function handleSelectEnvironment (evt) {
    const target = evt.target;
    const postmanJSON = await getPostmanJSON(target);

    if (!postmanJSON) {
        loadingLabel.textContent = 'The provided file is not a Postman Environment Configuration.';
        loadingLabel.style.display = 'block';

        return;
    }

    target.parentNode.style.display = 'none';

    loadingLabel.style.display = 'block';
    loadingLabel.textContent = 'Loading data…';

    displayRiskScore(postmanJSON);
}

document.getElementById('postman-json')
    .addEventListener('change', handleSelectEnvironment);

async function getPostmanJSON (htmlInputFile) {
    let file;
    let fileJSON;

    for (file of htmlInputFile.files) {
        try {
            fileJSON = JSON.parse(await file.text());
            if (Connectors.Morningstar.isPostmanEnvironmentJSON(fileJSON)) {
                break;
            }
        } catch (error) {
            // fail silently
        }
    }

    return fileJSON;
}
