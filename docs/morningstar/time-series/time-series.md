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

## Examples

You may find examples of how to use the timeseries connector in our demos. 

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