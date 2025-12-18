# Investments Connector

The `HighchartsConnectors.MorningstarDWS.InvestmentsConnector` is a connector
that allows access to the newer Morningstar API, which provides the Investment
Details API and the Time Series API.

## How to use Investments Connector

The `InvestmentsConnector` allows you to select multiple converters
simultaneously.

```js
new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
    api: {
        access: {
            token: 'your_access_token'
        }
    },
    security: {
        id: '0P00000FIA'
    },
    converters: {
        // Chosen converters
    }
});
```

Below, you will find the currently implemented data converters, with more
planned for the future.

## Available data converters

Here is a list of available converters along with their corresponding datatable
names:

* **EquitySectorsBreakdown**:
    - EqSuperSectors
    - EqSectors
    - EqIndustries

* **FixedIncomeSectorsBreakdown**:
    - IncSuperSectors
    - IncPrimarySectors
    - IncSecondarySectors
    - IncBrkSuperSectors
    - IncBrkPrimarySectors
    - IncBrkSecondarySectors

* **EquityStyleBox**:
    - StockStyle
    - TimeSeries

## Investments Connector Examples

```js
const connector = new HighchartsConnectors.MorningstarDWS.InvestmentsConnector({
    postman: {
        environmentJSON: postmanJSON['postmanEnvironmentDWS']
    },
    security: {
        id: '0P00006W6Q'
    },
    converters: {
        EquitySectorsBreakdown: {},
        FixedIncomeSectorsBreakdown: {},
        EquityStyleBox: {
            startDate: '2025-01-01',
            endDate: '2025-12-01'
        }
    }
});

await connector.load();
```

### The `EquitySectorsBreakdown` converter example:

```js
const dataTable = connector.getTable('EqSuperSectors');

Highcharts.chart('container', {
    title: {
        text: 'Equity Super Sectors Breakdown'
    },
    subtitle: {
        text: dataTable.metadata.performanceId
    },
    series: [{
        name: 'Equity Super Sectors Long Rescaled',
        data: dataTable.getRows(
            void 0,
            void 0,
            ['Type', 'PercLongRescaled']
        )
    }, {
        name: 'Equity Super Sectors Long',
        data: dataTable.getRows(
            void 0,
            void 0,
            ['Type', 'PercLong']
        )
    }, {
        name: 'Equity Super Sectors Net',
        data: dataTable.getRows(
            void 0,
            void 0,
            ['Type', 'Net']
        )
    }]
});
```

### The `FixedIncomeSectorsBreakdown` converter example:

```js
const dataTable = connector.getTable('IncBrkSuperSectors');

Highcharts.chart('container-brk-super-sectors', {
    title: {
        text: 'Fixed Income Super Sectors Breakdown'
    },
    subtitle: {
        text: dataTable.metadata.performanceId
    },
    series: [{
        name: 'Fixed Income Breakdown Super Sectors Long',
        data: dataTable.getRows(
            void 0,
            void 0,
            ['Fixd_Inc_Brkdwn_Type', 'Fixd_Inc_Brkdwn_CalcLongFiperc']
        )
    }, {
        name: 'Fixed Income Breakdown Super Sectors Short',
        data: dataTable.getRows(
            void 0,
            void 0,
            ['Fixd_Inc_Brkdwn_Type', 'Fixd_Inc_Brkdwn_CalcShortFiperc']
        )
    }, {
        name: 'Fixed Income Breakdown Super Sectors Net',
        data: dataTable.getRows(
            void 0,
            void 0,
            ['Fixd_Inc_Brkdwn_Type', 'Fixd_Inc_Brkdwn_CalcNetFiperc']
        )
    }]
});
```

### The `EquityStyleBox` converter example:

```js
const dataTable = connector.getTable('StockStyle');

Highcharts.chart('container', {
    chart: {
        type: 'heatmap'
    },
    title: {
        text: 'Equity Style Box'
    },
    subtitle: {
        text: `Stock Style (${dataTable.metadata.performanceId})`,
        align: 'left'
    },
    xAxis: {
        categories: ['Value', 'Blend', 'Growth'],
        lineWidth: 0,
        gridLineWidth: 0,
        opposite: true,
        labels: {
            style: {
                fontSize: '1rem',
                color: '#6e7481'
            }
        }
    },
    yAxis: {
        categories: ['Small', 'Medium', 'Large'],
        gridLineWidth: 0,
        title: {
            text: ''
        },
        labels: {
            rotation: -90,
            style: {
                fontSize: '1rem',
                color: '#6e7481'
            }
        }
    },
    legend: {
        layout: 'vertical',
        verticalAlign: 'top',
        align: 'right',
        y: 75,
        symbolRadius: 0,
        itemMarginTop: 9,
        itemMarginBottom: 9
    },
    colorAxis: {
        dataClasses: [{
            from: 49,
            color: '#014ce5',
            name: '50+'
        }, {
            from: 24,
            to: 49,
            color: '#487cea',
            name: '25-49'
        }, {
            from: 9,
            to: 24,
            color: '#acc2f3',
            name: '10-24'
        }, {
            from: 0,
            to: 9,
            color: '#fafafa',
            name: '0-9'
        }]
    },
    series: [{
        name: 'Equity Style Box',
        borderWidth: 1,
        borderColor: '#e5e7e9',
        keys: ['x', 'y', 'value'],
        data: dataTable.getRows(0, 9),
        dataLabels: {
            enabled: true,
            format: '{value:.0f}%',
            style: {
                fontSize: '1rem',
                textOutline: 'none'
            }
        }
    }]
});
```

## Relevant demos

Examples of using the InvestmentsConnector are available in our demos:

- **Highcharts Core + Morningstar Equity Sectors Breakdown**
- **Highcharts Core + Morningstar Fixed Income Sectors Breakdown**
- **Highcharts Core + Morningstar Equity Style Box**
- **Highcharts Core + Morningstar Equity Style Box Time Series**

[Morningstar’s Investment Details API]: https://developer.morningstar.com/direct-web-services/documentation/direct-web-services/investment-details---managed-investments---async/openapi-specification
