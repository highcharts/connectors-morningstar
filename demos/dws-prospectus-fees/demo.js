import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayProspectusFees, 'postmanEnvironmentDWS');

const loadingLabel = document.getElementById('loading-label');

async function displayProspectusFees (postmanJSON) {
   const board = Dashboards.board('container', {
    dataPool: {
        connectors: [{
            id: 'prospectus-fees',
            type: 'MorningstarDWSInvestments',
            postman: {
                environmentJSON: postmanJSON['postmanEnvironmentDWS']
            },
            security: {
                id: '0P00000FIA'
            },
            converters: {
                ProspectusFees: {}
            },
            dataModifier: {
                type: 'Invert'
            }
        }]
    },
    components: [{
        renderTo: 'container',
        type: 'Grid',
        connector: {
            id: 'prospectus-fees',
            dataTableKey: 'ProspectusFees'
        },
        title: 'Prospectus Fees',
        gridOptions: {
            header: [{
                columnId: 'columnIds',
                format: 'Prospectus Fees'
            }, {
                columnId: '0',
                format: 'Values'
            }]
        }
    }]
});

    board.dataPool
        .getConnector('prospectus-fees')
        .then(() => {
            loadingLabel.style.display = 'none';
    });

}