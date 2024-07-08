Dashboards.board('container', {
    dataPool: {
        connectors: [{
            id: 'Time Series',
            type: 'MorningstarTimeSeries',
            options: {
                postman: {
                    environmentURL: '/tmp/Environment.json'
                }
            }
        }]
    }
});
