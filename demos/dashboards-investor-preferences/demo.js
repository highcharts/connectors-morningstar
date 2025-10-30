import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayInvestorPreferences);

const loadingLabel = document.getElementById('loading-label');

function displayInvestorPreferences (postmanJSON) {
    // eslint-disable-next-line
    Grid.AST.allowedAttributes.push('viewBox');

    const filterButtons = document.querySelectorAll(
        '.input-wrapper input, .input-wrapper select, button#filter-1'
    );

    for (const button of filterButtons) {
        button.disabled = false;
    }

    const secIds = [
        'SecId',
        'LegalName',
        'EET_PAI_GHGEmissions3Considered',
        'EET_PAI_GHGEmissions1And2Considered',
        'EET_PAI_EnergyConsumptionNaceAConsidered',
        'EET_PAI_EnergyConsumptionNaceBConsidered',
        'EET_PAI_FossilFuelConsidered',
        'EET_PAI_SocialViolationsPercentageConsidered'
    ];

    const starIcon = `<svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 60 60">
        <path class="st0"
            d="M28.8,18.7c0.2-0.4,0.7-0.7,1.2-0.7s0.9,0.3,1.2,0.7l2.8,5.6c0.2,0.4,0.6,0.6,1,0.7
            l6.2,0.9c0.5,0.1,0.9,0.4,1,0.9c0.2,0.5,0,1-0.3,1.3l-4.5,4.3c-0.3,0.3-0.4,0.7-0.4,1.2
            l1.1,6.1c0.1,0.5-0.1,1-0.5,1.3c-0.4,0.3-0.9,0.3-1.4,0.1l-5.5-2.9c-0.4-0.2-0.8-0.2-1.2,0
            l-5.5,2.9c-0.4,0.2-1,0.2-1.4-0.1c-0.4-0.3-0.6-0.8-0.5-1.3l1.1-6.1
            c0.1-0.4-0.1-0.9-0.4-1.2l-4.5-4.3c-0.4-0.3-0.5-0.9-0.3-1.3c0.2-0.5,0.6-0.8,1-0.9l6.2-0.9
            c0.4-0.1,0.8-0.3,1-0.7L28.8,18.7z"/>
        <circle class="st0" cx="30" cy="30.5" r="19.5"/>
    </svg>`;

    const headerFormats = {
        'SecId': 'Security Id',
        'LegalName': 'Legal Name',
        'StarRatingM255': 'Star Rating M255',
        'UserPref0': 'User Preference 1',
        'UserPref1': 'User Preference 2',
        'UserPref2': 'User Preference 3',
        'EET_PAI_GHGEmissions3Considered':
            'European ESG Template Principal Adverse Impact Greenhouse Gas Emissions 3 Considered',
        'EET_PAI_GHGEmissions1And2Considered':
            `European ESG Template Principal Adverse Impact Greenhouse Gas Emissions
             1 And 2 Considered`,
        'EET_PAI_EnergyConsumptionNaceAConsidered':
            'Energy Consumption Intensity Per High Impact Climate Sector NACE A Considered',
        'EET_PAI_EnergyConsumptionNaceBConsidered':
            'Energy Consumption Intensity Per High Impact Climate Sector NACE B Considered',
        'EET_PAI_FossilFuelConsidered':
            'European ESG Template Principal Adverse Impact Fossil Fuel Considered',
        'EET_PAI_SocialViolationsPercentageConsidered':
            `European ESG Template Principal Adverse Impact Social Violations
             Percentage Considered`,
        'EET_EUSFDRType': 'Financial Instrument SFDR Product Type',
        'EET_PAI_GHGEmissions1Considered':
            'European ESG Template Principal Adverse Impact Greenhouse Gas Emissions 1 Considered'
    };

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
    ];

    const columns = [];
    for (const key in headerFormats) {
        columns.push({
            id: `InvestorPreferences_${key}`,
            header: {
                format: headerFormats[key] || key
            },
            cells: {
                className: key.indexOf('UserPref') !== -1 ? 'user-pref' : '',
                formatter () {
                    if (this.column.id === 'InvestorPreferences_StarRatingM255') {
                        return Array(this.value).fill(starIcon).join('');
                    }
                    if (typeof this.value === 'boolean') {
                        return this.value ? '✅' : '❌';
                    }
                    return this.value ?? '';
                }
            }
        });
    }

    const filters = [{
        dataPointId: 'UserPref0',
        comparatorCode: 'EQ',
        value: 'True'
    }];

    const board = Dashboards.board('container', {
        dataPool: {
            connectors: [
                {
                    id: 'investor-preferences',
                    type: 'MorningstarInvestorPreferences',
                    page: 1,
                    pageSize: 20,
                    languageId: 'en-GB',
                    currencyId: 'USD',
                    securityDataPoints: secIds,
                    universeIds: ['FOGBR$$ALL'],
                    calculatedDataPoints,
                    filters,
                    postman: {
                        environmentJSON: postmanJSON
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
                type: 'Grid',
                gridOptions: {
                    editable: false,
                    columns,
                    header: columns.map(column => column.id)
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
                (!next && connector.options.page <= 1) ||
                (next && connector.options.page >= Math.ceil(
                    connector.metadata.total / connector.metadata.pageSize
                ))
            ) {
                loadingLabel.style.display = 'none';
                return;
            }
            connector.options.page += next ? 1 : -1;
            const options = {
                filters,
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
            connector.options.page = 1;
            const options = {
                filters,
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

    document.getElementById('filter-1').addEventListener('click', () => {
        const currentFilter = document.getElementById('current-filter'),
            euTaxAlignment = document.getElementById('tax-alignment'),
            sfdrTypes = document.querySelectorAll('.sfdr:checked');

        // Clear filters array on each change
        filters.length = 0;
        currentFilter.textContent = '';

        // Create a filter that will check if the investment is within EU tax
        // alignment or SFDR classification
        if (euTaxAlignment.value) {
            const minPortion = document.getElementById('min-portion').value,
                isOptional = document.getElementById('optional');

            currentFilter.textContent = 'EU Tax alignment: ' +
                euTaxAlignment.selectedOptions[0].textContent +
                ', Minimum portion: ' + minPortion + '%, ' +
                isOptional.selectedOptions[0].textContent + '.';

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
        if (sfdrTypes.length) {
            const values = [],
                types = [];

            sfdrTypes.forEach(type => {
                values.push(type.value);
                types.push(
                    document.querySelector(`label[for='${type.id}'`).textContent
                );
            });
            currentFilter.textContent +=
                ' SFDR Classification: ' + types.join(', ');

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
