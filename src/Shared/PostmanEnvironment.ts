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
 *  Declarations
 *
 * */


interface PostmanEnvironmentJSON {
    id: string;
    name: string;
    values: Array<PostmanEnvironment.Value>;
    _postman_variable_scope?: 'environment';
    _postman_exported_at?: string;
    _postman_exported_using?: string;
}


/* *
 *
 *  Functions
 *
 * */


function isPostmanEnvironmentJSON(
    obj: unknown
): obj is PostmanEnvironmentJSON {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        typeof (obj as PostmanEnvironmentJSON).id === 'string' &&
        typeof (obj as PostmanEnvironmentJSON).name === 'string' &&
        typeof (obj as PostmanEnvironmentJSON).values === 'object' &&
        (obj as PostmanEnvironmentJSON).values instanceof Array &&
        (
            (obj as PostmanEnvironmentJSON).values.length === 0 ||
            isPostmanEnvironmentValue((obj as PostmanEnvironmentJSON).values[0])
        )
    );
}


function isPostmanEnvironmentValue(
    obj: unknown
): obj is PostmanEnvironment.Value {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        typeof (obj as PostmanEnvironment.Value).key === 'string' &&
        typeof (obj as PostmanEnvironment.Value).value === 'string' &&
        (
            (obj as PostmanEnvironment.Value).type === 'default' ||
            (obj as PostmanEnvironment.Value).type === 'secret'
        ) &&
        (
            typeof (obj as PostmanEnvironment.Value).enabled === 'undefined' ||
            typeof (obj as PostmanEnvironment.Value).enabled === 'boolean'
        )
    );
}


/* *
 *
 *  Class
 *
 * */


export class PostmanEnvironment {


    /* *
     *
     *  Static Functions
     *
     * */


    /**
     * Loads the Postman Environment from the given file content or posted file.
     *
     * @param file
     * File content or posted file.
     *
     * @return
     * Promise to succeed.
     */
    public static async fromFile(
        file: (string|File)
    ): Promise<PostmanEnvironment> {
        const json: unknown = JSON.parse(typeof file === 'string' ? file : await file.text());
        const values = [];

        let id = '';
        let name = '';

        if (isPostmanEnvironmentJSON(json)) {

            id = json.id;
            name = json.name;

            for (const value of json.values) {
                if (isPostmanEnvironmentValue(value)) {
                    values.push(value);
                }
            }

        }

        return new PostmanEnvironment(id, name, values); 
    }


    /**
     * Loads the Postman Environment from the given URL.
     *
     * @param url
     * URL to load from.
     *
     * @return
     * Promise to succeed.
     */
    public static async fromURL(
        url: string
    ): Promise<PostmanEnvironment> {
        return await this.fromFile(await (await fetch(url)).text());
    }


    /* *
     *
     *  Constructors
     *
     * */


    protected constructor(
        id: string,
        name: string,
        values: Array<PostmanEnvironment.Value>
    ) {
        this.id = id;
        this.name = name;
        this.values = values;
    }


    /* *
     *
     *  Properties
     *
     * */


    public readonly id: string;


    public readonly name: string;


    public readonly values: Array<PostmanEnvironment.Value>;


    /* *
     *
     *  Functions
     *
     * */


    /**
     * Retrieves all values for the given key or regular expression.
     *
     * @param key
     * Key or expression of the value to retrieve.
     *
     * @return
     * Postman Environment value or `undefined`.
     */
    public getAllValuesOf(
        key: (string|RegExp)
    ): Array<PostmanEnvironment.Value> {
        const values: Array<PostmanEnvironment.Value> = [];

        if (typeof key === 'string') {
            for (const value of this.values) {
                if (value.key === key) {
                    values.push(value);
                }
            }
        } else {
            for (const value of this.values) {
                if (key.test(value.key)) {
                    values.push(value);
                }
            }
        }

        return values;
    }


    /**
     * Retrieves the last active value for the given key or regular expression.
     *
     * @param key
     * Key or expression of the value to retrieve.
     *
     * @return
     * Postman Environment value or `undefined`.
     */
    public getLastValueOf(
        key: (string|RegExp)
    ): (PostmanEnvironment.Value|undefined) {
        let lastValue: (PostmanEnvironment.Value|undefined);

        if (typeof key === 'string') {
            for (const value of this.values) {
                if (
                    value.enabled &&
                    value.key === key
                ) {
                    lastValue = value;
                }
            }
        } else {
            for (const value of this.values) {
                if (
                    value.enabled &&
                    key.test(value.key)
                ) {
                    lastValue = value;
                }
            }
        }

        return lastValue;
    }


    /**
     * Retrieves the first active value for the given key or regular expression.
     *
     * @param key
     * Key or expression of the value to retrieve.
     *
     * @return
     * Postman Environment value or `undefined`.
     */
    public getValueOf(
        key: (string|RegExp)
    ): (PostmanEnvironment.Value|undefined) {

        if (typeof key === 'string') {
            for (const value of this.values) {
                if (
                    value.enabled &&
                    value.key === key
                ) {
                    return value;
                }
            }
        } else {
            for (const value of this.values) {
                if (
                    value.enabled &&
                    key.test(value.key)
                ) {
                    return value;
                }
            }
        }

        return void 0;
    }


}


/* *
 *
 *  Class Namespace
 *
 * */


export namespace PostmanEnvironment {


    /* *
     *
     *  Declarations
     *
     * */


    export interface Value {
        enabled?: boolean;
        key: string;
        type: string;
        value: string;
    }


    export type ValueType = ('default'|'secret');


}


/* *
 *
 *  Default Export
 *
 * */


export default PostmanEnvironment;
