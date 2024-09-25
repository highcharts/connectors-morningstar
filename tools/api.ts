/* *
 *
 *  Creating API options documentation from TypeScript sources.
 *
 *  (c) Highsoft AS
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


/* eslint-disable no-console */


/* *
 *
 *  Imports
 *
 * */


import * as FS from 'node:fs';
import * as Path from 'node:path';

import Database from '../src/CLI/Library/Database';
import TSLib from './libs/TS';


/* *
 *
 *  Constants
 *
 * */


const PRODUCT = 'connectors-morningstar';


const DATABASE = new Database(PRODUCT, Path.join('bin', 'Static'), 'api');


const REFERENCES: Record<string, true> = {};


/* *
 *
 *  Functions
 *
 * */


async function addOption (
    parentItem: (Database.Item|undefined),
    codeInfo: (TSLib.CodeInfo|undefined),
    reference: string = ''
): Promise<(Database.Item|undefined)> {

    if (!codeInfo) {
        return void 0;
    }

    const doclet = codeInfo.kind === 'Doclet' ? codeInfo : codeInfo.doclet;

    if (doclet?.tags.internal) {
        return void 0;
    }

    let name = (
        (doclet && TSLib.extractInfoName(doclet)) ??
        TSLib.extractInfoName(codeInfo)
    );

    // Skip recursive traps

    reference += [codeInfo.meta.file, codeInfo.meta.scope, name].join(':');

    if (REFERENCES[reference]) {
        return void 0;
    }

    REFERENCES[reference] = true;

    // Decorate option name

    if (
        typeof name === 'string' &&
        !name.includes('.')
    ) {
        if (parentItem?.name) {
            name = `${parentItem.name}.${name}`
        } else if (
            codeInfo.kind === 'Interface' &&
            name.endsWith('Options')
        ) {
            // Create root interface name
            name = name.substring(0, name.length - 7);
            if (name) {
                name = name[0].toLowerCase() + name.substring(1);
            }
        }
    }

    // Walk over code information

    const moreInfos: Array<TSLib.CodeInfo> = [];

    let item: (Database.Item|undefined) = (
        name &&
        await DATABASE.getItem(name)
    ) || {
        description: '',
        doclet: {},
        meta: {
            file: codeInfo.meta.file
        },
        name: (name || ''),
        since: parentItem?.since || 1
    };
    let resolved: (TSLib.CodeInfo|undefined);
    let value: (TSLib.Value|undefined);

    switch (codeInfo.kind) {

        case 'Class':
            item = void 0;
            TSLib.autoExtendInfo(codeInfo);
            for (const member of codeInfo.members) {
                if (
                    member.kind === 'Property' &&
                    member.flags?.includes('static') &&
                    TSLib
                        .extractTypes(member.type || [])
                        .some(type => type.endsWith('Options'))
                ) {
                    return addOption(void 0, member, reference);
                }
            }
            break;

        case 'Doclet':
            break;

        case 'Export':
            value = codeInfo.value;
            return (
                value && typeof value === 'object' ?
                    addOption(parentItem, value, reference) :
                    void 0
            );

        case 'FunctionCall':
            item = void 0;
            if (
                codeInfo.name === 'merge' &&
                codeInfo.arguments
            ) {
                for (const argument of codeInfo.arguments) {
                    if (argument && typeof argument === 'object') {
                        moreInfos.push(argument);
                    }
                }
            }
            break;

        case 'Interface':
            item = void 0;
            if (codeInfo.name.endsWith('Options')) {
                TSLib.autoExtendInfo(codeInfo);
                if (doclet && parentItem) {
                    value = TSLib.extractTagText(doclet, 'description', true);
                    if (typeof value === 'string') {
                        parentItem.description = (
                            parentItem.description ?
                                `${parentItem.description}\n\n${value}` :
                                value
                        );
                        await DATABASE.setItem(parentItem);
                    }
                }
                moreInfos.push(...codeInfo.members);
            }
            break;

        case 'Namespace':
        case 'Object':
            item = void 0;
            for (const member of codeInfo.members) {
                if (
                    member.kind === 'Class' ||
                    member.kind === 'Property' ||
                    member.kind === 'Variable'
                ) {
                    moreInfos.push(member);
                }
            }
            break;

        case 'Property':
        case 'Variable':
            if (
                codeInfo.kind === 'Variable' &&
                codeInfo.name !== 'defaultOptions'
            ) {
                return;
            }
            value = codeInfo.value;
            switch (typeof value) {

                case 'boolean':
                case 'number':
                case 'string':
                    item.doclet.default = (item.doclet.default || []);
                    item.doclet.default.push(value);
                    break;

                case 'object':
                    if (value) {
                        moreInfos.push(value);
                    }
                    break;

            }
            if (codeInfo.type) {
                item.doclet.type = TSLib.extractTypes(codeInfo.type, true);
                for (const type of item.doclet.type) {
                    if (type.endsWith('Options')) {
                        resolved = TSLib.resolveReference(
                            codeInfo,
                            type
                        );
                        if (resolved) {
                            moreInfos.push(resolved);
                        }
                    }
                }
            }
            if (codeInfo.kind === 'Variable') {
                item = void 0;
            }
            break;

        case 'Reference':
            resolved = TSLib.resolveReference(
                TSLib.getSourceInfo(codeInfo.meta.file),
                codeInfo
            );
            return (
                resolved ?
                    addOption(parentItem, resolved, reference) :
                    void 0
            );

    }

    // Update item with doclet information

    if (item) {

        if (doclet) {
            for (const tag of Object.keys(doclet.tags)) {
                switch (tag) {

                    case 'apioption':
                    case 'optionparent':
                        {
                            const name = TSLib.extractTagText(doclet, tag, PRODUCT);
                            if (name) {
                                item.name = name;
                            }
                        }
                        break;

                    case 'description':
                        {
                            const description = TSLib.extractTagText(doclet, tag, PRODUCT);
                            if (description) {
                                item.description = description;
                            }
                        }
                        break;

                    default:
                        if (tag === 'deprecated' || tag === 'since') {
                            item[tag] = parseFloat(
                                TSLib.extractTagText(doclet, tag, PRODUCT) ||
                                '1.0.0'
                            );
                        }
                        item.doclet[tag] = doclet.tags[tag].slice();
                        break;

                }
            }
        }

        if (item.name) {
            item = await DATABASE.setItem(item);
        } else {
            item = void 0;
        }

    }

    // Continue with potential sub-items

    if (moreInfos.length) {
        for (const moreInfo of moreInfos) {
            await addOption(item || parentItem, moreInfo, reference);
        }
    }

    // Done

    if (item) {
        // console.log('Added', item.name);
    }

    return item;
}


async function main () {

    // Reset

    if (FS.existsSync(DATABASE.filePath)) {
        FS.rmSync(DATABASE.filePath, { force: true });
    }

    // Auto complete foreign declarations

    const sourcePaths = FS
        .readdirSync('src', { encoding: 'utf8', recursive: true })
        .map(sourcePath => Path.join('src', sourcePath));

    for (const sourcePath of sourcePaths) {
        if (FS.lstatSync(sourcePath).isFile()) {
            TSLib.getSourceInfo(sourcePath);
        }
    }

    TSLib.autoCompleteInfos();

    // Save statistic

    let count = await DATABASE.getCount();

    // Load root options

    for (const code of TSLib.getSourceInfo('src/api.d.ts').code) {
        await addOption(void 0, code);
    }

    // Done

    count = await DATABASE.getCount() - count;

    console.info('Found', count, 'options.');

}


/* *
 *
 *  Runtime
 *
 * */


main()
    .catch(error => {
        throw error;
    });
