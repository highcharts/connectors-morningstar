const loadingLabel = document.getElementById('loading-label');

function displayInvestorPreferences (postmanJSON) {
    const secIds = [
        'SecId',
        'LegalName',
        'DomicileId',
        'EET_PAI_GHGEmissions3Considered',
        'EET_PAI_GHGEmissions1And2Considered',
        'EET_PAI_EnergyConsumptionNaceAConsidered',
        'EET_PAI_EnergyConsumptionNaceBConsidered',
        'EET_PAI_FossilFuelConsidered',
        'EET_PAI_SocialViolationsPercentageConsidered'
    ];

    const calculatedDataPoints = [
        {
            'name': 'UserPref0',
            'type': 'bool',
            'condition': {
                'and': [
                    {
                        'fields': [
                            {
                                'name': 'StarRatingM255',
                                'op': 'gt',
                                'value': 3
                            },
                            {
                                'name': 'StarRatingM255',
                                'op': 'gt',
                                'value': 3
                            }
                        ]
                    }
                ]
            }
        },
        {
            'name': 'UserPref1',
            'type': 'bool',
            'condition': {
                'and': [
                    {
                        'fields': [
                            {
                                'name': 'EET_EUSFDRType',
                                'op': 'eq',
                                'value': 8
                            },
                            {
                                'name': 'EET_PAI_GHGEmissions1Considered',
                                'op': 'eq',
                                'value': 'Y'
                            }
                        ],
                        'or': [
                            {
                                'fields': [
                                    {
                                        'name': 'EET_EUSFDRType',
                                        'op': 'gte',
                                        'value': 9
                                    },
                                    {
                                        'name': 'EET_PAI_GHGEmissions1And2Considered',
                                        'op': 'eq',
                                        'value': 'Y'
                                    }
                                ],
                                'and': [
                                    {
                                        'fields': [
                                            {
                                                'name': 'EET_PAI_EnergyConsumptionNaceAConsidered',
                                                'op': 'eq',
                                                'value': 'Y'
                                            },
                                            {
                                                'name': 'EET_PAI_EnergyConsumptionNaceBConsidered',
                                                'op': 'eq',
                                                'value': 'Y'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            'name': 'UserPref2',
            'type': 'bool',
            'condition': {
                'and': [
                    {
                        'or': [
                            {
                                'fields': [
                                    {
                                        'name': 'EET_EUSFDRType',
                                        'op': 'eq',
                                        'value': 9
                                    },
                                    {
                                        'name': 'EET_EUSFDRType',
                                        'op': 'eq',
                                        'value': 10
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'or': [
                            {
                                'fields': [
                                    {
                                        'name': 'EET_PAI_GHGEmissions3Considered',
                                        'op': 'eq',
                                        'value': 'Y'
                                    },
                                    {
                                        'name': 'EET_PAI_GHGEmissions1Considered',
                                        'op': 'eq',
                                        'value': 'Y'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ]

    const columns = secIds.map(id => ({
        id: `InvestorPreferences_${id}`,
        header: {
            format: id
        }
    }));

    const board = Dashboards.board('container', {
        dataPool: {
            connectors: [
                {
                    id: 'investor-preferences',
                    type: 'MorningstarInvestorPreferences',
                    options: {
                        page: 1,
                        pageSize: 20,
                        languageId: 'en-GB',
                        currencyId: 'USD',
                        securityDataPoints: secIds,
                        universeIds: ['FOGBR$$ALL'],
                        calculatedDataPoints,
                        filters: [{
                            dataPointId: 'UserPref0',
                            comparatorCode: 'EQ',
                            value: 'True'
                        }],
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
                    id: 'investor-preferences'
                },
                type: 'DataGrid',

                dataGridOptions: {
                    editable: false,
                    columns
                },
                title: 'Investor Preferences'
            }
        ]
    });

    board.dataPool.getConnector('investor-preferences').then(connector => {
        loadingLabel.style.display = 'none';
        document.getElementById('total').innerHTML =
            `total - ${connector.metadata.total}`;
        document.getElementById('page').innerHTML =
            `page - ${connector.metadata.page}`;
        document.getElementById('total-pages').innerHTML =
            `out of ${Math.ceil(connector.metadata.total / connector.metadata.pageSize)}`;
    });


    /**
     * Set prev/next page
     */
    function changePage (next = true) {
        loadingLabel.style.display = 'block';
        board.dataPool.getConnector('investor-preferences').then(connector => {
            if (
                connector.options.page < 1 ||
                connector.options.page > connector.metadata.total
            ) {
                loadingLabel.style.display = 'none';
                return;
            }
            connector.options.page += next ? 1 : -1;
            const options = {
                page: connector.options.page
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
    /**
     * Add filter to a connector
     *
     * @param {InvestorPreferencesFilter[]} filters
     */
    function setFilter (filters) {
        loadingLabel.style.display = 'block';
        board.dataPool.getConnector('investor-preferences').then(connector => {
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

    document.getElementById('filter-1').addEventListener('click', () => {
        const currentFilter = document.getElementById('current-filter'),
            euTaxAlignment = document.getElementById('tax-alignment'),
            sfdrTypes = document.querySelectorAll('.sfdr:checked'),
            filters = [];

        currentFilter.innerHTML = '';

        // Create a filter that will check if the investment is within EU tax
        // alignment or SFDR classification
        if (euTaxAlignment.value) {
            const minPortion = document.getElementById('min-portion').value,
                isOptional = document.getElementById('optional');

            currentFilter.innerHTML = 'EU Tax alignment: ' +
                euTaxAlignment.selectedOptions[0].innerHTML +
                ', Minimum portion: ' + minPortion + '%, ' +
                isOptional.selectedOptions[0].innerHTML + '.';

            filters.push(
                {
                    dataPointId: euTaxAlignment.value,
                    comparatorCode: 'IN',
                    value: isOptional.value
                },
                {
                    dataPointId: 'EET_PlannedInvtsSustInvEUTaxonomy',
                    comparatorCode: 'GT',
                    value: minPortion
                }
            );
        }
        if(sfdrTypes.length) {
            const values = [],
                types = [];

            sfdrTypes.forEach(type => {
                values.push(type.value);
                types.push(
                    document.querySelector(`label[for='${type.id}'`).innerHTML
                );
            });
            currentFilter.innerHTML +=
                'SFDR Classification: ' + types.join(', ');

            filters.push({
                dataPointId: 'EET_EUSFDRType',
                comparatorCode: sfdrTypes.length > 1 ? 'IN' : 'EQ',
                value: values.join(':')
            });
        }

        setFilter(filters);
    });

    document.getElementById('prev').addEventListener('click', () => {
        changePage(false);
    });

    document.getElementById('next').addEventListener('click', () => {
        changePage();
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

    displayInvestorPreferences(postmanJSON);
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
