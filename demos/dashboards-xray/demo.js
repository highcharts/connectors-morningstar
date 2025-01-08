const globalStockSectorMap = {
    99: 'Other', // ??
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
    1: 'Equity',
    2: 'Property',
    3: 'Cash',
    4: 'Other',
    99: 'Fixed Income'
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
    99: 'Other' // ??
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
                id: 'xray'
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
                            return globalStockSectorMap[this.value]
                        }
                    }
                }]
            }
        }, {
            renderTo: 'dashboard-col-1',
            connector: {
                id: 'xray'
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
                            return assetAllocationMap[this.value]
                        }
                    }
                }, {
                    id: 'XRay_MorningstarEUR3_N_Categories',
                    cells: {
                        formatter: function () {
                            return assetAllocationMap[this.value]
                        }
                    }
                }, {
                    id: 'XRay_MorningstarEUR3_S_Categories',
                    cells: {
                        formatter: function () {
                            return assetAllocationMap[this.value]
                        }
                    }
                }]
            }
        }, {
            renderTo: 'dashboard-col-2',
            connector: {
                id: 'xray'
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
                            return regionalExposureMap[this.value]
                        }
                    }
                }]
            }
        }
    ]
});

board.dataPool
    .getConnectorTable('xray')
    .then(() => {});

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
           if (HighchartsConnectors.Shared.Morningstar.isPostmanEnvironmentJSON(fileJSON)) {
               break;
           }
       } catch (error) {
           // fail silently
       }
   }

   return fileJSON;
}
