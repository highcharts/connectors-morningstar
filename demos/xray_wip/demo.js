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
            renderTo: 'dashboard-col-1',
            connector: {
                id: 'xray'
            },
            type: 'DataGrid',
            title: 'RiskScore'
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
           if (Connectors.Morningstar.isPostmanEnvironmentJSON(fileJSON)) {
               break;
           }
       } catch (error) {
           // fail silently
       }
   }

   return fileJSON;
}
