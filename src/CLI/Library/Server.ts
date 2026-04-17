/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import * as FS from 'node:fs';
import * as HTTP from 'node:http';
import * as Marked from 'marked';
import * as Path from 'node:path';


/* *
 *
 *  Constants
 *
 * */


export const CWD = process.cwd();


export const DEFAULT_PORT = 8080;


export const MIME_TYPES: Record<string, string> = {
    css: 'text/css; charset=utf-8',
    eot: 'application/vnd.ms-fontobject',
    gif: 'image/gif',
    html: 'text/html; charset=utf-8',
    ico: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'application/javascript',
    json: 'application/json',
    map: 'application/json',
    markdown: 'text/markdown',
    md: 'text/markdown; charset=utf-8',
    png: 'image/png',
    svg: 'image/svg+xml',
    ttf: 'font/ttf',
    txt: 'text/plain; charset=utf-8',
    woff: 'font/woff',
    woff2: 'font/woff2',
    xml: 'application/xml'
};


const PATH_ESCAPE = /\.\.?\/|\/\.|\/\//u;


/* *
 *
 *  Functions
 *
 * */


/**
 * Removes path elements that could result in a folder escape.
 *
 * @param path
 * Path to sanitize.
 *
 * @return
 * Sanitized path.
 */
function sanitizePath (path: string) {
    path = (new URL(path, 'http://localhost')).pathname;

    while (PATH_ESCAPE.test(path)) {
        path = path.replace(PATH_ESCAPE, '');
    }

    return path;
}


/**
 * Removes all non-word characters and capitalize the first character.
 *
 * @param text
 * Text to capitalize.
 *
 * @return
 * Capitalized text.
 */
function capitalize (text: string) {
    return text
        .replace(/\W/gu, ' ')
        .replace(/\b\w/gu, (match) => match.toUpperCase());
}


/**
 * Rewrites Highcharts CDN URLs to local `node_modules` (and `/code/` for
 * connectors) so demos work offline when dependencies are installed.
 *
 * @param source
 * Response body before send.
 *
 * @return
 * Transformed source.
 */
export function CDNToLocal (source: string): string {
    return source
        .replace(
            /https:\/\/code\.highcharts\.com\/connectors\/morningstar\//gu,
            '/code/'
        )
        .replace(
            /https:\/\/code\.highcharts\.com\/stock\/highstock\.js/gu,
            '/node_modules/highcharts/highstock.js'
        )
        .replace(
            /https:\/\/code\.highcharts\.com\/highcharts\.js/gu,
            '/node_modules/highcharts/highcharts.js'
        )
        .replace(
            /https:\/\/code\.highcharts\.com\/gantt\//gu,
            '/node_modules/highcharts/gantt/'
        )
        .replace(
            /https:\/\/code\.highcharts\.com\/maps\//gu,
            '/node_modules/highcharts/maps/'
        )
        .replace(
            /https:\/\/code\.highcharts\.com\/mapdata\//gu,
            '/node_modules/highcharts/mapdata/'
        )
        .replace(
            /https:\/\/code\.highcharts\.com\/modules\//gu,
            '/node_modules/highcharts/modules/'
        )
        .replace(
            /https:\/\/code\.highcharts\.com\/css\//gu,
            '/node_modules/highcharts/css/'
        )
        .replace(
            /https:\/\/code\.highcharts\.com\/dashboards\//gu,
            '/node_modules/@highcharts/dashboards/'
        )
        .replace(
            /https:\/\/cdn\.jsdelivr\.net\/npm\/@highcharts\/grid-pro\//gu,
            '/node_modules/@highcharts/grid-pro/'
        );
}


/* *
 *
 *  Class
 *
 * */


export class Server {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        folder: string = process.cwd(),
        defaultFile: string = 'index.html',
        baseTitle: string = ''
    ) {
        this.baseTitle = baseTitle;
        this.defaultFile = defaultFile;
        this.folder = folder;
        this.http = new HTTP.Server((req, res) => {
            // eslint-disable-next-line no-console
            this.handle(req, res).catch(console.error);
        });
    }


    /* *
     *
     *  Properties
     *
     * */


    public baseTitle: string;


    public defaultFile: string;


    public folder: string;


    public readonly http: HTTP.Server;


    /* *
     *
     *  Functions
     *
     * */


    /**
     * Handles incoming HTTP messages with a related response.
     *
     * @param request
     * Incoming HTTP message.
     *
     * @param response
     * Outgoing HTTP message.
     */
    public async handle (
        request: HTTP.IncomingMessage,
        response: HTTP.ServerResponse<HTTP.IncomingMessage>
    ): Promise<void> {
        let folder = this.folder;
        let path = sanitizePath(request.url || '/' + this.defaultFile);

        if (path.startsWith('/code/') || path.startsWith('/node_modules/')) {
            if (folder.includes('node_modules')) {
                // Runs in package
                folder = Path.relative(CWD, Path.join(__dirname, '..', '..'));
                if (path.startsWith('/code/')) {
                    path = path.substring(5);
                }
            } else {
                // Runs in repository
                folder = '.';
            }
        }

        let file = Path.posix.basename(path);

        if (path.endsWith('/')) {
            file = this.defaultFile;
        } else {
            file = Path.posix.basename(path);
            path = Path.posix.dirname(path) + '/';
        }

        let ext = Path.posix.extname(file).substring(1);

        if (!MIME_TYPES[ext]) {
            ext = 'html';
            file += '.html';
        }

        let filePath = Path.posix
            .join(folder.replace(Path.sep, Path.posix.sep), path, file)
            .replace(Path.posix.sep, Path.sep);

        while (filePath.startsWith(Path.sep)) {
            filePath = filePath.substring(1);
        }

        try {
            let fileBuffer = FS.readFileSync(filePath);

            if (['', 'markdown', 'md'].includes(ext)) {
                const title = capitalize(file.substring(0, file.length - ext.length - 1));
                fileBuffer = Buffer.from([
                    '<!DOCTYPE html>',
                    '<html><head>',
                    '<meta charset="UTF-8" />',
                    `<title>${title}${this.baseTitle}</title>`,
                    '</head><body>',
                    await Marked.marked(fileBuffer.toString('utf8')),
                    '</body></html>'
                ].join('\n'));
                ext = 'html';
            }

            if (['css', 'html', 'js'].includes(ext)) {
                fileBuffer = Buffer.from(
                    CDNToLocal(fileBuffer.toString('utf8'))
                );
            }

            response.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': MIME_TYPES[ext]
            });
            response.end(fileBuffer);

        } catch (error) {

            if (error instanceof Error) {
                // eslint-disable-next-line no-console
                console.error(error.message);
            }

            response.writeHead(404);
            response.end('404: Path not found', 'utf-8');

        }

    }


    /**
     * Starts the server.
     *
     * @param port
     * HTTP port to use.
     *
     * @param folder
     * Local folder to serve.
     *
     * @return
     * Server instance for reference.
     */
    public start (
        port: number = DEFAULT_PORT,
        folder?: string
    ): Server {

        this.folder = (folder || this.folder);

        this.http.listen(port);

        return this;
    }


    /**
     * Stops the server.
     *
     * @return
     * Server instance for reference.
     */
    public stop (): Server {

        this.http.closeAllConnections();

        return this;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default Server;
