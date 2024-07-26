/* *
 *
 *  Imports
 *
 * */


import type { Configuration } from 'webpack';

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
const sourceFolder = './code/es-modules/';
const targetFolder = './code/';
const root = 'Dashboards';


/* *
 *
 *  Distribution
 *
 * */


const externals = {
    '@highcharts/dashboards': {
        amd: 'dashboards/dashboards',
        commonjs: '@highcharts/dashboards',
        commonjs2: '@highcharts/dashboards',
        root: 'Dashboards'
    }
};


const sharedConfiguration: Configuration = {

    mode: 'production',

    devtool: 'source-map',

    externals,

    performance: {
        hints: 'error',
        maxAssetSize: 100000,
        maxEntrypointSize: 100000,
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

};


const webpacks: Array<Configuration> = [
    // Morningstar connectors
    {
        ...sharedConfiguration,

        // Path to the main file
        entry: Path.resolve(projectFolder, `${sourceFolder}/index.js`),

        // Name for the javascript file that is created/compiled in memory
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

    },
    // Morningstar RNA news
    /*{
        ...sharedConfiguration,

        // Path to the main file
        entry: Path.resolve(projectFolder, `${sourceFolder}/RNANews/index.js`),

        // Name for the javascript file that is created/compiled in memory
        output: {
            filename: 'morningstar-rna-news.js',
            globalObject: 'this',
            library: {
                name: {
                    amd: `${amd}/morningstar-rna-news`,
                    commonjs: `${commonjs}/es-modules/RNANews/index`,
                    root: [root, 'MorningstarConnectors', 'RNANews']
                },
                type: 'umd',
                umdNamedDefine: true,
            },
            path: Path.resolve(projectFolder, targetFolder),
        },

    },*/
    // Morningstar time series
    {
        ...sharedConfiguration,

        // Path to the main file
        entry: Path.resolve(projectFolder, `${sourceFolder}/TimeSeries/index.js`),

        // Name for the javascript file that is created/compiled in memory
        output: {
            filename: 'morningstar-time-series.js',
            globalObject: 'this',
            library: {
                name: {
                    amd: `${amd}/morningstar-time-series`,
                    commonjs: `${commonjs}/es-modules/TimeSeries/index`,
                    root: [root, 'MorningstarConnectors', 'TimeSeries']
                },
                type: 'umd',
                umdNamedDefine: true,
            },
            path: Path.resolve(projectFolder, targetFolder),
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
    if (
        typeof webpack.output === 'object' &&
        typeof webpack.output.filename === 'string' &&
        typeof webpack.output.path === 'string'
    ) {
        webpack.output.filename =
            Path.basename(webpack.output.filename, '.js') + '.src.js';
        webpack.output.path =
            Path.resolve(webpack.output.path, Path.join('..', 'code'));
    }
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
