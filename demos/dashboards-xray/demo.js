import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

const globalStockSectorMap = {
    99: 'Not Classified',
    101: 'Basic Materials',
    102: 'Consumer Staples',
    103: 'Financial Services',
    104: 'Real Estate',
    205: 'Consumer Defensive',
    206: 'Healthcare',
    207: 'Utilities',
    308: 'Communication Services',
    309: 'Energy',
    310: 'Industrials',
    311: 'Technology'
};

const assetAllocationMap = {
    1: 'Stock',
    2: 'Bond',
    3: 'Cash',
    4: 'Other',
    99: 'Not Classified'
};

const regionalExposureMap = {
    1: 'United States',
    2: 'Canada',
    3: 'Latin America',
    4: 'United Kingdom',
    5: 'Eurozone',
    6: 'Europe - ex Euro',
    7: 'Europe - Emerging',
    8: 'Africa',
    9: 'Middle East',
    10: 'Japan',
    11: 'Australasia',
    12: 'Asia - Developed',
    13: 'Asia - Emerging',
    14: 'Emerging Market',
    15: 'Developed Country',
    16: 'Not Classified',
    99: 'Other'
}

async function displaySecurityDetails (postmanJSON) {
   const board = Dashboards.board('container', {
    dataPool: {
        connectors: [{
            id: 'xray',
            type: 'MorningstarXRay',
            options: {
                postman: {
                    environmentJSON: postmanJSON
                },
                currencyId: 'GBP',
                dataPoints: {
                    type: 'portfolio',
                    dataPoints: [
                        'AssetAllocationMorningstarEUR3',
                        'GlobalStockSector',
                        'RegionalExposure'
                    ]
                },
                holdings: [
                    {
                        id: 'F0GBR052QA',
                        idType: 'MSID',
                        type: 'FO',
                        weight: '100',
                        name: 'BlackRock Income and Growth Ord',
                        holdingType: 'weight'
                    }
                ]
            }
        }]
    },
    components: [
        {
            renderTo: 'dashboard-col-0',
            connector: {
                id: 'xray',
                dataTableKey: 'Breakdowns'
            },
            type: 'DataGrid',
            title: 'Global Stock Sector',
            dataGridOptions: {
                header: [{
                    format: 'Net',
                    columnId: 'XRay_GlobalStockSector_N_Categories'
                }, {
                    format: 'Values',
                    columnId: 'XRay_GlobalStockSector_N_Values'
                }],
                columns: [{
                    id: 'XRay_GlobalStockSector_N_Categories',
                    cells: {
                        formatter: function () {
                            return this.value !== void 0 ?
                                globalStockSectorMap[this.value] : '';
                        }
                    }
                }]
            }
        }, {
            renderTo: 'dashboard-col-1',
            connector: {
                id: 'xray',
                dataTableKey: 'Breakdowns'
            },
            type: 'DataGrid',
            title: 'Morningstar EUR3',
            dataGridOptions: {
                header: [{
                    format: 'Long',
                    columnId: 'XRay_MorningstarEUR3_L_Categories'
                }, {
                    format: 'Values',
                    columnId: 'XRay_MorningstarEUR3_L_Values'
                }, {
                    format: 'Net',
                    columnId: 'XRay_MorningstarEUR3_N_Categories'
                }, {
                    format: 'Values',
                    columnId: 'XRay_MorningstarEUR3_N_Values'
                }, {
                    format: 'Short',
                    columnId: 'XRay_MorningstarEUR3_S_Categories'
                }, {
                    format: 'Values',
                    columnId: 'XRay_MorningstarEUR3_S_Values'
                }],
                columns: [{
                    id: 'XRay_MorningstarEUR3_L_Categories',
                    cells: {
                        formatter: function () {
                            return this.value !== void 0 ?
                                assetAllocationMap[this.value] : '';
                        }
                    }
                }, {
                    id: 'XRay_MorningstarEUR3_N_Categories',
                    cells: {
                        formatter: function () {
                            return this.value !== void 0 ?
                                assetAllocationMap[this.value] : '';
                        }
                    }
                }, {
                    id: 'XRay_MorningstarEUR3_S_Categories',
                    cells: {
                        formatter: function () {
                            return this.value !== void 0 ?
                                assetAllocationMap[this.value] : '';
                        }
                    }
                }]
            }
        }, {
            renderTo: 'dashboard-col-2',
            connector: {
                id: 'xray',
                dataTableKey: 'Breakdowns'
            },
            type: 'DataGrid',
            title: 'Regional Exposure',
            dataGridOptions: {
                header: [{
                    format: 'Net',
                    columnId: 'XRay_RegionalExposure_N_Categories'
                }, {
                    format: 'Values',
                    columnId: 'XRay_RegionalExposure_N_Values'
                }],
                columns: [{
                    id: 'XRay_RegionalExposure_N_Categories',
                    cells: {
                        formatter: function () {
                            return this.value !== void 0 ?
                                regionalExposureMap[this.value] : '';
                        }
                    }
                }]
            }
        }
    ]
});

    board.dataPool
        .getConnectorTable('xray')
        .then(() => {
            loadingLabel.style.display = 'none';
    });

}