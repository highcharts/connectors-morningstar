Changelog
=========

v1.2.0
------

## What's Changed

### Bugfixes
* Fixed broken links in docs.

### Enhancements
* Added missing docs for `TimeSeries Rating` endpoint.
* Added `underlyingHoldings` support to `XRay` connector.
* Added undocumented `Return` and `RollingReturn` Time Series endpoints.
* Added scrollbar to the demo list for smaller devices.
* Improved Investment Screener demo.
* Added `SecurityCompareConnector`.
* Added `PortfolioHoldings` to `SecurityDetails` connector response.
* Added `MarketCap` converter.
* Added `dataModifier` support to connectors.
* Added `Metadata` converter for `SecurityDetails`.
* Added support for loading env file from localstorage in demos.
* Added the following new converters for `SecurityDetails` and `SecurityCompare`: `IndustryBreakdown`, `IndustryGroupBreakdown`, and `BondStatistics`.

### Upgrade notes
* Fixed #64, XRay data structure didn't include `timePeriod` which resulted in merging all of the data in one column. Column name `XRay_TotalReturn_TimePeriod` is now changed to `XRay_TotalReturn_M1` and `XRay_TotalReturn_Value` is changed to `XRay_TotalReturn_M1_Value`. Where `M1` is used, it will be automatically changed to returned periods like `M1/M2/M3/M6` etc.


**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v1.1.0...v1.2.0

v1.1.0
------

## What's Changed

### Bugfixes
* Fixed #57, not a function warning in demos.
* Fixed #54, XRayConnector invalid response.
* Fixed #51, SecurityDetails portfolios data.

### Enhancement
* Made changelog more readable.
* Added docs for ESG, FindSimilar and Regulatory Screeners.
* Improved demo page UI.
* Added InvestorPreferences Screener.

**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v1.0.1...v1.1.0

v1.0.1
------

## What's Changed
* Updated license by @pawelfus in https://github.com/highcharts/connectors-morningstar/pull/58
* Added license header to dist files. by @pawelfus in https://github.com/highcharts/connectors-morningstar/pull/60

## New Contributors
* @pawelfus made their first contribution in https://github.com/highcharts/connectors-morningstar/pull/58

**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v1.0.0...v1.0.1



v1.0.0
------

## What's Changed
* Fixed failing RNANews test, by @DJTechnoo in https://github.com/highcharts/connectors-morningstar/pull/48
* Adjusted docs titles, by @kamil-musialowski in https://github.com/highcharts/connectors-morningstar/pull/50
* Created manual fetch demo, by @DJTechnoo in https://github.com/highcharts/connectors-morningstar/pull/53
* Corrected URLs, by @bm64 in https://github.com/highcharts/connectors-morningstar/pull/47
* Added security details docs, by @bm64 in https://github.com/highcharts/connectors-morningstar/pull/49
* Added investment screener, by @pawellysy in https://github.com/highcharts/connectors-morningstar/pull/52
* Added Morningstar to HC namespace, by @kamil-musialowski in https://github.com/highcharts/connectors-morningstar/pull/46

## New Contributors
* @kamil-musialowski made their first contribution in https://github.com/highcharts/connectors-morningstar/pull/50
* @bm64 made their first contribution in https://github.com/highcharts/connectors-morningstar/pull/47
* @pawellysy made their first contribution in https://github.com/highcharts/connectors-morningstar/pull/52

**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v0.7.0...v1.0.0



v0.7.0
------
* Added security details connector
* Added support for web service exceptions
* Added support for dashboards connectors
* Added MorningstarURL as a shared class



v0.6.0
------

* Added goal analysis connector
* Added risk score connector
* Added x-ray connector
* Added CLI command for API docs
* Fixed dashboards missing in RNANews demo
* Fixed postman support in CLI server



v0.5.0
------

* Initial public release
