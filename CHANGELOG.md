Changelog
=========

v3.1.0
------

## What's Changed

## Enhancements
* Dashboards v4.1 compatibility adjustments in https://github.com/highcharts/connectors-morningstar/pull/169
* Investment Details (Sync, Global): Created Prospectus Fees converter in https://github.com/highcharts/connectors-morningstar/pull/166
* Investment Details (Sync, Global): Created TimeSeries converter in https://github.com/highcharts/connectors-morningstar/pull/163
* Investment Details (Sync, Global): Created Equity Residual Risk converters in https://github.com/highcharts/connectors-morningstar/pull/167

**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v3.0.0...v3.1.0

v3.0.0
------

## What's Changed

## Enhancements
* Portfolio Analysis XRay (Americas): Added `FundStatistics` metadata properties (`Analyzed`/`NotAnalyzed`) in https://github.com/highcharts/connectors-morningstar/pull/154
* Security Details (SD): Refactored and adjusted `RiskScore` converter in https://github.com/highcharts/connectors-morningstar/pull/160
* Investment Details (Sync, Global): Created Direct Web Services Investment Details connector in https://github.com/highcharts/connectors-morningstar/pull/151
* Investment Details (Sync, Global): Created Sector Breakdown converter in https://github.com/highcharts/connectors-morningstar/pull/156
* Investment Details (Sync, Global): Created Asset Allocation Breakdown converter in https://github.com/highcharts/connectors-morningstar/pull/155
* Investment Details (Sync, Global): Created Region Exposure converter in https://github.com/highcharts/connectors-morningstar/pull/153
* Investment Details (Sync, Global): Created Equity Style Box converter in https://github.com/highcharts/connectors-morningstar/pull/161
* Investment Details (Sync, Global): Created Country Exposure converter in https://github.com/highcharts/connectors-morningstar/pull/159

**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v2.2.0...v3.0.0

v2.2.0
------

## What's Changed

### Enhancements
* Dashboards v4 compatibility adjustments in https://github.com/highcharts/connectors-morningstar/pull/149


**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v2.1.1...v2.2.0

v2.1.1
------

## What's Changed

### Enhancements
* Portfolio Analysis XRay (Americas): Added `WorldRegions` converter in https://github.com/highcharts/connectors-morningstar/pull/146

**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v2.1.0...v2.1.1

v2.1.0
------

## What’s Changed

### Bugfixes
* Fixed wrong region detect, added default US endpoint URL for PA US Connectors in https://github.com/highcharts/connectors-morningstar/pull/141
### Enhancements
* Portfolio Analysis ans Security Details APIs: Added raw response to connectors metadata in https://github.com/highcharts/connectors-morningstar/pull/143
* Security Details (SD): Added `RiskStatistics` converter in https://github.com/highcharts/connectors-morningstar/pull/142
* Portfolio Analysis (Americas): Added `Performance` Connector in https://github.com/highcharts/connectors-morningstar/pull/116
* Portfolio Analysis (Americas): Added `XRay` Connector in https://github.com/highcharts/connectors-morningstar/pull/119
* Portfolio Analysis (Americas): Added `HypoPerformance` Connector  in https://github.com/highcharts/connectors-morningstar/pull/122
* Portfolio Analysis Performance Connector (Americas): Added `CalendarYearsReturns` converter in https://github.com/highcharts/connectors-morningstar/pull/125
* Portfolio Analysis Performance Connector (Americas): Added `TrailingReturns` converter in https://github.com/highcharts/connectors-morningstar/pull/128
* Portfolio Analysis Performance Connector (Americas): Added `CorrelationMatrix` converter in https://github.com/highcharts/connectors-morningstar/pull/139
* Portfolio Analysis Performance Connector (Americas): Added `RiskStatistics` converter in https://github.com/highcharts/connectors-morningstar/pull/137
* Portfolio Analysis Performance Connector (Americas): Added `MPTStatistics` converter in https://github.com/highcharts/connectors-morningstar/pull/138
* Portfolio Analysis Hypothetical Performance Connector (Americas): Added `Growth` converter in https://github.com/highcharts/connectors-morningstar/pull/131
* Portfolio Analysis XRay (Americas): Added `EquityStyle` and `FixedIncomeStyle` converters in https://github.com/highcharts/connectors-morningstar/pull/120
* Portfolio Analysis XRay (Americas): Added `CreditQuality` converter in https://github.com/highcharts/connectors-morningstar/pull/123
* Portfolio Analysis XRay (Americas): Added `Holdings` converter in https://github.com/highcharts/connectors-morningstar/pull/130
* Portfolio Analysis XRay (Americas): Added `MPTStatistics` converter in https://github.com/highcharts/connectors-morningstar/pull/132
* Portfolio Analysis XRay (Americas): Added `FundStatistics` converter in https://github.com/highcharts/connectors-morningstar/pull/127
* Portfolio Analysis XRay (Americas): Added `MatrixCorrelation` converter in https://github.com/highcharts/connectors-morningstar/pull/134
* Portfolio Analysis XRay (Americas): Added `CalendarYearReturns` converter in https://github.com/highcharts/connectors-morningstar/pull/129
* Portfolio Analysis XRay (Americas): Added `RiskStatistics` converter in https://github.com/highcharts/connectors-morningstar/pull/133
* Portfolio Analysis XRay (Americas): Added `RollingReturns` converter in https://github.com/highcharts/connectors-morningstar/pull/136
* Portfolio Analysis XRay (Americas): Added `AssetAllocation` converter in https://github.com/highcharts/connectors-morningstar/pull/126
* Portfolio Analysis XRay (Americas): Added `TrailingReturns` converter in https://github.com/highcharts/connectors-morningstar/pull/135

**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v2.0.0...v2.1.0

v2.0.0
------

## What's Changed

### Bugfixes
* Security Details (SD): Fixed empty columns in `MetaConverter` in https://github.com/highcharts/connectors-morningstar/pull/105

### Enhancements
* Refactored Security details (SD) and compare to support multi data table in https://github.com/highcharts/connectors-morningstar/pull/95
* Refactored Portfolio Analysis XRay (EMEA/APAC) to support multiple converters and multi data tables in https://github.com/highcharts/connectors-morningstar/pull/96
* Portfolio Analysis XRay (EMEA/APAC): Added `CreditQuality` converter in https://github.com/highcharts/connectors-morningstar/pull/107
* Portfolio Analysis XRay (EMEA/APAC): Added respective columns for std. dev periods and values in https://github.com/highcharts/connectors-morningstar/pull/102
* Portfolio Analysis XRay (EMEA/APAC): Added support for multiple types of `DataPoints` in https://github.com/highcharts/connectors-morningstar/pull/108
* Portfolio Analysis XRay (EMEA/APAC):   Added mapped `x` & `y` categories to all `StyleBox` converters in https://github.com/highcharts/connectors-morningstar/pull/110
* Security Details (SD): Added Historical Performance Converter in https://github.com/highcharts/connectors-morningstar/pull/104
* Security Details (SD): Added mapped `x` & `y` categories to all `StyleBox` converters in https://github.com/highcharts/connectors-morningstar/pull/110

### Upgrade notes

1. Security Details (SD): Adjusted `SecurityDetails` & `SecurityCompare` connectors' column names to match the naming convention.
Previously, connectors could return only one data type. This has now been updated to support multiple data tables per connector, reducing number of requests and improving flexibility. Key changes include:

    - Added support for multiple converter types available in one connector: `converters: ['AssetAllocations', 'RegionalExposure']`. Setting converter.type is still available for backwards compatibility.
    - Each returned converter type is now accessible via a key in the `dataTables`, so in order to access data use `connector.dataTables['AssetAllocations']` or `connector.dataTables.AssetAllocations`, instead of the `connector.table`
    - Full list of renamed column names for converters: https://github.com/highcharts/connectors-morningstar/pull/109

2. Portfolio Analysis XRay (EMEA/APAC): Adjusted `XRay` column names to match the naming convention.
Previously, all of the returned data points were stored in one table. This has now been updated to support multiple data tables per connector, reducing number of requests and improving flexibility. Key changes include:

    - Added splitting returned data points from connectors to multiple data tables.
    - Added missing properties like `Type/ReturnType/Date/...`  to column names.
    - Added `_Benchmark` suffix for all columns generated from benchmark data point type.
    - Each returned data point is now accessible via a key in the `dataTables`, so in order to access data use `connector.dataTables['StyleBox']` or `connector.dataTables.StyleBox`, instead of the `connector.table`
    - Removed connector and converter name from column name.
    - Full list of renamed column names for converters: https://github.com/highcharts/connectors-morningstar/pull/111 


**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v1.3.0...v2.0.0

v1.3.0
------

## What's Changed

### Bugfixes
* Fixed inactive filter buttons in Investor Preferences demo.
* Fixed handling of undefined `TrailingPerformance` in Security Details connector.

### Enhancements
* Updated Highcharts and Dashboards to latest releases.
* Added `BondStyleBoxBreakdowns` converter for Security Details connector.
* Added `StyleBox` converter for Security Details connector.
* Added `CreditQualityBreakdown` for Security Details connector.


**Full Changelog**: https://github.com/highcharts/connectors-morningstar/compare/v1.2.0...v1.3.0

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
