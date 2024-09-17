Morningstar Connectors Tests
============================

This folder contains all tests related to the Highcharts Dashboards connectors.



Configuration
-------------

You have to define the Morningstar credentials to be able to run the tests.

1. Create in your working folder a `.env` file.

2. Add the following content with your Morningstar credentials.
   ``` Shell
   MORNINGSTAR_PASSWORD="password123"
   MORNINGSTAR_USERNAME="username123"
   ```

3. Now you can run the tests with:

   - `npm run test:units`
