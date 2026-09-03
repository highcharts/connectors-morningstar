/* *
 *
 *  Generates docs/llms.txt. Run with `npm run llms`.
 *
 *  (c) Highsoft AS
 *
 *  Authors:
 *  - Andrzej Bułeczka
 *
 * */


/* *
 *
 *  Imports
 *
 * */


import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import type { DocsPage } from './libs/Docs';
import { INTRO, OPTIONAL, TITLE, buildSections } from './libs/Docs';


/* *
 *
 *  Constants
 *
 * */


const OUTPUT = join('docs', 'llms.txt');


/* *
 *
 *  Functions
 *
 * */


function item (
    page: DocsPage
): string {
    return `- [${page.title}](${page.url}): ${page.description}`;
}


function generate (): string {
    const lines = [`# ${TITLE}`, '', ...INTRO.map(line => `> ${line}`)];

    for (const section of buildSections()) {
        lines.push('', `## ${section.heading}`, '');
        lines.push(...section.pages.map(item));

        for (const group of section.groups) {
            lines.push('', `### ${group.heading}`, '');
            lines.push(...group.pages.map(item));
        }
    }

    lines.push('', '## Optional', '');
    lines.push(...OPTIONAL.map(item));

    return `${lines.join('\n')}\n`;
}


/* *
 *
 *  Runtime
 *
 * */


writeFileSync(OUTPUT, generate());

process.stdout.write(`Wrote ${OUTPUT}.\n`);
