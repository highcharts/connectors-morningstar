const loadingLabel = document.getElementById('loading-label');

function displayFindSimilarScreener (postmanJSON) {
    const secIds = [
        'SecId',
        'Name',
        'riskrating'
    ];

    const headerFormats = {
        SecId: 'Security ID',
        Name: 'Investment Name',
        riskrating: 'Risk Rating'
    };

    const columns = secIds.map(id => ({
        id: `InvestmentScreener_${id}`,
        header: {
            format: headerFormats[id] || id
        }
    }));

    const board = Dashboards.board('container', {
        dataPool: {
            connectors: [
                {
                    id: 'find-similar-screener',
                    type: 'MorningstarInvestmentScreener',
                    options: {
                        page: 1,
                        pageSize: 20,
                        langageId: 'en-GB',
                        currencyId: 'USD',
                        securityDataPoints: secIds,
                        universeIds: ['FOALL$$ALL'],
                        postman: {
                            environmentJSON: postmanJSON
                        }
                    }
                }
            ]
        },
        components: [
            {
                renderTo: 'dashboard-col-1',
                connector: {
                    id: 'find-similar-screener'
                },
                type: 'DataGrid',

                dataGridOptions: {
                    editable: false,
                    columns
                },
                title: 'Find Similar Screener'
            }
        ]
    });

    board.dataPool.getConnector('find-similar-screener').then(connector => {
        loadingLabel.style.display = 'none';
        document.getElementById('total').innerHTML =
            `total - ${connector.metadata.total}`;
        document.getElementById('page').innerHTML =
            `page - ${connector.metadata.page}`;
        document.getElementById('total-pages').innerHTML =
            `out of ${Math.ceil(connector.metadata.total / connector.metadata.pageSize)}`;
    });
}

async function handleSelectEnvironment (evt) {
    const target = evt.target;
    const postmanJSON = await getPostmanJSON(target);

    if (!postmanJSON) {
        loadingLabel.textContent =
            'The provided file is not a Postman Environment Configuration.';
        loadingLabel.style.display = 'block';

        return;
    }

    target.parentNode.style.display = 'none';

    loadingLabel.style.display = 'block';
    loadingLabel.textContent = 'Loading data…';

    displayFindSimilarScreener(postmanJSON);
}

document
    .getElementById('postman-json')
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
            console.warn(error);
        }
    }

    return fileJSON;
}
