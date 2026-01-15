# Time Series Connector

The `HighchartsConnectors.MorningstarDWS.TimeSeriesConnector` is a connector that
provides access to Morningstar’s **Time Series API**, allowing you to retrieve
historical time series data for given securities.

## How to use Time Series Connector

The `TimeSeriesConnector` allows you to fetch most recent data from up to 25 securities per one request.

You can fetch time series data of various kinds. For more details regarding available categories and dataPoints, see [Morningstar’s Time Series API].

The `category` and `dataPoint` values can be directly extracted from the request path, where the two path segments immediately after `time-series/v1/` represent them, e.g. in `.../time-series/v1/performance/growth/`, performance is the `category` and growth is the `dataPoint`.

When setting securities, if the identifier type is `performanceId`, the `idType` property may be omitted, as it is used as the default.

Example of fetching Time Series data:

```js
const timeSeriesConnector = new HighchartsConnectors.MorningstarDWS.TimeSeriesConnector({
    api: {
        access: {
            token: 'your_access_token'
        }
    },
    ids: [{
        id: '0P00000FIA',
        idType: 'performanceId'
    }, {
        id: 'MDLOX',
        idType: 'tradingSymbol'
    }],
    category: 'performance',
    dataPoint: 'growth',
    startDate: '2023-10-30',
    endDate: '2025-10-30'
});

await timeSeriesConnector.load();
```

## Relevant demos

Examples of using the Time Series connector are available in our demos:

- **Highcharts Stock + Morningstar Time Series**

[Morningstar’s Time Series API]: https://developer.morningstar.com/direct-web-services/documentation/direct-web-services/time-series/openapi-specification
