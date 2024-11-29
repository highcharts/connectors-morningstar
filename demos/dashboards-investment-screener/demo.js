const loadingLabel = document.getElementById('loading-label');

function displayInvestmentScreener (postmanJSON) {
    const secIds = [
        'secId',
        'tenforeId',
        'name',
        'closePrice',
        'ongoingCharge',
        'initialPurchase',
        'maxFrontEndLoad',
        'analystRatingScale',
        'average12MonthCarbonRiskScore',
        'investmentType',
        'holdingTypeId',
        'universe'
    ];

    const columns = secIds.map(id => ({
        id: `InvestmentScreener_${id}`,
        header: {
            format: id
        }
    }));

    const board = Dashboards.board('container', {
        dataPool: {
            connectors: [
                {
                    id: 'investment-screener',
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
                    id: 'investment-screener'
                },
                type: 'DataGrid',

                dataGridOptions: {
                    editable: false,
                    columns
                },
                title: 'Investment Screener'
            }
        ]
    });

    board.dataPool.getConnector('investment-screener').then(connector => {
        loadingLabel.style.display = 'none';
        document.getElementById('total').innerHTML =
            `total - ${connector.metadata.total}`;
        document.getElementById('page').innerHTML =
            `page - ${connector.metadata.page}`;
        document.getElementById('total-pages').innerHTML =
            `out of ${Math.ceil(connector.metadata.total / connector.metadata.pageSize)}`;
    });

    /**
     * Add filter to a connector
     *
     * @param {InvestmentScreenerFilter[]} filters
     */
    function setFilter (filters) {
        loadingLabel.style.display = 'block';
        board.dataPool.getConnector('investment-screener').then(connector => {
            const options = {
                filters
            };
            connector.load(options).then(() => {
                loadingLabel.style.display = 'none';
                document.getElementById('total').innerHTML =
                    `total - ${connector.metadata.total}`;
                document.getElementById('page').innerHTML =
                    `page - ${connector.metadata.page}`;
                document.getElementById('total-pages').innerHTML =
                    `out of ${Math.ceil(connector.metadata.total / connector.metadata.pageSize)}`;
            });
        });
    }

    document.getElementById('filter-1').addEventListener('click', e => {
        e.target.classList.add('button-active');
        document.getElementById('current-filter').innerHTML =
            e.target.innerHTML;
        // Create a filter that will check if the star rating is equal to 5
        // and if the analyst rating is equal to 5
        setFilter([
            {
                dataPointId: 'StarRatingM255',
                comparatorCode: 'IN',
                value: 5
            },
            {
                dataPointId: 'AnalystRatingScale',
                comparatorCode: 'IN',
                value: 5
            }
        ]);
    });

    document.getElementById('filter-2').addEventListener('click', e => {
        document.getElementById('current-filter').innerHTML =
            e.target.innerHTML;
        // Create a filter that will check if the GBR return is between
        // 39 and 60
        setFilter([
            {
                dataPointId: 'GBRReturnM0',
                comparatorCode: 'BTW',
                value: '40:60'
            }
        ]);
    });

    document.getElementById('filter-3').addEventListener('click', e => {
        document.getElementById('current-filter').innerHTML =
            e.target.innerHTML;
        // Create a filter that will filter on the Low Carbon Designation
        // and Carbon Risk Score. These Investments are considered highly
        // sustainable
        setFilter([
            {
                dataPointId: 'LowCarbonDesignation',
                comparatorCode: 'IN',
                value: 'TRUE'
            },
            {
                dataPointId: 'CarbonRiskScore',
                comparatorCode: 'EQ',
                value: 0
            },
            {
                dataPointId: 'SustainabilityRank',
                comparatorCode: 'IN',
                value: 5
            }
        ]);
    });

    document.getElementById('filter-4').addEventListener('click', e => {
        document.getElementById('current-filter').innerHTML =
            e.target.innerHTML;
        // Create a filter that will check if the investment is considered
        // as "low expenses"
        setFilter([
            {
                dataPointId: 'StarRatingM255',
                comparatorCode: 'IN',
                value: 5
            },
            { dataPointId: 'OngoingCharge', comparatorCode: 'LT', value: 0.5 },
            {
                dataPointId: 'initialPurchase',
                comparatorCode: 'LT',
                value: 500000000
            },
            { dataPointId: 'maxFrontEndLoad', comparatorCode: 'LT', value: 5 },
            { dataPointId: 'maxDeferredLoad', comparatorCode: 'LT', value: 5 }
        ]);
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

    displayInvestmentScreener(postmanJSON);
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
            if (HighchartsConnectors.Morningstar.isPostmanEnvironmentJSON(fileJSON)) {
                break;
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn(error);
        }
    }

    return fileJSON;
}
