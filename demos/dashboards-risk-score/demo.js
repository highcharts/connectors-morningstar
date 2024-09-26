const loadingLabel = document.getElementById('loading-label');

function displayRiskScore (postmanJSON) {

    const highRiskRetirementPortfolio = {
        name: 'HighRisk',
        currency: 'USD',
        totalValue: 100,
        holdings: [
            {
                id: 'VTIAX',
                idType: 'TradingSymbol',
                weight: 33
            },
            {
                id: 'POGRX',
                idType: 'TradingSymbol',
                weight: 20
            },
            {
                id: 'OAKMX',
                idType: 'TradingSymbol',
                weight: 20
            },
            {
                id: 'VEXAX',
                idType: 'TradingSymbol',
                weight: 15
            },
            {
                id: 'OAKEX',
                idType: 'TradingSymbol',
                weight: 7
            },
            {
                id: 'MWTRX',
                idType: 'TradingSymbol',
                weight: 5
            }
        ]
    };

    const lowRiskRetirementPortfolio = {
        name: 'LowRisk',
        currency: 'USD',
        totalValue: 100,
        holdings: [
            {
                id: 'VTIAX',
                idType: 'TradingSymbol',
                weight: 10
            },
            {
                id: 'POGRX',
                idType: 'TradingSymbol',
                weight: 10
            },
            {
                id: 'VDADX',
                idType: 'TradingSymbol',
                weight: 10
            },
            {
                id: 'OAKMX',
                idType: 'TradingSymbol',
                weight: 10
            },
            {
                id: 'VEXAX',
                idType: 'TradingSymbol',
                weight: 5
            },
            {
                id: 'OAKEX',
                idType: 'TradingSymbol',
                weight: 5
            },
            {
                id: 'MWTRX',
                idType: 'TradingSymbol',
                weight: 30
            },
            {
                id: 'FSHBX',
                idType: 'TradingSymbol',
                weight: 10
            },
            {
                id: 'VTAPX',
                idType: 'TradingSymbol',
                weight: 10
            }
        ]
    }

    const board = Dashboards.board('container', {
        dataPool: {
            connectors: [{
                id: 'risk-score',
                type: 'MorningstarRiskScore',
                options: {
                    portfolios: [
                        lowRiskRetirementPortfolio,
                        highRiskRetirementPortfolio
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
                    id: 'risk-score',
                    columnAssignment: [
                        {
                            seriesId: 'low-risk',
                            data: ['LowRisk_RiskScore']
                        },
                        {
                            seriesId: 'high-risk',
                            data: ['HighRisk_RiskScore']
                        }
                    ]
                },
                type: 'Highcharts',
                chartOptions: {
                    chart: {
                        animation: false,
                        type: 'column'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Risk score for each portfolio'
                    },
                    subtitle: {
                        text: 'Conservative is a low risk portfolio, ' + 
                        'while Aggressive is a high risk portfolio'
                    },
                    yAxis: {
                        title: {
                            text: 'Risk Score'
                        }
                    },
                    xAxis: {
                        categories: ['Conservative', 'Aggressive']
                    },
                    series: [
                        {
                            id: 'low-risk',
                            name: 'Conservative',
                            tooltip: {
                                headerFormat: 'Stock/Bond ratio: 50/50<br>',
                                useHTML: true
                            }
                        },
                        {
                            id: 'high-risk',
                            name: 'Aggressive',
                            tooltip: {
                                headerFormat: 'Stock/Bond ratio: 95/5<br>',
                                useHTML: true
                            }
                        }
                    ]
                }
            },
            {
                renderTo: 'dashboard-col-1',
                connector: {
                    id: 'risk-score'
                },
                visibleColumns: [
                    'LowRisk_RiskScore',
                    'HighRisk_RiskScore'
                ],
                type: 'DataGrid',
                title: 'RiskScore',
                dataGridOptions: {
                    editable: false,
                    columns: {
                        'LowRisk_RiskScore': {
                            headerFormat: 'RiskScore, Conservative'
                        },
                        'HighRisk_RiskScore': {
                            headerFormat: 'RiskScore, Aggressive'
                        }
                    }
                }
            }
        ]
    });

    board.dataPool
        .getConnectorTable('risk-score')
        .then(() => {
            loadingLabel.style.display = 'none';
        });
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
