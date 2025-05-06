Highcharts Morningstar Connectors Tools
=======================================

These scripts are used to prepare the distribution of new releases.



API
---

Run `npm api` to parse API options and create a local API server.

You can also run `npx ts-node tools/api` to create the `api.json` in the
`bin/Static` folder.


Dry-run
-------

1. Run `npm test` and make sure everything works as expected.

2. Run `npx ts-node tools/dist --bucket [...] --region [...] --release [x.x.x] --dryrun`.



Release
-------

1. Run `npm test` and make sure everything works as expected.

2. Run `npx ts-node tools/dist --bucket [...] --region [...] --release [x.x.x]`.



Unit-Tests
----------

You need to add an `.env` file in the repository root, that defines
`MORNINGSTAR_PASSWORD` and `MORNINGSTAR_USERNAME`.

Run `nxp ts-node tools/tests` to run only unit-tests.
