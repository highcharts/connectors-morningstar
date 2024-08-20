# Dividend

This type yields dividend time series data for single or multiple securities.

Returns rolling return time series data for securities specified.

When multiple securities are sent, the start date of the first security 
in the list is used as the start date for the series.

## How to use Dividend

In order to fetch a dividend time series, specify series type 
`Dividend` in the Time Series Connector options.

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
    }]
});
```

## Relevant demos

- **Highcharts Stock + Morningstar TimeSeries**: Shows how to use 
TimeSeriesConnector to retrieve Price time series. Specify type 
`Dividend`.