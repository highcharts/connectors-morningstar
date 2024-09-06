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


import Args from '../../src/CLI/Library/Args';
import * as AWS from '@aws-sdk/client-s3';
import * as AWSCredentials from '@aws-sdk/credential-providers';
import * as FS from 'node:fs';
import * as Path from 'node:path/posix';


/* *
 *
 *  Constants
 *
 * */


const BUILD_FOLDER = 'build/';


const CDN_FOLDER = 'connectors/morningstar/';


const HELPME = `
Highcharts Upload Task
======================

npx gulp upload --bucket [...] --region [...] --release [x.x.x]

OPTIONS:
  --bucket   S3 bucket to upload to. (required)
  --region   AWS region of S3 bucket. (required)
  --release  Release version that gets uploaded. (required)
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

    process.stdout.write(content.join(' '));
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
    const fileContent = FS.readFileSync(sourceFile);
    const isGzip = Buffer.from(fileContent).readUInt16BE() === 8075;

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
 * Uploads zips to the bucket.
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
 * @return
 * Promise to keep.
 */
async function uploadZips (
    sourceFolder: string,
    targetStorage: AWS.S3,
    targetBucket: string,
    targetFolder: string
): Promise<void> {

    log('⏳', 'Start upload of', sourceFolder, '...');

    const filePaths = FS
        .readdirSync(sourceFolder, { encoding: 'utf8', recursive: true })
        .filter(sourcePath => {
            const fileName = Path.basename(sourcePath);
            return (fileName[0] !== '.' && fileName.endsWith('.zip'));
        })
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
                0
            ))
        );
    }

}


/* *
 *
 *  Tasks
 *
 * */

/**
 * Uploads distribution files.
 *
 * @return
 * Promise to keep.
 */
export default async function upload (): Promise<void> {
    const args = Args.getArgs(process.argv);
    const bucket = '' + args.bucket;
    const dryrun = !!args.dryrun;
    const helpme = !!args.helpme;
    const profile = '' + args.profile;
    const region = '' + args.region;
    const release = '' + args.release;

    if (helpme) {
        // eslint-disable-next-line no-console
        console.log(HELPME);
        return;
    }

    if (!bucket) {
        throw new Error('❌ No `--bucket s3` provided.');
    }

    if (!region) {
        throw new Error('❌ No `--region aws` provided.');
    }

    if (!/^\d+\.\d+\.\d+(?:-\w+)?$/su.test(release)) {
        throw new Error('❌ No valid `--release x.x.x` provided.');
    }

    const sourceFolder = Path.join(BUILD_FOLDER, 'js-gzip/');

    if (!FS.existsSync(sourceFolder)) {
        throw new Error(`❌ Folder "${sourceFolder}" not found.`);
    }

    const targetStorage = new AWS.S3({
        region,
        credentials: (
            profile ?
                AWSCredentials.fromIni({ profile }) :
                void 0
        )
    });

    if (dryrun) {
        // Dry run messages
        const [major, minor] = release.split('.');
        const versions = [
            release,
            `${major}.${minor}`,
            major
        ];

        for (const version of versions) {
            const cdnVersionFolder = Path.join(CDN_FOLDER, version, '/');
            log('🚧', 'Skipping upload to', cdnVersionFolder, '... (dry run)');
        }

        log('🚧', 'Skipping upload to', CDN_FOLDER, '... (dry run)');
        log('🚧', 'Skipping upload to zips/. (dry run)');
    } else {
        // Upload versioned paths
        const [major, minor] = release.split('.');
        const versions = [
            release,
            `${major}.${minor}`,
            major
        ];

        for (const version of versions) {
            const cdnVersionFolder = Path.join(CDN_FOLDER, version, '/');

            log('⏳', 'Uploading to', cdnVersionFolder, '...');

            await uploadFolder(
                sourceFolder,
                targetStorage,
                bucket,
                cdnVersionFolder,
                HTTP_MAX_AGE.fiveYears
            );
        }

        // Upload to path without version
        log('⏳', 'Uploading to', CDN_FOLDER, '...');
        await uploadFolder(sourceFolder, targetStorage, bucket, CDN_FOLDER);

        // Upload zip
        log('⏳', 'Uploading to zips/', '...');
        const targetZipFolder = Path.join(CDN_FOLDER, 'zips');
        await uploadZips(BUILD_FOLDER, targetStorage, bucket, targetZipFolder);
    }

    log('✅', 'Uploading Done.');

}
