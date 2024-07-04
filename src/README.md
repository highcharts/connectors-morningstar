Morningstar Connector Sources
=============================

The source code of the Highcharts Dashboards connectors consist of the following
folders:

* [src/Shared/] - Shared implementations for authentication, common options, and
                  error handling.

* [src/TimeSeries/] - Connector implementation for the Morningstar TimeSeries
                      API.



Release
-------

Do the following steps in order:

* Edit the version property of `package-build.json`.

* Run `npm i`.

* Run `npm run build`.

* Release `build/highcharts-morningstar-connectors-x.x.x.tgz`.



<!-- Link References -->

[src/Shared/]: ./Shared/README.md

[src/TimeSeries/]: ./TimeSeries/README.md
