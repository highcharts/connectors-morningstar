Morningstar Connectors
======================

Collection of [Highcharts Connectors] for [Morningstar Direct Web Services].

There are two versions of the scripts, and the difference between them is the
Morningstar API they use. The version with the `dws` suffix uses the newer API,
which provides access to the Investment Details API and the Time Series API,
with more to come in the future.

The standard version of the script provides access to all APIs described here:
[Highcharts Connectors Docs].

Links
-----

* Official website: [www.highcharts.com](http://www.highcharts.com)
* Product page: [www.highcharts.com/products/data-connector-for-morningstar](https://www.highcharts.com/products/data-connector-for-morningstar/)
* Demos: [https://www.highcharts.com/demo](https://www.highcharts.com/demo#highcharts-stock-demo-general)
* Download: [www.highcharts.com/download](http://www.highcharts.com/download)
* License: [www.highcharts.com/license](https://www.highcharts.com/license)
* Documentation: [www.highcharts.com/docs/morningstar/morningstar](https://www.highcharts.com/docs/morningstar/morningstar)
* Support: [www.highcharts.com/support](http://www.highcharts.com/support)
* Issues: [Working repo](https://github.com/highcharts/connectors-morningstar/issues)


Usage
-----

The connectors are available as

* ES6 modules by importing `@highcharts/connectors-morningstar` or
`@highcharts/connectors-morningstar/dws` in your project.

* UMD bundle by adding the
`@highcharts/connectors-morningstar/connectors-morningstar.js` or
`@highcharts/connectors-morningstar/connectors-morningstar-dws.js` script to
your web app or web page.

* You can also include the UMD bundle for testing purposes directly in HTML:
  ``` HTML
  <script src="https://code.highcharts.com/connectors/morningstar/connectors-morningstar.js"></script>
  ```

  ``` HTML
  <script src="https://code.highcharts.com/connectors/morningstar/connectors-morningstar-dws.js"></script>
  ```

<!-- Link References -->

[Highcharts Connectors]: https://www.highcharts.com/products/morningstar-data/

[Highcharts Connectors Docs]: https://www.highcharts.com/docs/morningstar/morningstar/

[Morningstar Direct Web Services]: https://developer.morningstar.com/direct-web-services/
