# Growth

This type yields growth time series data for single or multiple securities. 
This data can be used to plot growth charts.

Returns growth time series data for securities specified.

When multiple securities are sent, the start date of the first security 
in the list is used as the start date for the series.


## How to use Growth

In order to fetch time series for growth, specify series type `Growth` in 
the Time Series Connector options.

```js
const growthConnector = new Connectors.Morningstar.TimeSeriesConnector({
    postman: {
        environmentJSON: postmanJSON
    },
    series: {
        type: 'Growth'
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
`Growth`.