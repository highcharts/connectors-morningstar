import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayRNANews);

const loadingLabel = document.getElementById('loading-label');

function displayRNANews (postmanJSON) {
    const board = Dashboards.board('container', {
        dataPool: {
            connectors: [{
                id: 'rna',
                type: 'MorningstarRNANews',
                security: {
                    id: 'GB00BLGZ9862',
                    idType: 'ISIN'
                },
                postman: {
                    environmentJSON: postmanJSON['postmanEnvironment']
                }
            },
            {
                id: 'rna-type-amount',
                type: 'JSON',
                columnIds: ['Type', 'Amount'],
                data: [
                    [],
                    []
                ],
                orientation: 'columns',
                firstRowAsNames: false
            }]
        },
        components: [
            {
                renderTo: 'dashboard-col-0',
                connector: {
                    id: 'rna'
                },
                type: 'Grid',
                title: 'News',
                gridOptions: {
                    columns: [{
                        id: 'Day',
                        cells: {
                            formatter: function () {
                                return new Date(this.value)
                                    .toISOString()
                                    .substring(0, 10);
                            }
                        }
                    }]
                }
            },
            {
                renderTo: 'dashboard-col-1',
                connector: {
                    id: 'rna-type-amount',
                    columnAssignment: [{
                        seriesId: 'number-per-type',
                        data: ['Type', 'Amount']
                    }]
                },
                type: 'Highcharts',
                chartOptions: {
                    chart: {
                        animation: false,
                        type: 'column'
                    },
                    title: {
                        text: 'Number of items per type'
                    },
                    subtitle: {
                        text: 'Shows number of news items of each kind'
                    },
                    series: [{
                        id: 'number-per-type',
                        name: 'Number per type'
                    }],
                    tooltip: {
                        shared: true,
                        split: true,
                        stickOnContact: true
                    },
                    lang: {
                        accessibility: {
                            chartContainerLabel:
                                'Shows number of news items of each kind'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        accessibility: {
                            description: 'Kind of news announcement'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Number of announcements'
                        }
                    }
                }
            }
        ]
    });

    board.dataPool
        .getConnector('rna')
        .then(connector => {
            const table = connector.getTable();
            const types = table.getColumn('Type');
            const uniqueTypes = Array.from(new Set(types));
            const numberPerType = uniqueTypes.map(type =>
                types.reduce((previous, current) => {
                    if (current === type) {
                        return previous + 1;
                    }
                    return previous;
                }, 0)
            );

            board.dataPool.getConnector('rna-type-amount').then(connector => {
                connector.options = {
                    type: 'JSON',
                    columnIds: ['Type', 'Amount'],
                    orientation: 'columns',
                    firstRowAsNames: false,
                    data: [
                        uniqueTypes,
                        numberPerType
                    ]
                };

                connector.load();
            });

            board.getComponentByCellId('dashboard-col-1').initConnectors();
        })
        .finally(() => {
            loadingLabel.style.display = 'none';
        });
}