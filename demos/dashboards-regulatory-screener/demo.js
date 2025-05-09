import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayRegulatoryScreener);

const loadingLabel = document.getElementById('loading-label');

function displayRegulatoryScreener (postmanJSON) {
    const secIds = [
        'secId',
        'name',
        'EET_SustPreferencesConsidered',
        'EET_PAIConsidered',
        'EET_SustInv_A8',
        'EET_PAI_GHGEmissions1Considered',
        'EET_PAI_GHGEmissions2Considered',
        'EET_PAI_GHGEmissions3Considered',
        'EET_PAI_GHGEmissions1And2Considered',
        'EET_PAI_GHGEmissions1And2And3Considered',
        'EET_PAI_CarbonFootprint1And2Considered',
        'EET_PAI_CarbonFootprint1And2And3Considered',
        'EET_PAI_GHGIntensity1And2Considered',
        'EET_PAI_GHGIntensity1And2And3Considered',
        'EET_PAI_FossilFuelConsidered',
        'EET_PAI_NonRenewableEnergyConsumptionConsidered',
        'EET_PAI_NonRenewableEnergyProductionConsidered',
        'EET_PAI_EnergyConsumptionNaceAConsidered',
        'EET_PAI_EnergyConsumptionNaceBConsidered',
        'EET_PAI_EnergyConsumptionNaceCConsidered',
        'EET_PAI_EnergyConsumptionNaceDConsidered',
        'EET_PAI_EnergyConsumptionNaceEConsidered',
        'EET_PAI_EnergyConsumptionNaceFConsidered',
        'EET_PAI_EnergyConsumptionNaceGConsidered',
        'EET_PAI_EnergyConsumptionNaceHConsidered',
        'EET_PAI_EnergyConsumptionNaceLConsidered',
        'EET_PAI_NegativeAffectConsidered',
        'EET_PAI_EmissionsToWaterConsidered',
        'EET_PAI_HazardousWasteConsidered',
        'EET_PAI_UNGCViolationsConsidered',
        'EET_PAI_UNGCLackOfComplianceConsidered',
        'EET_PAI_GenderPayGapConsidered',
        'EET_PAI_FemaleBoardMembersConsidered',
        'EET_PAI_ControversialWeaponsConsidered',
        'EET_PAI_CarbonIntensityConsidered',
        'EET_PAI_SocialViolationsPercentageConsidered'
    ];

    const header = [
        {
            columnId: 'InvestmentScreener_secId',
            format: 'Security ID'
        },
        {
            columnId: 'InvestmentScreener_name',
            format: 'Investment Name'
        },
        {
            columnId: 'InvestmentScreener_EET_SustPreferencesConsidered',
            format: 'Sust Preferences Considered'
        },
        {
            columnId: 'InvestmentScreener_EET_PAIConsidered',
            format: 'PAI Considered'
        },
        {
            columnId: 'InvestmentScreener_EET_SustInv_A8',
            format: 'Sust Inv A8'
        },
        {
            format: 'GHG Emissions Considered',
            columns: [
                {
                    columnId: 'InvestmentScreener_EET_PAI_GHGEmissions1Considered',
                    format: '1'
                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_GHGEmissions2Considered',
                    format: '2'
                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_GHGEmissions3Considered',
                    format: '3'
                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_GHGEmissions1And2Considered',
                    format: '1 And 2'
                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_GHGEmissions1And2And3Considered',
                    format: '1 And 2 And 3'
                }
            ]
        },
        {
            format: 'Carbon Footprint Considered',
            columns: [
                {
                    columnId: 'InvestmentScreener_EET_PAI_CarbonFootprint1And2Considered',
                    format: '1 And 2'
                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_CarbonFootprint1And2And3Considered',
                    format: '1 And 2 And 3'
                }
            ]
        },
        {
            format: 'GHG Intensity Considered',
            columns: [
                {
                    columnId: 'InvestmentScreener_EET_PAI_GHGIntensity1And2Considered',
                    format: '1 And 2'
                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_GHGIntensity1And2And3Considered',
                    format: '1 And 2 And 3'
                }
            ]
        },
        {
            columnId:
                'InvestmentScreener_EET_PAI_FossilFuelConsidered',
            format: 'Fossil Fuel Considered'
        },
        {
            format: 'Non Renewable Energy Considered',
            columns: [
                {
                    columnId: 'InvestmentScreener_EET_PAI_NonRenewableEnergyConsumptionConsidered',
                    format: 'Non Renewable Energy Consumption'
                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_NonRenewableEnergyProductionConsidered',
                    format: 'Non Renewable Energy Production'
                }
            ]
        },
        {
            format: 'Energy Consumption Nace Considered',
            columns: [
                {
                    columnId: 'InvestmentScreener_EET_PAI_EnergyConsumptionNaceAConsidered',
                    format: 'A'

                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_EnergyConsumptionNaceBConsidered',
                    format: 'B'

                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_EnergyConsumptionNaceCConsidered',
                    format: 'C'

                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_EnergyConsumptionNaceDConsidered',
                    format: 'D'

                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_EnergyConsumptionNaceEConsidered',
                    format: 'E'

                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_EnergyConsumptionNaceFConsidered',
                    format: 'F'

                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_EnergyConsumptionNaceGConsidered',
                    format: 'G'

                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_EnergyConsumptionNaceHConsidered',
                    format: 'H'

                },
                {
                    columnId: 'InvestmentScreener_EET_PAI_EnergyConsumptionNaceLConsidered',
                    format: 'L'

                }
            ]
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_NegativeAffectConsidered',
            format: 'Negative Affect'
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_EmissionsToWaterConsidered',
            format: 'Emissions To Water'
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_HazardousWasteConsidered',
            format: 'Hazardous Waste'
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_UNGCViolationsConsidered',
            format: 'UNGC Violations'
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_UNGCLackOfComplianceConsidered',
            format: 'UNGC Lack Of Compliance'
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_GenderPayGapConsidered',
            format: 'Gender Pay Gap'
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_FemaleBoardMembersConsidered',
            format: 'Female Board Members'
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_ControversialWeaponsConsidered',
            format: 'Controversial Weapons'
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_CarbonIntensityConsidered',
            format: 'Carbon Intensity'
        },
        {
            columnId: 'InvestmentScreener_EET_PAI_SocialViolationsPercentageConsidered',
            format: 'Social Violations Percentage'

        }
    ];

    const columns = secIds.map(id => ({
        id: `InvestmentScreener_${id}`
    }));

    const board = Dashboards.board('container', {
        dataPool: {
            connectors: [
                {
                    id: 'regulatory-screener',
                    type: 'MorningstarInvestmentScreener',
                    options: {
                        page: 1,
                        pageSize: 20,
                        languageId: 'en-GB',
                        currencyId: 'USD',
                        securityDataPoints: secIds,
                        universeIds: ['FOEUR$$ALL_5791'],
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
                    id: 'regulatory-screener'
                },
                type: 'DataGrid',

                dataGridOptions: {
                    columnDefaults: {
                        cells: {
                            formatter () {
                                if (this.value === 'Y') {
                                    return '✅';
                                } else if (this.value === 'N') {
                                    return '❌';
                                }

                                return this.value === undefined ? '' : this.value;
                            }
                        }
                    },
                    editable: false,
                    columns,
                    rendering: {
                        columns: {
                            distribution: 'fixed'
                        }
                    },
                    header
                },
                title: 'Regulatory Screener'

            }
        ]
    });

    board.dataPool.getConnector('regulatory-screener').then(connector => {
        loadingLabel.style.display = 'none';
        document.getElementById('total').innerHTML =
            `total - ${connector.metadata.total}`;
        document.getElementById('page').innerHTML =
            `page - ${connector.metadata.page}`;
        document.getElementById('total-pages').innerHTML =
            `out of ${Math.ceil(connector.metadata.total / connector.metadata.pageSize)}`;
    });
}
