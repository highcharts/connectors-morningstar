Highcharts Morningstar Connectors Tools
=======================================

These scripts are used to prepare the distribution of new releases.



Dry-run
-------

1. Run `npm test` and make sure everything works as expected.

2. Run `npx ts-node tools/dist --bucket [...] --region [...] --release [x.x.x] --dryrun`.



Release
-------

1. Run `npm test` and make sure everything works as expected.

2. Run `npx ts-node tools/dist --bucket [...] --region [...] --release [x.x.x]`.
