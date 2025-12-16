import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayFindSimilarScreener);

const loadingLabel = document.getElementById('loading-label');

function displayFindSimilarScreener (postmanJSON) {
    const secIds = [
        'secId',
        'name',
        'riskRating',
        'ongoingCharge'
    ];

    const headerFormats = {
        secId: 'Security ID',
        name: 'Investment Name',
        riskRating: 'Risk Rating',
        ongoingCharge: 'Ongoing Charge'
    };

    const columns = secIds.map(id => ({
        id: `InvestmentScreener_${id}`,
        header: {
            format: headerFormats[id] || id
        }
    }));

    const board = Dashboards.board('container', {
        dataPool: {
            connectors: [
                {
                    id: 'find-similar-screener',
                    type: 'MorningstarInvestmentScreener',
                    page: 1,
                    pageSize: 20,
                    languageId: 'en-GB',
                    currencyId: 'USD',
                    securityDataPoints: secIds,
                    universeIds: ['FOESP$$ALL'],
                    sortOrder: 'Name+Asc',
                    filters: [
                        {
                            dataPointId: 'CategoryId',
                            comparatorCode: 'EQ',
                            // The returned list will be similar to the
                            // chosen fund
                            value: 'EUCA000591'
                        },
                        {
                            dataPointId: 'OngoingCharge',
                            comparatorCode: 'LT',
                            value: 3
                        }
                    ],
                    postman: {
                        environmentJSON: postmanJSON['postmanEnvironment']
                    }
                }
            ]
        },
        components: [
            {
                renderTo: 'dashboard-col-1',
                connector: {
                    id: 'find-similar-screener'
                },
                type: 'Grid',
                gridOptions: {
                    columns
                },
                title: 'Find Similar Investments to EUR Money Market Fund'
            }
        ]
    });

    board.dataPool.getConnector('find-similar-screener').then(connector => {
        loadingLabel.style.display = 'none';
        document.getElementById('total').innerHTML =
            `total - ${connector.metadata.total}`;
        document.getElementById('page').innerHTML =
            `page - ${connector.metadata.page}`;
        document.getElementById('total-pages').innerHTML =
            `out of ${Math.ceil(connector.metadata.total / connector.metadata.pageSize)}`;
    });
}
