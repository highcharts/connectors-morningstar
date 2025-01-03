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
            title: 'GlobalStockSector',
            dataGridOptions: {
                header: [{
                    format: 'Net',
                    columnId: 'XRay_GlobalStockSector_N_Categories'
                }, {
                    format: 'Values',
                    columnId: 'XRay_GlobalStockSector_N_Values'
                }]
            }
        }, {
            renderTo: 'dashboard-col-1',
            connector: {
                id: 'xray'
            },
            type: 'DataGrid',
            title: 'MorningstarEUR3',
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
                }]
            }
        }, {
            renderTo: 'dashboard-col-2',
            connector: {
                id: 'xray'
            },
            type: 'DataGrid',
            title: 'RegionalExposure',
            dataGridOptions: {
                header: [{
                    format: 'Net',
                    columnId: 'XRay_RegionalExposure_N_Categories'
                }, {
                    format: 'Values',
                    columnId: 'XRay_RegionalExposure_N_Values'
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
