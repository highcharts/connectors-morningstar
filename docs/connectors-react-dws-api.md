# Getting Started: Highcharts Connectors for Morningstar's DWS API in React

Throughout reading the docs you've probably learned how to setup a plain project with Highcharts + Connectors. Now, chances are you're probably using a framework for your website, thus in this article you will learn how to setup Highcharts React integration with Morningstar's DWS API in few steps.

## What is a Highcharts React integration?

The latest Highcharts React integration allows you to seamlessly incorporate Highcharts into your React application in a more Reactive style. This means that instead of having to import whole Highcharts code file, you can simply import the components needed for your visualization and compose into a nicely crafted chart. Later on, you will learn on how to install, import and finally display a chart using Highcharts React integration. For further information, you can dive into the [getting started article](https://www.highcharts.com/docs/react/getting-started).

## Morningstar's DWS API in a brief

The DWS (Direct Web Services) API from Morningstar is the new API service, which includes `Investment Details` and `Time Series` endpoints along more to come latter. In order to get the general idea of the DWS, you can glance through [this article](./connectors/morningstar.md).

## Setting up Highcharts in your React project

In this section we assume that you already have a React project set up and running, either if it's Vite, Next.js or plain React app. If not, follow the [official React guide](https://react.dev/learn/creating-a-react-app) for setting up one first.


### Install the package

In your terminal, run below command to instal latest Highcharts React package. Note that the latest release requires a version of React 18.3.1 or higher.

```bash
npm install @highcharts/react
```

### Create a minimal chart

In order to render a simple chart in with Highcharts React, you just have to import the Chart component along with the series of type you'd like to show - and that's it! You can copy-paste below syntax into your project in order to view a simple line chart.

```javascript
import { StockChart } from '@highcharts/react/Stock';
import { LineSeries } from "@highcharts/react/series/Line";
import { Title } from '@highcharts/react/options';

export default function LineChart() {
  return (
     <StockChart>
      <Title>Fund growth</Title>
      <LineSeries name="0P00000FIA" data={[3, 4, 1, 5, 2]} />
    </StockChart>
  );
}
```

## Connecting to the Morningstar DWS API

### Install the package and set it up

A first step in order to combine Highcharts React and DWS API is to install the Highcharts Connectors for Morningstar, which allows you to easily pull the financial data of your interest into your frontend application in a plug&play format for Highcharts. Download and install the DWS connector package by running this command:

```bash
npm install @highcharts/connectors-morningstar/dws
```

Than, import the package. For the sake of simplicity, we're gonna import it directly into the same place as where the chart lies, however you can manage the data differently depending on your use case.

```javascript
import * as HighchartsConnectorsDWS from '@highcharts/connectors-morningstar/dws';
```

### Authenticate the connector and fetch data

In order to make requests to the Morningstar API, you need to authenticate yourself. There are two ways of doing so; you can either use the access token from your server, or retrieve the username and password from your `.env` file and pass it directly into the connector's api options. We will create a simple async function with purpose of fetching the data directly, wrapped inside the `useEffect` hook.


```javascript
const [data, setData] = useState([]);

useEffect(() => {
    const getData = async () => {
        const connector = new HighchartsConnectorsDWS.TimeSeriesConnector({
            api: {
                access: {
                    username: env.dws_username
                    password: env.dws_password
                }
            },
            ids: [{ id: '0P00000FIA', idType: 'performanceId' }],
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
    }

    // Call the async function to fetch the data
    getData();
}, []);
```
### Pass the data into our series component

At last, we need to pass the retrieved data into our Stock Chart component in order to display it. You can simply replace the mock data that we've previously set into the `data` object.

```javascript
 return (
    <StockChart>
      <Title>Fund growth</Title>
      <LineSeries name="0P00000FIA" data={data} />
    </StockChart>
  );
```

And that is it. A fully functioning chart including data fetched from Morningstar DWS API succesfully integrated into your React application.

## Licensing

Using the connectors requires a Highcharts Partner Data License and a Morningstar Direct Web Services account. If you would like to talk through your specific use case, or see the connectors running against your own data, [reach out to our team](https://shop.highcharts.com/contact/partner-data).
