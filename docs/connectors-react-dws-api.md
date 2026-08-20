# Getting Started: Highcharts Connectors for Morningstar's DWS API in React

Throughout reading the docs you've probably learned how to set up a plain project with Highcharts + Connectors. Now, chances are you're probably using a framework for your website, thus in this article you will learn how to set up Highcharts React integration with Morningstar's DWS API in a few steps.

## What is a Highcharts React integration?

The latest Highcharts React integration allows you to seamlessly incorporate Highcharts into your React application in a more Reactive style. This means that instead of having to import the whole Highcharts code file, you can simply import the components needed for your visualization and compose into a nicely crafted chart. Later on, you will learn how to install, import and finally display a chart using Highcharts React integration. For further information, you can dive into the [getting started article](https://www.highcharts.com/docs/react/getting-started).

## Morningstar's DWS API in brief

The DWS (Direct Web Services) API from Morningstar is the new API service, which includes `Investment Details API` and `Time Series API` endpoints along with more to come later. In order to get the general idea of the DWS, you can glance through [this article](./connectors/morningstar.md).

## Setting up Highcharts in your React project

In this section we assume that you already have a React project set up and running, whether it's Vite, Next.js or a plain React app. If not, follow the [official React guide](https://react.dev/learn/creating-a-react-app) for setting up one first.

### Install the package

In your terminal, run the command below to install the latest Highcharts React package. Note that the latest release requires a version of React **18.3.1** or higher.

```bash
npm install @highcharts/react
```

### Create a minimal chart

In order to render a simple chart with Highcharts React, you just have to import the Chart component along with the type of series you'd like to show - and that's it! You can copy and paste the syntax below into your project in order to view a simple line chart.

```jsx
import { StockChart } from '@highcharts/react/Stock';
import { LineSeries } from '@highcharts/react/series/Line';
import { Title } from '@highcharts/react/options';

export default function LineChart() {
    return (
        <StockChart>
            <Title>Fund growth</Title>
            <LineSeries name="Mock data" data={[3, 4, 1, 5, 2]} />
        </StockChart>
    );
}
```

## Connecting to the Morningstar DWS API

### Install the package and set it up

A first step in order to combine Highcharts React and DWS API is to install the Highcharts Connectors for Morningstar, which allows you to easily pull the financial data of your interest into your frontend application in a plug-and-play format for Highcharts. Download and install the Morningstar Connectors package by running this command:

```bash
npm install @highcharts/connectors-morningstar
```

Then, import the package. For the sake of simplicity, we're gonna import it directly into the same place as where the chart lies, however you can manage the data differently depending on your use case.

```jsx
import * as HighchartsConnectorsDWS from '@highcharts/connectors-morningstar/dws';
```

### Authenticate the connector and fetch data

In order to make requests to the Morningstar API, you need to authenticate yourself. There are two ways of doing so; you can either use the access token from your server, or retrieve the username and password from your `.env` file and pass them directly into the connector's API options. We will create a simple async function with the purpose of fetching the data directly, wrapped inside the `useEffect` hook.

```jsx
const [data, setData] = useState([]);

useEffect(() => {
    const getData = async () => {
        const connector = new HighchartsConnectorsDWS.TimeSeriesConnector({
            api: {
                access: {
                    username: env.dws_username,
                    password: env.dws_password
                }
            },
            ids: [{
                id: '0P00000FIA',
                idType: 'performanceId'
            }],
            category: 'performance',
            dataPoint: 'growth',
            startDate: '2024-10-30',
            endDate: '2025-10-30'
        });

        await connector.load();

        // Set the data from the connector
        setData(connector.getTable().getRows(
            void 0, void 0, ['Date', 'Value']
        ));
    };

    // Call the async function to fetch the data
    getData();
}, []);
```

Keep in mind that credentials passed this way are bundled into your frontend and therefore visible to anyone using your application. That is convenient while developing locally, but for production we recommend the access token approach, where the token is issued by your own server.

### Using an access token instead

Exchanging credentials for a token is something your own server should handle - that's outside the scope of this article. All the endpoint needs to do is return a valid Morningstar access token. Once you have it, only the `api.access` block changes: `{ username, password }` becomes `{ token }`, sourced from a `fetch` to your own backend instead of `.env`. Everything else stays exactly the same.

```jsx
const getData = async () => {
    // Retrieve the token from the server
    const tokenResponse = await fetch('/api/morningstar-token');
    const { token } = await tokenResponse.json();

    const connector = new HighchartsConnectorsDWS.TimeSeriesConnector({
        api: {
            access: { token }
        },
        // ...rest of the code stays the same
    });

    await connector.load();

    setData(connector.getTable().getRows(
        void 0, void 0, ['Date', 'Value']
    ));
};
```

### Pass the data into the series component

At last, we need to pass the retrieved data into our Stock Chart component in order to display it. You can simply replace the mock data that we've previously set into the `data` object.

```jsx
return (
    <StockChart>
        <Title>Fund growth</Title>
        <LineSeries name="Capital Group Global Equity Fund (LUX) B" data={data} />
    </StockChart>
);
```

### Putting it all together

Below is the complete component, with every step above combined into a single file. Note how the hooks live inside the LineChart component, above the return, and how all of the imports sit together at the top of the file.

```jsx
import { useEffect, useState } from 'react';
import { StockChart } from '@highcharts/react/Stock';
import { LineSeries } from '@highcharts/react/series/Line';
import { Title } from '@highcharts/react/options';
import * as HighchartsConnectorsDWS from '@highcharts/connectors-morningstar/dws';

export default function LineChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            // Retrieve token from the server
            const tokenResponse = await fetch('/api/morningstar-token');
            const { token } = await tokenResponse.json();

            const connector = new HighchartsConnectorsDWS.TimeSeriesConnector({
                api: {
                    access: { token }
                },
                ids: [{
                    id: '0P00000FIA',
                    idType: 'performanceId'
                }],
                category: 'performance',
                dataPoint: 'growth',
                startDate: '2024-10-30',
                endDate: '2025-10-30'
            });

            await connector.load();

            // Set the data from the connector
            setData(connector.getTable().getRows(
                void 0, void 0, ['Date', 'Value']
            ));
        };

        // Call the async function to fetch the data
        getData();
    }, []);

    return (
        <StockChart>
            <Title>Fund growth</Title>
            <LineSeries name="Capital Group Global Equity Fund (LUX) B" data={data} />
        </StockChart>
    );
}
```

And that is it - a fully functioning chart including data fetched from Morningstar DWS API successfully integrated into your React application.

## Licensing

Using the connectors requires a Highcharts Partner Data License and a Morningstar Direct Web Services account. If you would like to talk through your specific use case, or see the connectors running against your own data, [reach out to our team](https://shop.highcharts.com/contact/partner-data).
