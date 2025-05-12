import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayInvestmentScreener);

const loadingLabel = document.getElementById('loading-label');

function displayInvestmentScreener (postmanJSON) {
    const secIds = [
        'secId',
        'tenforeId',
        'name',
        'closePrice',
        'ongoingCharge',
        'initialPurchase',
        'maxFrontEndLoad',
        'analystRatingScale',
        'investmentType',
        'holdingTypeId'
    ];

    const headerFormats = {
        'secId': 'Security Id',
        'tenforeId': 'Tenfore Id',
        'name': 'Name',
        'closePrice': 'Close Price',
        'ongoingCharge': 'Annual Report Ongoing Charge',
        'initialPurchase': 'Initial Purchase',
        'maxFrontEndLoad': 'Maximum Front-End Load',
        'analystRatingScale': 'Analyst Rating Scale',
        'investmentType': 'Investment Type',
        'holdingTypeId': 'Holding Type Id'
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
                    id: 'investment-screener',
                    type: 'MorningstarInvestmentScreener',
                    options: {
                        page: 1,
                        pageSize: 20,
                        languageId: 'en-GB',
                        currencyId: 'USD',
                        securityDataPoints: secIds,
                        universeIds: ['FOALL$$ALL'],
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
                    id: 'investment-screener'
                },
                type: 'DataGrid',
                dataGridOptions: {
                    editable: false,
                    columns
                },
                title: 'Investment Screener'
            }
        ]
    });

    board.dataPool.getConnector('investment-screener').then(connector => {
        loadingLabel.style.display = 'none';
        document.getElementById('total').innerHTML =
            `total - ${connector.metadata.total}`;
        document.getElementById('page').innerHTML =
            `page - ${connector.metadata.page}`;
        document.getElementById('total-pages').innerHTML =
            `out of ${Math.ceil(connector.metadata.total / connector.metadata.pageSize)}`;
    });

    /**
     * Add filter to a connector
     *
     * @param {InvestmentScreenerFilter[]} filters
     */
    function setFilter (filters) {
        loadingLabel.style.display = 'block';
        board.dataPool.getConnector('investment-screener').then(connector => {
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

    document.getElementById('filter-1').addEventListener('click', e => {
        e.target.classList.add('button-active');
        document.getElementById('current-filter').innerHTML =
            e.target.innerHTML;
        // Create a filter that will check if the star rating is equal to 5
        // and if the analyst rating is equal to 5
        setFilter([
            {
                dataPointId: 'StarRatingM255',
                comparatorCode: 'IN',
                value: 5
            },
            {
                dataPointId: 'AnalystRatingScale',
                comparatorCode: 'IN',
                value: 5
            }
        ]);
    });

    document.getElementById('filter-2').addEventListener('click', e => {
        document.getElementById('current-filter').innerHTML =
            e.target.innerHTML;
        // Create a filter that will check if the GBR return is between
        // 39 and 60
        setFilter([
            {
                dataPointId: 'GBRReturnM0',
                comparatorCode: 'BTW',
                value: '40:60'
            }
        ]);
    });

    document.getElementById('filter-3').addEventListener('click', e => {
        document.getElementById('current-filter').innerHTML =
            e.target.innerHTML;
        // Create a filter that will filter on the Low Carbon Designation
        // and Carbon Risk Score. These Investments are considered highly
        // sustainable
        setFilter([
            {
                dataPointId: 'LowCarbonDesignation',
                comparatorCode: 'IN',
                value: 'TRUE'
            },
            {
                dataPointId: 'CarbonRiskScore',
                comparatorCode: 'EQ',
                value: 0
            },
            {
                dataPointId: 'SustainabilityRank',
                comparatorCode: 'IN',
                value: 5
            }
        ]);
    });

    document.getElementById('filter-4').addEventListener('click', e => {
        document.getElementById('current-filter').innerHTML =
            e.target.innerHTML;
        // Create a filter that will check if the investment is considered
        // as "low expenses"
        setFilter([
            {
                dataPointId: 'StarRatingM255',
                comparatorCode: 'IN',
                value: 5
            },
            { dataPointId: 'OngoingCharge', comparatorCode: 'LT', value: 0.5 },
            {
                dataPointId: 'initialPurchase',
                comparatorCode: 'LT',
                value: 500000000
            },
            { dataPointId: 'maxFrontEndLoad', comparatorCode: 'LT', value: 5 },
            { dataPointId: 'maxDeferredLoad', comparatorCode: 'LT', value: 5 }
        ]);
    });
}
