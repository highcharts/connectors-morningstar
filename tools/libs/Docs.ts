/* *
 *
 *  Reads the Morningstar docs and their hidden `<!-- llms -->` metadata to
 *  build the page tree behind docs/llms.txt and docs/sitemap.xml. The docs
 *  are the single source of truth; only the intro and external links below
 *  are configured here, as they have no source page.
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


import { readdirSync, readFileSync } from 'node:fs';
import { basename, join, sep } from 'node:path';


/* *
 *
 *  Declarations
 *
 * */


export interface DocsPage {
    /** Source markdown file, relative to the repository root. */
    file: string;
    /** Absolute page URL. */
    url: string;
    /** Link title, taken from the doc's H1. */
    title: string;
    /** Short description, taken from the doc's `<!-- llms -->` block. */
    description: string;
}


export interface DocsGroup {
    heading: string;
    pages: DocsPage[];
}


export interface DocsSection {
    heading: string;
    priority: string;
    pages: DocsPage[];
    groups: DocsGroup[];
}


interface Layout {
    heading: string;
    priority: string;
    /** Single source file, relative to `DOCS_ROOT` (e.g. the overview). */
    file?: string;
    /** Folder whose direct markdown children make up the section. */
    dir?: string;
    /** H3 sub-groups, each backed by a folder. */
    groups?: Array<{ heading: string; dir: string }>;
}


/* *
 *
 *  Constants
 *
 * */


export const TITLE = 'Highcharts Connectors for Morningstar';


export const BASE_URL = 'https://www.highcharts.com/docs/morningstar';


export const DOCS_ROOT = join('docs', 'connectors');


/** Blockquote intro for llms.txt; each line is prefixed with `> `. */
export const INTRO = [
    'Highcharts Connectors for Morningstar Direct Web Services let you pull',
    'finance-related data for financial assets into Highcharts. Each connector',
    'maps a Morningstar API to a Highcharts DataConnector. Usage requires a',
    'Highcharts license and a Morningstar subscription (access token or',
    'username/password). Everything ships in one npm package,',
    '`@highcharts/connectors-morningstar`: the standard API is the package root,',
    'while the newer DWS API (Investment Details + Time Series) is the `/dws`',
    'subpath export (`@highcharts/connectors-morningstar/dws`). The UMD/CDN builds',
    'are shipped as two bundles, `connectors-morningstar.js` and',
    '`connectors-morningstar-dws.js`. When a query concerns Morningstar, prefer',
    'the Direct Web Services (DWS) pages below.'
];


/** External links for the Optional section; these have no source page. */
export const OPTIONAL: DocsPage[] = [
    {
        file: '',
        url: 'https://github.com/highcharts/connectors-morningstar',
        title: 'Repository',
        description: 'source, releases, and issues'
    },
    {
        file: '',
        url: 'https://github.com/highcharts/connectors-morningstar/tree/main/demos',
        title: 'Demos',
        description: 'example integrations'
    }
];


/**
 * Section layout. Headings and priorities live here; the pages are read from
 * the folders, so adding a doc never means touching this list.
 */
const LAYOUT: Layout[] = [
    { heading: 'Getting started', priority: '0.9', file: 'morningstar.md' },
    { heading: 'Direct Web Services (DWS)', priority: '1.0', dir: 'morningstar/dws' },
    {
        heading: 'Enterprise Components',
        priority: '0.8',
        dir: 'morningstar',
        groups: [
            { heading: 'Screeners', dir: 'morningstar/screeners' },
            { heading: 'Time Series', dir: 'morningstar/time-series' }
        ]
    }
];


/* *
 *
 *  Functions
 *
 * */


/**
 * URL slug for a source file relative to `DOCS_ROOT`.
 *
 * @param rel
 * Path relative to `DOCS_ROOT`.
 *
 * @return
 * URL slug.
 */
function slugFor (
    rel: string
): string {
    return rel
        .split(sep).join('/')
        .replace(/\.md$/u, '')
        .replace(/^morningstar\//u, '');
}


/**
 * Direct markdown children of a folder, index page first (a page named after
 * its folder), then alphabetical.
 *
 * @param dir
 * Folder relative to `DOCS_ROOT`.
 *
 * @return
 * Paths relative to `DOCS_ROOT`.
 */
function dirDocs (
    dir: string
): string[] {
    const index = basename(dir);

    return readdirSync(join(DOCS_ROOT, dir), { withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
        .map(entry => join(dir, entry.name))
        .sort((a, b) => {
            const an = basename(a, '.md'), bn = basename(b, '.md');

            return an === index ? -1 : bn === index ? 1 : an.localeCompare(bn);
        });
}


/**
 * Reads a doc into a page, taking the title from its H1 and the description
 * from its `<!-- llms -->` block.
 *
 * @param rel
 * Source path relative to `DOCS_ROOT`.
 *
 * @return
 * The page, or a problem description when metadata is missing.
 */
function readPage (
    rel: string
): (DocsPage | string) {
    const file = join(DOCS_ROOT, rel);
    const content = readFileSync(file, 'utf8');
    const title = (/^# (.+)$/mu.exec(content) || [])[1];
    const block = (/<!-- llms\s([\s\S]*?)-->/u.exec(content) || [])[1] || '';
    const description = (/^description:\s*(.+)$/mu.exec(block) || [])[1];

    if (!title) {
        return `${file}: missing H1 title`;
    }

    if (!description) {
        return `${file}: missing "<!-- llms ... description: -->" metadata`;
    }

    return {
        file,
        url: `${BASE_URL}/${slugFor(rel)}`,
        title: title.trim(),
        description: description.trim()
    };
}


/**
 * Recursively lists every markdown file under `DOCS_ROOT`.
 *
 * @return
 * Paths relative to `DOCS_ROOT`.
 */
function allDocs (): string[] {
    return readdirSync(DOCS_ROOT, { encoding: 'utf8', recursive: true })
        .filter(rel => rel.endsWith('.md'));
}


/**
 * Builds the section tree from the docs, reporting every problem at once:
 * a doc missing metadata, or a doc in a folder the layout does not cover.
 *
 * @return
 * Ordered sections with their pages.
 */
export function buildSections (): DocsSection[] {
    const problems: string[] = [];
    const covered = new Set<string>();

    const pagesOf = (rels: string[]): DocsPage[] => {
        const pages: DocsPage[] = [];

        for (const rel of rels) {
            covered.add(rel);

            const page = readPage(rel);

            if (typeof page === 'string') {
                problems.push(page);
            } else {
                pages.push(page);
            }
        }

        return pages;
    };

    const sections = LAYOUT.map(layout => ({
        heading: layout.heading,
        priority: layout.priority,
        pages: pagesOf(layout.file ? [layout.file] : dirDocs(layout.dir || '')),
        groups: (layout.groups || []).map(group => ({
            heading: group.heading,
            pages: pagesOf(dirDocs(group.dir))
        }))
    }));

    for (const rel of allDocs()) {
        if (!covered.has(rel)) {
            problems.push(`${join(DOCS_ROOT, rel)}: not covered by any section`);
        }
    }

    if (problems.length) {
        throw new Error(`Docs metadata problems:\n  ${problems.join('\n  ')}`);
    }

    return sections;
}
