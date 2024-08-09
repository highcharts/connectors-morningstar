document.getElementById('postman-json').addEventListener(
    'change',
    async function (
        evt
    ) {
        const target = evt.target;
        const postmanJSON = JSON.parse(await target.files[0]?.text());

        target.parentNode.style.display = 'none';

        Dashboards.board('container', {
            dataPool: {
                connectors: [{
                    id: 'morningstar-dividend',
                    type: 'MorningstarTimeSeries',
                    options: {
                        postman: {
                            environmentJSON: postmanJSON
                        },
                        series: 'Dividend',
                        securities: [{
                            id: 'F0GBR06KY1',
                            idType: 'MSID'
                        }, {
                            id: 'LU0011963245USD',
                            idType: 'ISIN'
                        }],
                        startDate: '2020-01-01',
                        endDate: '2024-12-31'
                    }
                }]
            },
            gui: {
                layouts: [{
                    id: 'layout-1',
                    rows: [{
                        cells: [{
                            id: 'dashboard-col-0'
                        }]
                    }]
                }]
            },
            components: [{
                renderTo: 'dashboard-col-0',
                connector: {
                    id: 'morningstar-dividend',
                    columnAssignment: [{
                        seriesId: 'F0GBR06KY1',
                        data: ['Date', 'F0GBR06KY1']
                    }, {
                        seriesId: 'LU0011963245USD',
                        data: ['Date', 'LU0011963245USD']
                    }]
                },
                type: 'Highcharts',
                chartConstructor: 'stockChart',
            }]
        });
    });
