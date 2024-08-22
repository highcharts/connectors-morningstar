# Cumulative Return

This type yields cumulative return time series data for single or 
multiple securities. This data can be used to plot cumulative month end 
returns charts.

Returns cumulative return time series data for securities specified.

When multiple securities are sent, the start date of the first security
in the list is used as the start date for the series.


## How to use Cumulative Return

In order to fetch a cumulative return, specify series type `CumulativeReturn` in 
the Time Series Connector options.

```js
const cumulReturnConnector = new Connectors.Morningstar.TimeSeriesConnector({
    postman: {
        environmentJSON: postmanJSON
    },
    series: {
        type: 'CumulativeReturn'
    },
    securities: [{
        id: 'F0GBR04S23',
        idType: 'MSID'
    }]
});
```

## Relevant demos

- **Highcharts Stock + Morningstar TimeSeries**: Shows how to use 
TimeSeriesConnector to retrieve Price time series. Specify type 
`CumulativeReturn`.