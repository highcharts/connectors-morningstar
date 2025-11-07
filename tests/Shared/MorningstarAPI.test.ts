import * as Assert from 'node:assert/strict';
import * as MC from '../../code/connectors-morningstar.src';

export async function apiAccess (
    apiOptions: MC.Shared.MorningstarAPIOptions
): Promise<void> {
    const api = new MC.Shared.MorningstarAPI(apiOptions);

    Assert.ok(
        await api.access.authenticate(),
        'Morningstar API credentials should be valid.'
    );

}
