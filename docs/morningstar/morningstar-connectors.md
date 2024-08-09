# Morningstar Connectors

With the Highcharts Morningstar Connectors you can access the Morningstar Direct
Web Services. These services provide finance-related information to different
kinds of financial assets.



## Requirements

* Morningstar credentials: You will need credentials to access the services.
  This can be either:
  - Access token from your server
  - Usernam and password

* Morningstar standalone for Highcharts:
  `@highcharts/morningstar-connectors/morningstar-standalone`

* Morningstar connectors for Dashboards:
  `@highcharts/morningstar-connectors`

* Package bundler like Webpack.



## Quick Start

The integration of the Morningstar connectors differs between Highcharts core
products and Highcharts Dashboards.



### Highcharts Quick Start

You can connect Highcharts core products with Morningstar by using the
`morningstar-standalone` bundle. You have to manually create the connector and
assing the resulting table to your series options.



### Highcharts Dashboards Quick Start

For Highcharts Dashboards you just need to load teh `morningstar-connectors`
bundle, which will register all connectors to the Dashboards registry. All
Morningstar connectors are then available in the data pool as other connector
types.
