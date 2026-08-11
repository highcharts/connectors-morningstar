# Creating Your First Chart from Morningstar Market Data

Morningstar is one of the most trusted names in financial data. But getting that data onto a screen has traditionally meant handling complex requests, and a mapping layer that someone has to maintain forever.

The Highcharts connectors for Morningstar Direct Web Services (DWS) remove that detour. You configure your credentials once, pick the data you want, and the connector hands you a formatted data table that Highcharts can render directly, with easy access to raw data as well.

In this tutorial we will go from an empty HTML file to a working chart built on Morningstar data. We will use the DWS bundle, which targets Morningstar's newer API, and we will finish by looking at how the same few lines of setup unlock the rest of the DWS data catalogue.

## What we will build

An asset allocation chart showing how a fund splits its net assets across equity, bonds, cash, and other holdings — built with the **Investment Details Connector** and Highcharts, in four steps from an empty file.

The connectors ship in two flavours, and they are not interchangeable:

- **`connectors-morningstar`** — the legacy API, covering Security Details, Screeners, X-Ray, Risk Score, Performance, and more.
- **`connectors-morningstar-dws`** — the newer DWS API, covering the **Investment Details API** and the **Time Series API**, with more to come.

This tutorial uses the DWS bundle throughout. Its connectors live under the `HighchartsConnectors.MorningstarDWS` namespace, while the legacy ones live under `HighchartsConnectors.Morningstar`.

DWS exposes two connectors: the Investment Details Connector we are about to use, which covers portfolio composition, and the Time Series Connector for historical data such as performance and fees.


## Building the asset allocation chart

### Step 1: Load Highcharts and the DWS connectors

Create an `index.html` file. Asset allocation is a snapshot rather than a time series, so Highcharts Core is all we need here:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>My First Morningstar Chart</title>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/connectors/morningstar/connectors-morningstar-dws.js"></script>
</head>
<body>
    <div id="container"></div>
    <script src="./demo.js"></script>
</body>
</html>
```

Loading the bundle registers the connectors with Highcharts as a side effect and exposes them on the global `HighchartsConnectors` object. That is all the wiring there is.

If you are working in an app project rather than a plain HTML page, install the package and import it instead:

```bash
npm install @highcharts/connectors-morningstar
```

```js
import Highcharts from 'highcharts';
import { InvestmentsConnector } from '@highcharts/connectors-morningstar/dws';
```

One difference to keep in mind as you read on. The `<script>` tag exposes everything on the global `HighchartsConnectors` object, which is why this tutorial writes `new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({ ... })`. An ES module sets no such global, so there you write `new InvestmentsConnector({ ... })` with whatever you imported. Everything else is the same. See [Installation](https://www.highcharts.com/docs/getting-started/installation) for more on the two loading methods.

### Step 2: Configure the Investment Details Connector

Now create `demo.js`. Because loading data is asynchronous, we will build the chart inside an `async` function and call it at the end of the file. The `InvestmentsConnector` describes a single security, and you choose what you want to know about it by naming one or more of available **converters**:

```js
async function createChart () {
    const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
        api: {
            access: {
                token: 'your_access_token'
            }
        },
        security: {
            id: '0P00000FIA'
        },
        converters: {
            AssetAllocationBreakdown: {}
        }
    });
    ...
```

Three of those options deserve a closer look.

**`security`** takes a single `id` — the Investment Details API describes one investment at a time. The identifier above is a Morningstar `performanceId`.

**`converters`** is the heart of this connector. Rather than one connector per data type, a single instance can request several converters at once, and each one populates its own named data tables. Here we ask for just `AssetAllocationBreakdown`; the empty object is not a placeholder to fill in, since most converters need no options at all. Some accept `startDate` and `endDate` to bound a historical series:

```js
converters: {
    AssetAllocationBreakdown: {},
    EquitySectorsBreakdown: {},
    EquityStyleBox: {
        startDate: '2025-01-01',
        endDate: '2025-12-01'
    }
}
```

That is one request block and one `load()` for three datasets — a fund profile page with six panels needs one connector with six converters, not six connectors.

**`api.access`** carries your credentials. If you prefer a username and password over a token, note that DWS uses its own dedicated fields:

```js
api: {
    access: {
        dwsUsername: 'your_username',
        dwsPassword: 'your_password'
    }
}
```
### Step 3: Load and read the data tables and render

This is the step where the connector's design pays off. `AssetAllocationBreakdown` populates three data tables, already shaped for Highcharts, each retrieved by name:

```js
    await connector.load();
```

```js
    const generalTable = connector.getTable('AssetAlloc'),
        canadaTable = connector.getTable('CanadianAssetAlloc'),
        underlyingTable = connector.getTable('UnderlyingAssetAlloc');
```

`AssetAlloc` is the general view, splitting net assets across bonds, cash, convertible bonds, equity and other. `CanadianAssetAlloc` is the Canadian view, and `UnderlyingAssetAlloc` breaks the portfolio down by underlying instrument type.

Every table has a `Type` column naming its categories. `AssetAlloc` and `CanadianAssetAlloc` then carry one column per measure — `Long`, `LongRescaled`, `Net`, and `Short` — while `UnderlyingAssetAlloc` holds a single `UnderlyingInstruments` column of percentages. Because this is snapshot data rather than a series, you hand whole columns to Highcharts: `Type` becomes the axis categories, and each measure becomes a series:

```js
    ...
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'General Asset Allocation Breakdown'
        },
        yAxis: {
            labels: {
                format: '{value}%'
            }
        },
        xAxis: {
            categories: generalTable.getColumn('Type')
        },
        series: [{
            name: 'Long',
            data: generalTable.getColumn('Long')
        }, {
            name: 'Long Rescaled',
            data: generalTable.getColumn('LongRescaled')
        }, {
            name: 'Net',
            data: generalTable.getColumn('Net')
        }, {
            name: 'Short',
            data: generalTable.getColumn('Short')
        }]
    });
}

createChart();
```

That is your first chart from Morningstar data: one connector, one converter, and no mapping layer in between.

Two more details worth knowing. `AssetAlloc` also carries US and non-US splits under prefixed column names — `Us_Long`, `NonUs_Net`, and so on — if you want to break the allocation down geographically without a second request. And the connector exposes the security's `performanceId` through its metadata, which is handy for a subtitle:

```js
subtitle: {
    text: `Performance ID: ${connector.metadata.AssetAllocationBreakdown.performanceId}`
}
```

## The other connector: Time Series

Portfolio composition is one half of DWS. The other is the `TimeSeriesConnector`, which targets Morningstar's Time Series API and returns historical data for up to 25 securities in a single request.

It follows the same three beats you just used — and, like the code above, it belongs inside an `async` function. Two things differ: instead of converters you pick data with a `category` and a `dataPoint`, and instead of one security you pass a list:

```js
const growthConnector = new HighchartsConnectors.MorningstarDWS.TimeSeriesConnector({
    api: {
        access: {
            token: 'your_access_token'
        }
    },
    ids: [{
        id: '0P00000FIA',
        idType: 'performanceId'
    }, {
        id: '0P00002PB8',
        idType: 'performanceId'
    }],
    category: 'performance',
    dataPoint: 'growth',
    startDate: '2024-10-30',
    endDate: '2025-10-30',
    currencyId: 'EUR'
});

await growthConnector.load();
```

`category` and `dataPoint` map directly onto Morningstar's Time Series API paths: take the two segments immediately after `time-series/v1/`, so `.../time-series/v1/performance/growth/` becomes `category: 'performance'` and `dataPoint: 'growth'`. The available categories are `performance`, `fees-expenses`, `portfolio-holdings`, `portfolio-analytics`, `fund-research`, `fund-sustainability`, `corporate-actions`, and `reference`. `performanceId` is the default `idType`, so you can omit it, and `currencyId` takes an ISO 4217 code — worth setting explicitly when you compare funds domiciled in different markets, since it otherwise defaults to each investment's own base currency.

Reading the result differs from the tables above. There is a single table whose first column is `Date`, holding `yyyy-MM-dd` strings sorted ascending. Request one security and the values land in a `Value` column; request several and each is suffixed with that security's `performanceId` — always the `performanceId`, whatever `idType` you asked with. Pair `Date` with a value column to get `[date, value]` rows, and Highcharts Stock takes them directly:

```js
Highcharts.stockChart('container', {
    series: [{
        name: 'Capital Group Global Equity Fund (LUX) B',
        data: growthConnector.getTable().getRows(
            void 0,
            void 0,
            ['Date', 'Value_0P00000FIA']
        )
    }]
});
```

`getRows()` takes a row offset and a row count, both skipped with `void 0` here, then the columns you want in the order you want them. Note the different bundle: a time series wants `highstock.js` rather than the `highcharts.js` we loaded in Step 1.

Highcharts 13 added a chart-level [`dataTable`](https://api.highcharts.com/highcharts/dataTable) option that accepts a `DataTable` instance directly, with [`series.dataMapping`](https://api.highcharts.com/highcharts/plotOptions.series.dataMapping) binding its columns to point properties — so a connector's table could be handed to the chart whole, without picking it apart first. The connectors target Highcharts 12 for now, so that route is not available yet.

## What else DWS gives you

`AssetAllocationBreakdown` is one of eight converters currently available on the Investment Details Connector. The rest follow the identical pattern — name the converter, read its tables:

- **Asset Allocation Breakdown** — allocation across asset classes, with general, Canadian, and underlying-instrument views.
- **Country and Regional Exposure Breakdown** — geographic exposure by region and country, for equity, fixed income, and revenue.
- **Equity Sectors Breakdown** — sector exposure at super-sector, sector, and industry levels, in the `EqSuperSectors`, `EqSectors`, and `EqIndustries` tables.
- **Fixed Income Sectors Breakdown** — fixed-income sector exposure across super, primary, and secondary sectors, plus per-region tables.
- **Equity Style Box** — Morningstar's proprietary style box and stock grades, as both a current grid and a historical series.
- **Equity Residual Risk and Return Sensitivity** — Alpha, Beta, and RSquare at daily and monthly granularity.
- **Equity Aggregates Residual Risk and Return Sensitivity** — aggregate residual-risk statistics with their company counts.
- **Prospectus Fees** — management, administration, and distribution fees, sales loads, and expense ratios.


## Two things that will save you time

**Develop against pre-fetched JSON.** Both DWS connectors accept an `api.json` option that bypasses authentication and the network entirely, using a payload you supply. It takes priority over `postman` and online API settings, which makes it ideal for local development, demos, and tests where you do not want to burn API calls:

```js
const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
    api: {
        json: {
            AssetAllocationBreakdown: {
                assetAllocationBreakdown: {
                    assetAllocCashPercLong: 4.49556,
                    assetAllocEquityPercLong: 95.50442
                },
                identifiers: {
                    performanceId: '0P00000FIA'
                },
                metadata: {}
            }
        }
    },
    security: {
        id: '0P00000FIA'
    },
    converters: {
        AssetAllocationBreakdown: {}
    }
});
```

For multi-converter requests, key the object by converter name, exactly as above.

**Set the region explicitly.** Unless you say otherwise, the DWS connectors send their requests to Morningstar's Americas endpoint. If your account is served by another region, set `api.url`:

```js
api: {
    url: 'https://www.emea-api.morningstar.com/',
    access: {
        token: 'your_access_token'
    }
}
```

The three regional endpoints are `https://www.us-api.morningstar.com/` (Americas, the default), `https://www.emea-api.morningstar.com/`, and `https://www.apac-api.morningstar.com/`.

## Using the connectors with Dashboards

Everything above creates connectors by hand, which is the pattern for Highcharts Core and Stock. With Highcharts Dashboards you do not have to: loading a bundle registers the connectors with the Dashboards registry automatically, and they become available in the data pool like any other connector type. Reference them as `MorningstarDWSInvestments` and `MorningstarDWSTimeSeries`:

```js
Dashboards.board('container', {
    dataPool: {
        connectors: [{
            id: 'prospectus-fees',
            type: 'MorningstarDWSInvestments',
            api: {
                access: {
                    token: 'your_access_token'
                }
            },
            security: {
                id: '0P00000FIA'
            },
            converters: {
                ProspectusFees: {}
            }
        }]
    }
    // ...gui and components
});
```

Components then bind to a table by name through `dataTableKey`, so a Grid or KPI reads the connector's output the same way the chart above did. `ProspectusFees` returns a single row, so the documentation pairs it with the `Invert` data modifier to turn it into a label/value list — worth knowing when a table's shape does not match the component you have in mind.

## More details and licensing

The full option reference for every connector and converter lives in the [Morningstar connectors documentation](https://www.highcharts.com/docs/morningstar/morningstar), and each converter page lists the demos that go with it.

Using the connectors requires a Highcharts Partner Data License and a Morningstar Direct Web Services account. If you would like to talk through your specific use case, or see the connectors running against your own data, [reach out to our team](https://shop.highcharts.com/contact/partner-data).
