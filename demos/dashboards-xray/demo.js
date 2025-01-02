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
                header: ['XRay_GlobalStockSector_N_Values', 'XRay_GlobalStockSector_N']
            }
        }, {
            renderTo: 'dashboard-col-1',
            connector: {
                id: 'xray'
            },
            type: 'DataGrid',
            title: 'MorningstarEUR3',
            dataGridOptions: {
                header: [
                    'XRay_MorningstarEUR3_L_Values', 'XRay_MorningstarEUR3_L',
                    'XRay_MorningstarEUR3_N_Values', 'XRay_MorningstarEUR3_N',
                    'XRay_MorningstarEUR3_S_Values', 'XRay_MorningstarEUR3_S'
                ]
            }
        }, {
            renderTo: 'dashboard-col-2',
            connector: {
                id: 'xray'
            },
            type: 'DataGrid',
            title: 'RegionalExposure',
            dataGridOptions: {
                header: ['XRay_RegionalExposure_N_Values', 'XRay_RegionalExposure_N']
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
