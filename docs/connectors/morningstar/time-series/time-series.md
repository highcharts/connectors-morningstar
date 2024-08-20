# Time Series

Time Series gives data on performance for securities. This data can for instance
be used for visualization in a chart, or to calculate returns for a given time
period.

## Capabilities

- [Cumulative Return](cumulative-return.md)
- [Dividend](dividend.md)
- [Growth](growth.md)
- [Price](price.md)
- [Regulatory News Announcements](../rna-news/regulatory-news-announcements.md)

## How to use Time Series

You can fetch time series data of various kinds. Specify the securities and type 
to retrieve in the options along with a postman environment file for 
authentication, and other parameters such as `startDate`, `endDate` 
or `currencyId`.

### Time Series with Morningstar standalone for Highcharts:

```js
const dividendConnector = new Connectors.Morningstar.TimeSeriesConnector({
    postman: {
        environmentJSON: postmanJSON
    },
    series: {
        type: 'Dividend'
    },
    securities: [{
        id: 'F0GBR04S23',
        idType: 'MSID'
    }],
    startDate: '2000-01-01',
    endDate: '2020-12-31',
    currencyId: 'EUR'
});

await dividendConnector.load();

Highcharts.stockChart('container', {
    series: [{
        type: 'line',
        table: dividendConnector.dataTable
    }]
});
```

### Time Series with Morningstar connectors for Dashboards:

```js
Dashboards.board('container', {
    dataPool: {
        connectors: [{
            id: 'rna',
            type: 'MorningstarRNANews',
            options: {
                security: {
                    id: 'US0378331005'
                },
                postman: {
                    environmentURL: '/tmp/Environment.json'
                }
            }
        }]
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
        }
    ]
});
```

## Relevant demos

You will find examples of how to use the time series connector in our demos.

- **Highcharts Stock + Morningstar TimeSeries**: Shows how to use 
TimeSeriesConnector to retrieve Dividend time series.