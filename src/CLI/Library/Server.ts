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


'use strict';


/* *
 *
 *  Imports
 *
 * */


import * as FS from 'node:fs';
import * as HTTP from 'node:http';
import * as Path from 'node:path';


/* *
 *
 *  Constants
 *
 * */


export const DEFAULT_PORT = 8080;


export const MIMES: Record<string, string> = {
    css: 'text/css',
    eot: 'application/vnd.ms-fontobject',
    js: 'application/javascript',
    json: 'application/json',
    html: 'text/html',
    ico: 'image/x-icon',
    map: 'application/json',
    png: 'image/png',
    svg: 'image/svg+xml',
    ttf: 'font/ttf',
    txt: 'text/plain',
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
        folder: string = process.cwd()
    ) {
        this.folder = folder;
        this.http = new HTTP.Server((req, res) => this.handle(req, res));
    }


    /* *
     *
     *  Properties
     *
     * */


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
    public handle (
        request: HTTP.IncomingMessage,
        response: HTTP.ServerResponse<HTTP.IncomingMessage>
    ): void {
        let folder = this.folder;
        let path = sanitizePath(request.url || '/index.html');

        if (path.startsWith('/code/')) {
            if (FS.existsSync('code')) {
                // Runs in repository
                folder = '.';
            } else {
                // Runs in package
                folder = Path.join(__dirname, '..');
                path = path.substring(5);
            }
        }

        let file = Path.posix.basename(path);

        if (path.endsWith('/')) {
            file = 'index.html';
        } else {
            file = Path.posix.basename(path);
            path = Path.posix.dirname(path) + '/';
        }

        let ext = Path.posix.extname(file).substring(1);

        if (!MIMES[ext]) {
            ext = 'html';
            file += '.html';
        }

        let filePath = Path.posix
            .join(folder.replace(Path.sep, Path.posix.sep), path, file)
            .replace(Path.posix.sep, Path.sep);

        while (filePath.startsWith(Path.sep)) {
            filePath = filePath.substring(1);
        }

        FS.readFile(
            filePath,
            (error, data) => {
                if (error) {
                    // eslint-disable-next-line no-console
                    console.error(error.message);
                    response.writeHead(404);
                    response.end('404: Path not found', 'utf-8');
                } else {
                    response.writeHead(200, { 'Content-Type': MIMES[ext] });
                    response.end(data);
                }
            }
        );

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
