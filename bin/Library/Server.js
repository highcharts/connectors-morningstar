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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.MIMES = exports.DEFAULT_PORT = void 0;
/* *
 *
 *  Imports
 *
 * */
const FS = require("node:fs");
const HTTP = require("node:http");
const Path = require("node:path");
/* *
 *
 *  Constants
 *
 * */
exports.DEFAULT_PORT = 8080;
exports.MIMES = {
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
function sanitizePath(path) {
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
class Server {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(folder = process.cwd()) {
        this.folder = folder;
        this.http = new HTTP.Server((req, res) => this.handle(req, res));
    }
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
    handle(request, response) {
        let folder = this.folder;
        let path = sanitizePath(request.url || '/index.html');
        if (path.startsWith('/code/')) {
            if (FS.existsSync('code')) {
                // Runs in repository
                folder = '.';
            }
            else {
                // Runs in package
                folder = Path.join(__dirname, '..');
                path = path.substring(5);
            }
        }
        let file = Path.posix.basename(path);
        if (path.endsWith('/')) {
            file = 'index.html';
        }
        else {
            file = Path.posix.basename(path);
            path = Path.posix.dirname(path) + '/';
        }
        let ext = Path.posix.extname(file).substring(1);
        if (!exports.MIMES[ext]) {
            ext = 'html';
            file += '.html';
        }
        let filePath = Path.posix
            .join(folder.replace(Path.sep, Path.posix.sep), path, file)
            .replace(Path.posix.sep, Path.sep);
        while (filePath.startsWith(Path.sep)) {
            filePath = filePath.substring(1);
        }
        FS.readFile(filePath, (error, data) => {
            if (error) {
                console.error(error.message);
                response.writeHead(404);
                response.end('404: Path not found', 'utf-8');
            }
            else {
                response.writeHead(200, { 'Content-Type': exports.MIMES[ext] });
                response.end(data);
            }
        });
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
    start(port = exports.DEFAULT_PORT, folder) {
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
    stop() {
        this.http.closeAllConnections();
        return this;
    }
}
exports.Server = Server;
/* *
 *
 *  Default Export
 *
 * */
exports.default = Server;
