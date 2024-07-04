/* *
 *
 *  Imports
 *
 * */


import * as FS from 'node:fs';
import * as Path from 'node:path';


/* *
 *
 *  Constants
 *
 * */


const namespace = 'MorningstarConnectors';
const projectFolder = FS.realpathSync(process.cwd());
const sourceFolder = './lib/';
const targetFolder = './dist/';


/* *
 *
 *  Functions
 *
 * */


function addDashboardsUMDConfig(target, ...pathMembers) {
    const amd = ['dashboards/dashboards']
    const commonjs = ['@highcharts/dashboards'];
    const root = ['Dashboards'];

    if (pathMembers.length) {
        amd.push(pathMembers[pathMembers.length - 1]);
        commonjs.push(pathMembers[pathMembers.length - 1]);
        root.push(pathMembers[pathMembers.length - 1]);
    }

    target[`@highcharts/dashboards/es-modules/${pathMembers.join('/')}`] = {
        amd,
        commonjs,
        commonjs2: commonjs,
        root
    };

}


/* *
 *
 *  Externals
 *
 * */


const externals = {};

addDashboardsUMDConfig(externals);
addDashboardsUMDConfig(externals, 'Data', 'Connectors', 'DataConnector');
addDashboardsUMDConfig(externals, 'Data', 'Converters', 'DataConverter');


/* *
 *
 *  Distribution
 *
 * */


const webpacks = [
    // Morningstar connectors
    {
        mode: 'production',

        // path to the main file
        entry: Path.resolve(projectFolder, `${sourceFolder}/index.js`),

        externals,

        // name for the javascript file that is created/compiled in memory
        output: {
            filename: 'morningstar-connectors.js',
            globalObject: 'this',
            library: {
                name: namespace,
                type: 'umd',
                umdNamedDefine: true,
            },
            path: Path.resolve(projectFolder, targetFolder),
        },

        performance: {
            hints: 'error',
            maxAssetSize: 200000,
            maxEntrypointSize: 200000,
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },

    },
    // Morningstar Time Series
    {
        mode: 'production',

        // path to the main file
        entry: Path.resolve(projectFolder, `${sourceFolder}/TimeSeries/index.js`),

        externals,

        // name for the javascript file that is created/compiled in memory
        output: {
            filename: 'morningstar-time-series.js',
            globalObject: 'this',
            library: {
                name: `${namespace}.TimeSeries`,
                type: 'umd',
                umdNamedDefine: true,
            },
            path: Path.resolve(projectFolder, targetFolder),
        },

        performance: {
            hints: 'error',
            maxAssetSize: 100000,
            maxEntrypointSize: 100000,
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },

    }
];


/* *
 *
 *  Highcharts Utils Code
 *
 * */


for (let webpack of webpacks.slice()) {
    webpack = structuredClone(webpack);
    webpack.optimization = {
        ...webpack.optimization,
        minimize: false
    };
    webpack.output.filename =
        Path.basename(webpack.output.filename, '.js') + '.src.js';
    webpack.output.path =
        Path.resolve(webpack.output.path, Path.join('..', 'code'));
    webpack.performance = {
        ...webpack.performance,
        maxAssetSize: 1000000,
        maxEntrypointSize: 1000000,
    };
    webpacks.push(webpack);
}


/* *
 *
 *  Default Export
 *
 * */


export default webpacks;
