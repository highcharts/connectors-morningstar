const MCS = Dashboards.MorningstarConnectors.Shared;
const api = new MCS.MorningstarAPI();

(async () => {
    const environment = await (await fetch('/tmp/Environment.json')).json();

    Dashboards.board('container', {
        dataPool: {
            connectors: [{
                id: 'Time Series',
                type: 'MorningstarTimeSeries',
                options: {
                    api: {
                        access: {
                            password: environment.values[2].value,
                            username: environment.values[1].value
                        }
                    }
                }
            }]
        }
    });

})();
