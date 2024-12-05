/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


/* *
 *
 *  Imports
 *
 * */


import * as FS from 'node:fs/promises';
import * as FSS from 'node:fs';
import * as HTTP from 'node:http';
import * as Marked from 'marked';
import * as Path from 'node:path';
import * as PPath from 'node:path/posix';

import APITemplate from './APITemplate';
import Database from './Database';
import Server, { MIME_TYPES } from './Server';


/* *
 *
 *  Declarations
 *
 * */


export interface Context extends Record<string, unknown> {
    name: string;
    node: Option;
    side: Option;
    platform: string;
    productName: string;
    toc: Record<string, ContextTOCItem>;
    version?: string;
    year?: number;
}


export interface ContextTOCItem extends Record<string, unknown> {
    displayName: string;
}


export interface Nav {
    children?: Array<Nav>;
    default?: (boolean|null|number|string);
    deprecated?: string;
    description?: string;
    filename?: string;
    fullname?: string;
    isLeaf?: boolean;
    name?: string;
    since?: string;
    typeList?: { names: Array<string> };
    version?: string;
}


export interface Option {
    children: Options;
    doclet: OptionDoclet;
    meta: OptionMeta;
}


export type Options = Record<string, Option>;


export interface OptionDoclet {
    declare?: string;
    defaultvalue?: (boolean|null|number|string)
    deprecated?: string;
    description?: string;
    exclude?: Array<string>;
    extends?: string;
    productdescs?: Array<Record<string,string>>;
    requires?: Array<string>;
    samples?: Array<OptionDocletSample>;
    see?: Array<string>;
    since?: string;
    type?: Record<string,Array<string>>;
}


export interface OptionDocletSample {
    name: string;
    value: string;
    products?: Array<string>;
}


export interface OptionMeta {
    default?: (boolean|null|number|string);
    fullname: string;
    hasChildren?: boolean;
    name: string;
}


/* *
 *
 *  Constants
 *
 * */


const PATH_ESCAPE = /\.\.?\/|\/\.|\/\//u;


const STATIC_PATH = Path.join(__dirname, '..', 'Static');


/* *
 *
 *  Functions
 *
 * */



function escape (
    text: string
): string {
    return text.replace(/&/gu, '&amp;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;');
}


async function getContext (
    database: Database,
    itemName: string = '',
    version?: number
): Promise<Context> {
    const node = await getOption(database, itemName, version);
    const side = await getOption(database, itemName, version, true);

    return {
        constr: 'Morningstar',
        date: (new Date()).toISOString().substring(0, 19).replace('T', ''),
        name: itemName,
        node,
        side,
        platform: 'JS',
        product: {
            namespace: 'HighchartsConnectors'
        },
        productModule: 'connectors-morningstar',
        productName: 'Highcharts Connectors',
        toc: {
            '': {
                active: true,
                displayName: 'Highcharts Connectors for Morningstar'
            }
        }
    } as Context;
}


async function getOption (
    database: Database,
    itemName: string = '',
    version?: number,
    forNavigation?: boolean
): Promise<Option> {
    const root: Option = (
        forNavigation ?
            await getOption(database, '', version) :
            treeNode({}, '')
    );
    const option = (
        itemName ?
            treeNode(root.children, itemName) :
            root
    );
    const node = await database.getItem(itemName, version);

    if (node) {
        option.doclet.description =
            await Marked.parse(jsdoc2Markdown(escape(node.description)));

        if (node.deprecated) {
            option.doclet.deprecated = `${node.deprecated.toFixed(2)}.0`;
        }

        if (node.doclet) {
            if (node.doclet.default) {
                if (forNavigation) {
                    (option.doclet as Record<string, string>).default =
                        node.doclet.default.join(',');
                } else {
                    option.doclet.defaultvalue = node.doclet.default.join(',');
                }
            }
        }

        if (node.since) {
            option.doclet.since = `${node.since.toFixed(2)}.0`;
        }
    }

    // Add direct children

    let childOption: Option;

    for (const child of await database.getItemChildren(itemName, version)) {

        root.meta.hasChildren = true;
        childOption = treeNode(root.children, child.name);
        childOption.doclet.description =
            await Marked.parse(jsdoc2Markdown(escape(child.description)));

        if (child.doclet.type) {
            childOption.doclet.type = {
                name: child.doclet.type
            };
        }

    }

    return (
        forNavigation ?
            root :
            option
    );
}


async function getNav (
    database: Database,
    itemName: string = '',
    version?: number
): Promise<Nav> {
    itemName = (itemName === 'index' ? '' : itemName);

    const item = await database.getItem(itemName, version);
    const nav: Nav = (item ? await toNav(item) : {});
    const navChildren: Array<Nav> = [];

    let navChild: Nav;

    for (const childItem of await database.getItemChildren(itemName, version)) {
        if (childItem && childItem.name) {
            navChild = await toNav(childItem);
            navChild.isLeaf = !await database.hasItemChildren(childItem.name, version);
            navChildren.push(navChild);
        }
    }

    if (navChildren.length) {
        nav.children = navChildren;
    }

    return nav;
}


function jsdoc2Markdown (text: string): string {
    return text
        .replace(/\{@link\s+(\S*?)\s*\|\s*(.*?)\s*\}/gu, '[$2]($1)')
        .replace(/\{@link\s+(\S*?)\s*\}/gu, '[link]($1)');
}


/**
 * Response with a 200
 *
 * @param response
 * HTTP response
 *
 * @param data
 * File data
 *
 * @param ext
 * File extension
 */
function response200 (
    response: HTTP.ServerResponse,
    data: (string|Buffer),
    ext: string
): void {
    response.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || MIME_TYPES.html });
    response.end(data);
}


/**
 * Response with a 404 - not found
 *
 * @param response
 * HTTP response
 *
 * @param p
 * Missing path
 */
function response404 (
    response: HTTP.ServerResponse,
    p: string
): void {
    /* eslint-disable no-console */
    console.error('404', p);

    response.writeHead(404);
    response.end('Ooops, the requested file is 404', 'utf-8');
}


/**
 * Removes path elements that could result in a folder escape.
 *
 * @param path
 * Path to sanitize.
 *
 * @return
 * Sanitized path.
 */
function sanitizePath (path: string): string {

    path = (new URL(path, 'http://localhost')).pathname;

    while (PATH_ESCAPE.test(path)) {
        path = path.replace(PATH_ESCAPE, '');
    }

    return path;
}


async function toNav (
    item: Database.Item
): Promise<Nav> {
    const nav: Nav = {};

    if (item.description) {
        nav.description =
            await Marked.parse(jsdoc2Markdown(escape(item.description)));
    }

    if (item.meta.file) {
        nav.filename = item.meta.file;
    }

    nav.fullname = item.name;
    nav.name = item.name.split('.').pop();

    if (item.doclet.type) {
        if (item.doclet.default) {
            nav.default = item.doclet.default[item.doclet.default.length - 1];
        }
        nav.typeList = { names: item.doclet.type };
    }

    return nav;
}


/**
 * Creates or retrieves an option with the given name path.
 *
 * @param tree
 * Tree root to walk on.
 *
 * @param nodePath
 * Node path to retrieve.
 *
 * @return
 * Created or retrieved option.
 */
function treeNode (
    tree: Options,
    nodePath: string
): Option {
    let node: Option = {
        doclet: {},
        meta: {
            fullname: '',
            name: ''
        },
        children: tree
    };

    let currentName = '';

    for (const name of nodePath.split('.')) {
        currentName = (currentName ? `${currentName}.${name}` : name);
        node = node.children[name] = (
            node.children[name] ||
            {
                doclet: {},
                meta: {
                    fullname: currentName,
                    name
                },
                children: {}
            }
        );
    }

    return node;
}


/* *
 *
 *  Tasks
 *
 * */


export class APIServer extends Server {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        folder?: string,
        defaultFile?: string,
        baseTitle?: string
    ) {
        super(folder, defaultFile, baseTitle);

        this.database = new Database(
            'connectors-morningstar',
            Path.join(__dirname, '..', 'Static'),
            'api'
        );
        this.databaseStats = FSS.lstatSync(
            Path.join(__dirname, '..', 'Static', 'api.json')
        );
        this.version = (JSON.parse(
            FSS.readFileSync(
                // Path relative to bin folder
                Path.join(__dirname, '..', '..', 'package.json'),
                'utf8'
            )
        ) as Record<string, string>).version;
        this.year = this.databaseStats.mtime.getFullYear();
    }


    /* *
     *
     *  Properties
     *
     * */


    private readonly database: Database;


    private readonly databaseStats: FSS.Stats;


    private readonly version: string;


    private readonly year: number;


    /* *
     *
     *  Functions
     *
     * */


    public override async handle (
        request: HTTP.IncomingMessage,
        response: HTTP.ServerResponse<HTTP.IncomingMessage>
    ): Promise<void> {
        const path = sanitizePath(request.url || '').substring(1);
        console.log(path);
        if (request.method !== 'GET') {
            response404(response, path);
            return;
        }

        try {
            let file = PPath.basename(path);

            const ext = PPath.extname(file).substring(1);

            if (ext === 'json') {
                if (path === 'search.json') {
                    response200(
                        response,
                        JSON.stringify(await this.database.getItemNames()),
                        'json'
                    );
                    return;
                }
                if (!path.startsWith('nav/')) {
                    throw new Error();
                }
                file = file.substring(0, file.length - ext.length - 1);
                response200(
                    response,
                    JSON.stringify(await getNav(this.database, file)),
                    'json'
                );
                return;
            }

            if (path.startsWith('static/')) {
                response200(
                    response,
                    await FS.readFile(
                        `${STATIC_PATH}/${file}`,
                        'utf8'
                    ),
                    ext
                );
                return;
            }

            const context = await getContext(this.database, path);

            if (!context.node) {
                throw new Error('Not found');
            }

            context.version = this.version;
            context.year = this.year;

            response200(response, APITemplate(context), 'html');

        } catch (error) {
            console.error('' + error);
            if (!response.headersSent) {
                response404(response, path);
            }
        }
    }

}


/* *
 *
 *  Default Export
 *
 * */


export default APIServer;
