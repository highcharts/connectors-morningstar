import * as Assert from 'node:assert/strict';
import * as MC from '../../../code/morningstar-connectors.src';

export async function apiAccess(
    apiOptions: MC.Shared.MorningstarAPIOptions
) {
    const api = new MC.Shared.MorningstarAPI(apiOptions);

    Assert.ok(
        await api.access.authenticate(),
        'Morningstar API credentials should be valid.'
    );

}
