import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displayRNANews);

const loadingLabel = document.getElementById('loading-label');

function displayRNANews (postmanJSON) {
    const board = Dashboards.board('container', {
        dataPool: {
            connectors: [{
                id: 'rna',
                type: 'MorningstarRNANews',
                options: {
                    security: {
                        id: 'GB00BLGZ9862',
                        idType: 'ISIN'
                    },
                    postman: {
                        environmentJSON: postmanJSON
                    }
                }
            },
            {
                id: 'rna-type-amount',
                type: 'JSON',
                options: {
                    columnNames: ['Type', 'Amount'],
                    data: [
                        [],
                        []
                    ],
                    orientation: 'columns',
                    firstRowAsNames: false
                }
            }
            ]
        },
        components: [
            {
                renderTo: 'dashboard-col-0',
                connector: {
                    id: 'rna'
                },
                type: 'DataGrid',
                title: 'News',
                dataGridOptions: {
                    editable: false,
                    columns: {
                        Day: {
                            cellFormatter: function () {
                                return new Date(this.value)
                                    .toISOString()
                                    .substring(0, 10);
                            }
                        }
                    }
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
                            description: 'Kind of news annoucement'
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
        .getConnectorTable('rna')
        .then(async table => {
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

            board.dataPool.setConnectorOptions({
                id: 'rna-type-amount',
                type: 'JSON',
                options: {
                    columnNames: ['Type', 'Amount'],
                    orientation: 'columns',
                    firstRowAsNames: false,
                    data: [
                        uniqueTypes,
                        numberPerType
                    ]
                }
            });

            // Refresh the component after updating the table
            await board.getComponentByCellId('dashboard-col-1').initConnectors();
            await board.getComponentByCellId('dashboard-col-1').update({
                connector: {
                    id: 'rna-type-amount',
                    columnAssignment: [{
                        seriesId: 'number-per-type',
                        data: ['Type', 'Amount']
                    }]
                }
            });
        })
        .finally(() => {
            loadingLabel.style.display = 'none';
        });
}