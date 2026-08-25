/* *
 *
 *  Shared page list behind docs/llms.txt and docs/sitemap.xml, so the two
 *  files never drift apart. Edit here, then run `npm run docs:meta`.
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


import { readdirSync } from 'node:fs';
import { join, sep } from 'node:path';


/* *
 *
 *  Declarations
 *
 * */


export interface DocsPage {
    /** URL slug appended to `BASE_URL`; ignored when `url` is set. */
    slug?: string;
    /** Link text used in llms.txt. */
    title: string;
    /** Short description used in llms.txt (text after the colon). */
    description: string;
    /** Source markdown relative to `DOCS_ROOT`; defaults to the slug. */
    file?: string;
    /** Absolute URL for external links (the Optional section). */
    url?: string;
}


export interface DocsGroup {
    /** H3 sub-heading in llms.txt. */
    heading: string;
    pages: DocsPage[];
}


export interface DocsSection {
    /** H2 heading in llms.txt. */
    heading: string;
    /** Sitemap priority; sections without one are left out of the sitemap. */
    priority?: string;
    /** Pages listed directly under the H2, before any sub-groups. */
    pages?: DocsPage[];
    /** Optional H3 sub-groups, e.g. Screeners and Time Series under EC. */
    groups?: DocsGroup[];
}


/* *
 *
 *  Constants
 *
 * */


export const TITLE = 'Highcharts Connectors for Morningstar';


export const BASE_URL = 'https://www.highcharts.com/docs/morningstar';


export const DOCS_ROOT = join('docs', 'connectors');


/** Priority for sitemap entries found on disk but not curated below. */
export const DEFAULT_PRIORITY = '0.5';


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


export const SECTIONS: DocsSection[] = [
    {
        heading: 'Getting started',
        priority: '0.9',
        pages: [
            {
                // Overview file is morningstar.md, published as
                // /morningstar/morningstar.
                slug: 'morningstar',
                file: 'morningstar.md',
                title: 'Morningstar connectors overview',
                description: 'install (npm / UMD / CDN), authentication, ' +
                    'regional settings, and using pre-fetched JSON instead ' +
                    'of live calls'
            }
        ]
    },
    {
        heading: 'Direct Web Services (DWS)',
        priority: '1.0',
        pages: [
            {
                slug: 'dws/investments-details-connector',
                title: 'Investments Details connector',
                description: 'DWS Investment Details API'
            },
            {
                slug: 'dws/time-series-connector',
                title: 'Time Series connector',
                description: 'DWS Time Series API'
            },
            {
                slug: 'dws/asset-allocation-breakdown',
                title: 'Asset Allocation Breakdown',
                description: 'allocation across asset classes'
            },
            {
                slug: 'dws/country-and-regional-exposure-breakdown',
                title: 'Country and Regional Exposure Breakdown',
                description: 'geographic exposure'
            },
            {
                slug: 'dws/equity-style-box',
                title: 'Equity Style Box',
                description: 'Morningstar equity style box'
            },
            {
                slug: 'dws/equity-sectors-breakdown',
                title: 'Equity Sectors Breakdown',
                description: 'equity sector allocation'
            },
            {
                slug: 'dws/equity-residual-risk',
                title: 'Equity Residual Risk',
                description: 'equity residual risk'
            },
            {
                slug: 'dws/equity-aggregates-residual-risk',
                title: 'Equity Aggregates Residual Risk',
                description: 'aggregated equity residual risk'
            },
            {
                slug: 'dws/fixed-income-sectors-breakdown',
                title: 'Fixed Income Sectors Breakdown',
                description: 'fixed-income sector allocation'
            },
            {
                slug: 'dws/prospectus-fees',
                title: 'Prospectus Fees',
                description: 'fee data from prospectuses'
            }
        ]
    },
    {
        // Morningstar's Enterprise Component APIs (the legacy
        // connectors-morningstar package); Screeners and Time Series are
        // sub-areas of this family, mirroring the docs structure.
        heading: 'Enterprise Components',
        priority: '0.8',
        pages: [
            {
                slug: 'goal-analysis',
                title: 'Goal Analysis',
                description: 'probability of meeting an investment goal'
            },
            {
                slug: 'hypo-performance',
                title: 'Hypo Performance',
                description: 'hypothetical (back-tested) portfolio performance'
            },
            {
                slug: 'performance',
                title: 'Performance',
                description: 'historical performance of a security or portfolio'
            },
            {
                slug: 'risk-score',
                title: 'Risk Score',
                description: 'Morningstar risk scoring'
            },
            {
                slug: 'security-compare',
                title: 'Security Compare',
                description: 'side-by-side comparison of securities'
            },
            {
                slug: 'security-details',
                title: 'Security Details',
                description: 'detailed data for a single security'
            },
            {
                slug: 'x-ray',
                title: 'X-Ray',
                description: 'portfolio X-ray (holdings look-through and allocation)'
            }
        ],
        groups: [
            {
                heading: 'Screeners',
                pages: [
                    {
                        slug: 'screeners/screener',
                        title: 'Screener',
                        description: 'base screener connector'
                    },
                    {
                        slug: 'screeners/investment-screener',
                        title: 'Investment Screener',
                        description: 'screen investments by criteria'
                    },
                    {
                        slug: 'screeners/find-similar-screener',
                        title: 'Find Similar Screener',
                        description: 'find securities similar to a reference'
                    }
                ]
            },
            {
                heading: 'Time Series',
                pages: [
                    {
                        slug: 'time-series/time-series',
                        title: 'Time Series overview',
                        description: 'shared options for all time-series connectors'
                    },
                    {
                        slug: 'time-series/price',
                        title: 'Price',
                        description: 'historical price series'
                    },
                    {
                        slug: 'time-series/ohlcv',
                        title: 'OHLCV',
                        description: 'open/high/low/close/volume series'
                    },
                    {
                        slug: 'time-series/return',
                        title: 'Return',
                        description: 'return over a period'
                    },
                    {
                        slug: 'time-series/cumulative-return',
                        title: 'Cumulative Return',
                        description: 'cumulative return over time'
                    },
                    {
                        slug: 'time-series/rolling-return',
                        title: 'Rolling Return',
                        description: 'rolling-window returns'
                    },
                    {
                        slug: 'time-series/growth',
                        title: 'Growth',
                        description: 'growth of a hypothetical investment'
                    },
                    {
                        slug: 'time-series/dividend',
                        title: 'Dividend',
                        description: 'dividend history'
                    },
                    {
                        slug: 'time-series/rating',
                        title: 'Rating',
                        description: 'rating history'
                    }
                ]
            }
        ]
    },
    {
        heading: 'Optional',
        pages: [
            {
                url: 'https://github.com/highcharts/connectors-morningstar',
                title: 'Repository',
                description: 'source, releases, and issues'
            },
            {
                url: 'https://github.com/highcharts/connectors-morningstar/tree/main/demos',
                title: 'Demos',
                description: 'example integrations'
            }
        ]
    }
];


/* *
 *
 *  Functions
 *
 * */


/**
 * Public URL of a page.
 *
 * @param page
 * Page to link.
 *
 * @return
 * Absolute URL.
 */
export function pageUrl (
    page: DocsPage
): string {
    return page.url ?? `${BASE_URL}/${page.slug}`;
}


/**
 * Source markdown file of an internal page, or `undefined` for external links.
 *
 * @param page
 * Page to resolve.
 *
 * @return
 * Path relative to the repository root, or `undefined`.
 */
export function sourceFile (
    page: DocsPage
): (string|undefined) {
    return page.url ?
        undefined :
        join(DOCS_ROOT, page.file ?? join('morningstar', `${page.slug}.md`));
}


/**
 * Maps a source file (relative to `DOCS_ROOT`) back to its URL slug.
 *
 * @param relPath
 * Path relative to `DOCS_ROOT`.
 *
 * @return
 * URL slug.
 */
export function fileToSlug (
    relPath: string
): string {
    return relPath
        .split(sep).join('/')
        .replace(/\.md$/u, '')
        .replace(/^morningstar\//u, '');
}


/**
 * All pages of a section, direct pages first, then each sub-group's pages.
 *
 * @param section
 * Section to flatten.
 *
 * @return
 * Pages in document order.
 */
export function sectionPages (
    section: DocsSection
): DocsPage[] {
    return [
        ...section.pages ?? [],
        ...(section.groups ?? []).flatMap(group => group.pages)
    ];
}


/**
 * Markdown files under `DOCS_ROOT` that no curated page references, so a new
 * docs page is never silently dropped.
 *
 * @return
 * Paths relative to `DOCS_ROOT`.
 */
export function uncuratedFiles (): string[] {
    const curated = new Set(
        SECTIONS.flatMap(sectionPages).map(sourceFile).filter(Boolean)
    );

    return readdirSync(DOCS_ROOT, { encoding: 'utf8', recursive: true })
        .filter(rel => rel.endsWith('.md'))
        .filter(rel => !curated.has(join(DOCS_ROOT, rel)))
        .sort();
}
