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

Docs metadata (llms.txt & sitemap.xml)
--------------------------------------

`docs/llms.txt` and `docs/sitemap.xml` are generated from a single source of
truth, `tools/libs/DocsPages.ts`, so they never drift apart. After editing the
docs pages there (or adding a docs page), regenerate both with:

    npm run docs:meta

You can also run them individually: `npm run llms` and `npm run sitemap`.

A `pre-commit` hook runs this automatically whenever a commit touches the docs
pages, the manifest or the generators, and stages the regenerated files, so you
normally do not need to remember to run it by hand.

The page list is cross-checked against the markdown files in `docs/connectors`:
a new page missing from `DocsPages.ts` is warned about (and still indexed in
the sitemap under a default priority), so nothing is silently dropped.
`<lastmod>` in the sitemap is taken per page from the last git commit that
touched the source markdown, so re-run this after editing docs rather than
hand-editing the dates.

Unit-Tests
----------

You need to add an `.env` file in the repository root, that defines
`MORNINGSTAR_PASSWORD` and `MORNINGSTAR_USERNAME`.

Run `nxp ts-node tools/tests` to run only unit-tests.
