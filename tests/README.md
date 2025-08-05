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

If you would like to run one test folder or file, you can do that by passing as an argument:
- folder name (to run all test files in a chosen folder): `npm run test -- --tests TimeSeries`
- file name (to run tests in a chosen file): `npm run test -- --tests CumulativeReturn`
- path to a specific file: `npm run test -- --tests XRay/RiskStatistics` (works the same as file name)
- full relative path: `npm run test -- --tests tests/SecurityDetails/SecurityDetailsConnector` (works the same as file name)

Arguments are not case sensitive (i.e `xray` and `XRay` works the same) and adding `.test.ts` extension to filename is optional.
