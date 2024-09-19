import * as Assert from 'node:assert/strict';
import * as MC from '../code/connectors-morningstar.src';

export function version (): void {

    Assert.strictEqual(
        typeof MC.version,
        'string',
        'Morningstar API version should be a string.'
    );

    Assert.strictEqual(
        MC.version.split('.').length,
        3,
        'Morningstar API version should be valid.'
    );

}
