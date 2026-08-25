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

import type { DocsPage } from './libs/DocsPages';
import {
    INTRO,
    SECTIONS,
    TITLE,
    pageUrl,
    uncuratedFiles
} from './libs/DocsPages';


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
    return `- [${page.title}](${pageUrl(page)}): ${page.description}`;
}


function generate (): string {
    const lines = [`# ${TITLE}`, '', ...INTRO.map(line => `> ${line}`)];

    for (const section of SECTIONS) {
        lines.push('', `## ${section.heading}`, '');
        lines.push(...(section.pages ?? []).map(item));

        for (const group of section.groups ?? []) {
            lines.push('', `### ${group.heading}`, '');
            lines.push(...group.pages.map(item));
        }
    }

    return `${lines.join('\n')}\n`;
}


/* *
 *
 *  Runtime
 *
 * */


for (const file of uncuratedFiles()) {
    process.stderr.write(`Warning: ${file} is not in DocsPages.ts; skipped.\n`);
}

writeFileSync(OUTPUT, generate());

process.stdout.write(`Wrote ${OUTPUT}.\n`);
