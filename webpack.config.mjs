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


const amd = 'dashboards/dashboards';
const commonjs = '@highcharts/morningstar-connectors';
const projectFolder = FS.realpathSync(process.cwd());
const sourceFolder = './lib/';
const targetFolder = './dist/';
const root = 'Dashboards';


/* *
 *
 *  Functions
 *
 * */


const externals = {};


function addExternal(nodeModule, pathMembers) {
    const amd = [
        nodeModule.split('/').pop() + '/' + nodeModule.split('/').pop()
    ]
    const commonjs = [nodeModule];
    const root = [
        nodeModule.split('/').pop().substring(0, 1).toUpperCase() +
        nodeModule.split('/').pop().substring(1)
    ];

    if (pathMembers.length) {
        amd.push(pathMembers.slice().pop());
        commonjs.push(pathMembers.slice().pop());
        root.push(pathMembers.slice().pop());
        nodeModule += pathMembers.join('/');
    }

    externals[nodeModule] = {
        amd,
        commonjs,
        commonjs2: commonjs,
        root
    };

}


Object
    .entries(JSON.parse(FS.readFileSync('webpack.externals.json', 'utf8')))
    .forEach(entry => (
        entry[1].forEach(path => (
            addExternal(entry[0], path.split('/'))
        ))
    ));


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
                name: {
                    amd: `${amd}/morningstar-connectors`,
                    commonjs,
                    root: [root, 'MorningstarConnectors'],
                },
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
                name: {
                    amd: `${amd}/morningstar-time-series`,
                    commonjs: `${commonjs}/lib/TimeSeries/index`,
                    root: [root, 'MorningstarConnectors', 'TimeSeries']
                },
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
