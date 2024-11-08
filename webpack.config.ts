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
 *  Declarations
 *
 * */


interface Meta {
    filename: string;
    noExternals?: boolean;
    umdNames: MetaUMDNames;
}


interface MetaUMDNames {
    amd: string;
    commonjs: string;
    root: (string|Array<string>);
}


/* *
 *
 *  Constants
 *
 * */


const commonjs = '@highcharts/connectors-morningstar';
const projectFolder = FS.realpathSync(process.cwd());
const sourceFolder = './code/es-modules/';
const targetFolder = './code/';


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
    },
    '@highcharts/dashboards/datagrid': {
        amd: 'datagrid/datagrid',
        commonjs: '@highcharts/dashboards/datagrid',
        commonjs2: '@highcharts/dashboards/datagrid',
        root: 'DataGrid'
    },
    'highcharts': {
        amd: 'highcharts/highcharts',
        commonjs: 'highcharts',
        commonjs2: 'highcharts',
        root: 'Highcharts'
    }
};


const metas: Record<string, Meta> = {
    /**
     * @todo fix bridge targets
    dashboards: {
        filename: 'dashboards-morningstar.js',
        umdNames: {
            amd: 'dashboards/dashboards',
            commonjs,
            root: ['Dashboards', 'Morningstar']
        }
    },
    datagrid: {
        filename: 'datagrid-morningstar.js',
        umdNames: {
            amd: 'datagrid/datagrid',
            commonjs,
            root: ['DataGrid', 'Morningstar']
        }
    },
    highcharts: {
        filename: 'highcharts-morningstar.js',
        umdNames: {
            amd: 'highcharts/highcharts',
            commonjs,
            root: ['Highcharts', 'Morningstar']
        }
    }, */
    standalone: {
        filename: 'connectors-morningstar.js',
        noExternals: true,
        umdNames: {
            amd: 'highcharts/connectors-morningstar',
            commonjs,
            root: ['Highcharts', 'Connectors', 'Morningstar']
        }
    }
};


const sharedConfiguration: Configuration = {

    mode: 'production',

    devtool: 'source-map',

    performance: {
        hints: 'error',
        maxAssetSize: 100000,
        maxEntrypointSize: 100000
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }

};


const webpacks: Array<Configuration> = Object.keys(metas).map(variant => ({
    ...sharedConfiguration,

    // Path to the main file
    entry: Path.resolve(projectFolder, `${sourceFolder}/index.js`),

    externals,

    // Name for the javascript file that is created/compiled in memory
    output: {
        filename: metas[variant].filename,
        globalObject: 'this',
        library: {
            name: metas[variant].umdNames,
            type: 'umd',
            umdNamedDefine: true
        },
        path: Path.resolve(projectFolder, targetFolder)
    },

    performance: {
        hints: 'error',
        maxAssetSize: 200000,
        maxEntrypointSize: 200000
    }

}));



/* *
 *
 *  Highcharts Utils Code
 *
 * */


for (let webpack of webpacks.slice()) {
    const filename = '' + webpack.output?.filename;
    const path = '' + webpack.output?.path;

    webpack = structuredClone(webpack);

    webpack.optimization = {
        ...webpack.optimization,
        minimize: false
    };

    webpack.output!.filename = Path.basename(filename, '.js') + '.src.js';
    webpack.output!.path = Path.resolve(path, Path.join('..', 'code'));

    webpack.performance = {
        ...webpack.performance,
        maxAssetSize: 1000000,
        maxEntrypointSize: 1000000
    };

    webpacks.push(webpack);

}


/* *
 *
 *  Default Export
 *
 * */


export default webpacks;
