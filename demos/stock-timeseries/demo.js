const commonOptions = {
    api : {
        url: 'https://demo-live-data.highcharts.com',
        access: {
            url: 'https://demo-live-data.highcharts.com/token/oauth',
            username: 'test',
            password: 'secure'
        }
    }
}

const ISINMap = {
    Netflix: 'US64110L1061',
    Apple: 'US0378331005',
    Intel: 'US4581401001',
    Nvidia: 'US67066G1040',
    AMD: 'US0079031078',
    Microsoft: 'US5949181045',
    Tesla: 'US88160R1014',
    Meta: 'US30303M1027',
    Amazon: 'US0231351067',
    GoogleClassA: 'US02079K3059',
    GoogleClassC: 'US02079K1079'
}

const ApplePriceConnector = new Connectors.Morningstar.TimeSeriesConnector({
    ...commonOptions,
    series: {
        type: 'Price'
    },
    securities: [
        {
            id: ISINMap.Apple,
            idType: 'ISIN'
        }
    ],
    startDate: '2020-01-01',
    endDate: '2020-02-31',
    currencyId: 'EUR'
});

Promise.all([
    ApplePriceConnector.load()
]).then(() => {
    const cols = ApplePriceConnector.table.getColumns();

    const data = Array.from(Object.keys(cols).filter(k => k !== 'Date' )
        .map((k) => (cols[k])
        ));

    Highcharts.stockChart('container', {
        title: {
            text: 'Apple Share Price in EUR for 2020'
        },
        series: data.map(d => ({ data: d }))

    });
});

