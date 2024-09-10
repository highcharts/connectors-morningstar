/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  This should be run with `npx ts-node`.
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


import Args from '../src/CLI/Library/Args';
import * as AWS from '@aws-sdk/client-s3';
import * as AWSCredentials from '@aws-sdk/credential-providers';
import * as ChildProcess from 'node:child_process';
import * as FS from 'node:fs';
import * as FSP from 'node:fs/promises';
import * as Path from 'node:path/posix';
import * as Stream from 'node:stream/promises';
import * as ZLib from 'node:zlib';


/* *
 *
 *  Constants
 *
 * */


const ARGS = Args.getArgs(process.argv);


const BUILD_FOLDER = 'build/';


const CDN_FOLDER = 'connectors/morningstar/';


const CODE_FOLDER = 'code/';


const COMPRESS_FOLDER = 'build/js-gzip/';


const HELP = `
Highcharts Distribute
=====================

npx ts-node tools/dist --bucket [...] --region [...] --release [x.x.x]

OPTIONS:
  --bucket   S3 bucket to upload to. (required)
  --region   AWS region of S3 bucket. (required)
  --release  Release version to create. (required)
  --dryrun   Dry run without uploading. (optional)
  --helpme   This help.
  --profile  AWS profile to load from AWS credentials file. If no profile is
             provided the default profile or standard AWS environment variables
             for credentials will be used. (optional)
`;


const HTTP_MAX_AGE: Record<string, number> = {
    oneDay: 86400,
    month: 2592001,
    fiveYears: 157680000
};


const MIME_TYPE: Record<string, string> = {
    '.css': 'text/css',
    '.eot': 'application/vnd.ms-fontobject',
    '.gif': 'image/gif',
    '.htm': 'text/html',
    '.html': 'text/html',
    '.php': 'text/plain',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ttf': 'application/font-sfnt',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff',
    '.zip': 'application/zip'
};

const NOW = Date.UTC(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
);


/* *
 *
 *  Functions
 *
 * */


/**
 * Update the build package and build the release.
 */
async function build (): Promise<void> {

    if (ARGS.dryrun) {
        ARGS.bucket = ARGS.bucket || 'code.highcharts.com';
        ARGS.region = ARGS.region || 'eu-west-1';
        ARGS.release = '99.99.99-dryrun';
    }

    if (
        ARGS.help ||
        !validateRelease(ARGS.release)
    ) {
        process.stdout.write(HELP + '\n');
        process.exit();
    }

    const dryrun = !!ARGS.dryrun;
    const packagePath = Path.join(__dirname, '..', 'package-build.json');
    const packageJSON =
        JSON.parse(await FSP.readFile(packagePath, 'utf8')) as Record<string, string>;
    const originalVersion = packageJSON.version;

    try {

        packageJSON.version = ARGS.release;
        await FSP.writeFile(
            packagePath,
            JSON.stringify(packageJSON, null, '    ') + '\n',
            'utf8'
        );

        log('⏳', 'Build', '...');
        ChildProcess.execFileSync('npm', [ 'run', 'build' ], { stdio: 'inherit' });
        log('✅', 'Build Done.');

    } finally {

        if (dryrun) {
            packageJSON.version = originalVersion;
            await FSP.writeFile(
                packagePath,
                JSON.stringify(packageJSON, null, '    ') + '\n',
                'utf8'
            );
        }

    }

}


/**
 * Creates compressed versions of all JS files.
 */
async function compress (): Promise<void> {
    const filePaths = FS
        .readdirSync(CODE_FOLDER, { encoding: 'utf8', recursive: true })
        .filter(sourcePath => (
            Path.basename(sourcePath)[0] !== '.' &&
            (
                Path.extname(sourcePath) === '.js' ||
                Path.extname(sourcePath) === '.map'
            )
        ));


    log('⏳', 'Compressing ', CODE_FOLDER, 'to', COMPRESS_FOLDER, '...');

    let fileTarget: string;

    for (const filePath of filePaths) {
        fileTarget = Path.join(COMPRESS_FOLDER, filePath);

        if (!FS.existsSync(Path.dirname(fileTarget))) {
            FS.mkdirSync(Path.dirname(fileTarget), { recursive: true });
        }

        await Stream.pipeline(
            FS.createReadStream(Path.join(CODE_FOLDER, filePath)),
            ZLib.createGzip(),
            FS.createWriteStream(fileTarget)
        );

        log('✅', fileTarget, 'compressed');
    }

    log('✅', 'Compressing Done.');
}


/**
 * Delays promise chain for given time.
 *
 * @param milliseconds
 * Seconds to delay
 *
 * @return
 * Promise to keep.
 */
function delay (milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


/**
 * Converts an array of items into chunks of sub-arrays with 100 items.
 *
 * @param items
 * Array to split into chunks.
 *
 * @return
 * Array of chunks.
 */
function getChunks<T> (
    items: Array<T>
): Array<Array<T>> {
    items = items.slice();

    if (items.length <= 100) {
        return [items];
    }

    const chunks = [];

    while (items.length) {
        chunks.push(items.splice(0, 100));
    }

    return chunks;
}


/**
 * Console log with current time.
 *
 * @param content
 * Content to log.
 */
function log (...content: Array<unknown>) {

    content.unshift(
        '[' +
        (new Date()).toISOString().substring(0, 19).replace('T', ' ') +
        ']'
    );

    process.stdout.write(content.join(' ') + '\n');
}


/**
 * Uploads distribution files.
 *
 * @return
 * Promise to keep.
 */
async function upload (): Promise<void> {

    if (
        ARGS.help ||
        typeof ARGS.bucket !== 'string' ||
        typeof ARGS.region !== 'string' ||
        !validateRelease(ARGS.release)
    ) {
        process.stdout.write(HELP + '\n');
        return;
    }

    if (!ARGS.bucket) {
        throw new Error('❌ No `--bucket s3` provided.');
    }

    if (!ARGS.region) {
        throw new Error('❌ No `--region aws` provided.');
    }

    const sourceFolder = Path.join(BUILD_FOLDER, 'js-gzip/');

    if (!FS.existsSync(sourceFolder)) {
        throw new Error(`❌ Folder "${sourceFolder}" not found.`);
    }

    const targetStorage = new AWS.S3({
        region: ARGS.region,
        credentials: (
            typeof ARGS.profile === 'string' ?
                AWSCredentials.fromIni({ profile: ARGS.profile }) :
                AWSCredentials.fromEnv()
        )
    });

    if (ARGS.dryrun) {
        // Dry run messages
        const [major, minor] = ARGS.release.split('.');
        const versions = [
            ARGS.release,
            `${major}.${minor}`,
            major
        ];

        for (const version of versions) {
            const cdnVersionFolder = Path.join(CDN_FOLDER, version, '/');
            log('🚧', 'Skipping upload to', cdnVersionFolder, '... (dry run)');
        }

        log('🚧', 'Skipping upload to', CDN_FOLDER, '... (dry run)');
    } else {
        // Upload versioned paths
        const [major, minor] = ARGS.release.split('.');
        const versions = [
            ARGS.release,
            `${major}.${minor}`,
            major
        ];

        for (const version of versions) {
            const cdnVersionFolder = Path.join(CDN_FOLDER, version, '/');

            log('⏳', 'Uploading to', cdnVersionFolder, '...');

            await uploadFolder(
                sourceFolder,
                targetStorage,
                ARGS.bucket,
                cdnVersionFolder,
                HTTP_MAX_AGE.fiveYears
            );
        }

        // Upload to path without version
        log('⏳', 'Uploading to', CDN_FOLDER, '...');
        await uploadFolder(sourceFolder, targetStorage, ARGS.bucket, CDN_FOLDER);
    }

    log('✅', 'Uploading Done.');

}


/**
 * Uploads a file to the bucket.
 *
 * @param sourceFolder
 * Base folder of file.
 *
 * @param sourceFile
 * File to upload.
 *
 * @param targetStorage
 * AWS S3 instance to upload to.
 *
 * @param targetBucket
 * AWS S3 bucket to upload to.
 *
 * @param targetFolder
 * Base folder to upload to.
 *
 * @param maxAge
 * Max age for cache control.
 *
 * @return
 * Promise to keep.
 */
async function uploadFile (
    sourceFolder: string,
    sourceFile: string,
    targetStorage: AWS.S3,
    targetBucket: string,
    targetFolder: string,
    maxAge = HTTP_MAX_AGE.oneDay
): Promise<void> {
    const fileContent = await FSP.readFile(sourceFile);
    const isGzip = fileContent.readUInt16BE() === 8075;

    const filePath = Path.join(
        targetFolder,
        Path.relative(sourceFolder, sourceFile)
    );

    await targetStorage.putObject({
        Bucket: targetBucket,
        Key: filePath,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: MIME_TYPE[Path.extname(filePath)],
        ...(!maxAge ? {} : {
            CacheControl: `public, max-age=${maxAge}`,
            Expires: new Date(NOW + (maxAge * 1000))
        }),
        ...(!isGzip ? {} : {
            ContentEncoding: 'gzip'
        })
    });

    log('✅', filePath, 'uploaded');
}


/**
 * Uploads a folder to the bucket.
 *
 * @param sourceFolder
 * Source path to load from.
 *
 * @param targetStorage
 * AWS S3 instance to upload to.
 *
 * @param targetBucket
 * AWS S3 bucket to upload to.
 *
 * @param targetFolder
 * Base folder to upload to.
 *
 * @param maxAge
 * Max age for cache control.
 *
 * @return
 * Promise to keep.
 */
async function uploadFolder (
    sourceFolder: string,
    targetStorage: AWS.S3,
    targetBucket: string,
    targetFolder: string,
    maxAge?: number
): Promise<void> {

    log('⏳', 'Start upload of', sourceFolder, '...');

    const filePaths = FS
        .readdirSync(sourceFolder, { encoding: 'utf8', recursive: true })
        .filter(sourcePath => Path.basename(sourcePath)[0] !== '.')
        .map(sourcePath => Path.join(sourceFolder, sourcePath));

    for (const filePathsChunk of getChunks(filePaths)) {
        await delay(1000);
        await Promise.all(
            filePathsChunk.map(filePath => uploadFile(
                sourceFolder,
                filePath,
                targetStorage,
                targetBucket,
                targetFolder,
                maxAge
            ))
        );
    }

}


/**
 * Validates the release pattern.
 *
 * @param release 
 * Release pattern to validate.
 *
 * @return
 * `true` if release pattern is valid.
 */
function validateRelease (
    release: unknown
): release is string {
    return (
        typeof ARGS.release === 'string' &&
        /^\d+\.\d+\.\d+(?:-\w+)?$/su.test(ARGS.release)
    );
}


/* *
 *
 *  Runtime
 *
 * */

build()
    .then(() => compress())
    .then(() => upload())
    .then(() => log('✅', 'DONE'))
    .catch(error => {
        log('❌', 'ERROR');
        process.stderr.write('' + error + '\n');
        process.exit(1);
    });
