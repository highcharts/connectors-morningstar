Morningstar Connectors Tests
============================

This folder contains all tests related to the Highcharts Dashboards connectors.



Configuration
-------------

You have to define the Morningstar credentials to be able to run the tests.

1. Create in your working folder an `.env` file.

2. Add the following content with your Morningstar credentials.
   ``` Shell
   MORNINGSTAR_PASSWORD="password123"
   MORNINGSTAR_USERNAME="username123"
   ```

3. Now you can run the tests with:

   - `npm run test` (to build the code and run the tests)
   - `npm run test:tests` (to run the tests without building the code)

If you would like to run one test folder or file, you can do that by passing into arguments:
- folder name (to run all test files in a chosen folder) `npm run test TimeSeries`
- file name (to run test in chosen file) `npm run test CumulativeReturn`
- path to specific file `npm run test XRay/RiskStatistics` (works the same as file name)

Arguments are not case sensitive (i.e `xray` and `XRay` works the same).
