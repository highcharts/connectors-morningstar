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

Sitemap
-------

Run `npm run sitemap` (or `npx ts-node tools/sitemap`) to regenerate
`docs/sitemap.xml`. URLs mirror `docs/llms.txt`; `<lastmod>` is taken per page
from the last git commit that touched the source markdown, so re-run this after
editing docs rather than hand-editing the dates.

Unit-Tests
----------

You need to add an `.env` file in the repository root, that defines
`MORNINGSTAR_PASSWORD` and `MORNINGSTAR_USERNAME`.

Run `nxp ts-node tools/tests` to run only unit-tests.
