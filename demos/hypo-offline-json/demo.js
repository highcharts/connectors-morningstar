const loadingLabel = document.getElementById('loading-label');

async function loadOfflineHypoJSON () {
    const response = await fetch('./hypo.json');

    if (!response.ok) {
        throw new Error(`Could not load hypo.json (${response.status})`);
    }

    return response.json();
}

async function displayHypoGrowth () {
    const connector = new HighchartsConnectors.Morningstar.HypoPerformanceConnector({
        api: {
            json: await loadOfflineHypoJSON()
        },
        viewId: 'Growth',
        portfolios: []
    });

    await connector.load();

    Highcharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Portfolio Hypothetical Growth'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%b %Y'
            }
        },
        yAxis: {
            title: {
                text: 'Holding (USD)'
            }
        },
        tooltip: {
            valueSuffix: 'USD'
        },
        series: [{
            name: 'Portfolio',
            color: 'red',
            data: connector.dataTables.Growth.getRows(
                void 0,
                void 0,
                ['Date', 'Value']
            ).slice(0, -1) // A known issue with trailing 0's in the data
        }, {
            name: 'Benchmark',
            color: 'blue',
            data: connector.dataTables.Growth.getRows(
                void 0,
                void 0,
                ['Date', 'Value_Benchmark']
            ).slice(0, -1) // A known issue with trailing 0's in the data
        }, {
            name: 'Net Invested',
            color: 'green',
            data: connector.dataTables.Growth.getRows(
                void 0,
                void 0,
                ['Date', 'Value_NetAmountInvested']
            ).slice(0, -1) // A known issue with trailing 0's in the data
        }]
    });

    loadingLabel.style.display = 'none';
}

displayHypoGrowth();
